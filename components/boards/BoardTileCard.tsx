import * as React from 'react';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Article, BoardTile, Note } from '../../types/boards.types';
import styled from 'styled-components';
import { message, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import BoardTileArticle from './BoardTileArticle';
import BoardTileFile from './BoardTileFile';
import BoardTileExtraContent from './BoardTileExtraContent';
import BoardItemArticle from './BoardItemArticle';
import BoardTileNote from './BoardTileNote';
import { deleteBoardTile } from '../../utils/fetchers/deleteBoardTile';
import { BoardTileFeedback } from './BoardTileFeedback';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBoardTiles } from '../../data/store/selectors';
import { updateCurrentBoardTile } from '../../data/store/actions';
import { updateBoardTile } from '../../utils/fetchers/updateBoardTile';
import { BoardTileStar } from './BoardTileStar';
import { Colors } from '../../styles/vars';
import { BoardTileCommentsCount } from './BoardTileCommentsCount';
import { BoardTileComments } from './BoardTileComments';
import { BoardTileFileDownload } from './BoardTileFileDownload';
import { parseTileHighlights } from '../../utils/parsers/parseTileHighlights';
import {LineLoading} from "../shared/LineLoading";

const { Paragraph } = Typography;
const TileContainer = styled.div`
  padding: 10px;
  
  &.is-loading {
    filter: grayscale(1);
  }
  &.approved {
    .ant-card {
      border-color: ${Colors.PRIMARY};
    }
  }
  &.show-comments {
    background-color: rgba(0, 0, 0, .1);
  
    &:before {
      content: '';
      background-color: rgba(0, 0, 0, .5);
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 499;
    }
    .ant-card {
      position: fixed;
      z-index: 500;
      transition: all .3s ease-in-out;
      max-height: calc(100% - 40px);
      overflow-y: auto;
      
      .ant-card-body {
        position: relative;
        z-index: 10;
      }
    }
  }
`;
const ParagraphStyled = styled(Paragraph)`
  word-break: break-word;
  white-space: pre-line;
`;

interface BoardTileCardProps {
  tile: BoardTile;
  boardId: number;
  actions?: boolean;
}
export default function BoardTileCard({ tile: tileRef, boardId, actions }: BoardTileCardProps) {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const tiles: BoardTile[] = useSelector(getCurrentBoardTiles);
  let tile: BoardTile = _.find(tiles, t => t.id === tileRef.id)!;
  if (!tile || tileRef.highlights) {
    tile = tileRef;
  }
  let $container: HTMLDivElement | null;

  const getClassNames = (tile: BoardTile): string => {
    let classNames: Array<string> = ['board-tile-card'];
    if (tile.approved) {
      classNames.push('approved');
    }
    if (tile.loading) {
      classNames.push('is-loading');
    }
    if (showComments) {
      classNames.push('show-comments');
    }

    return classNames.join(' ');
  }

  const onChangeArticleSummary = (summary: string) => {
    const updatedTile: BoardTile = Object.assign({}, tile, {
      link: {
        ...tile.link,
        user_summary: summary
      }
    });
    updateBoardTile(boardId, tile.id, { update_tile_text: summary })
      .then(tile => dispatch(updateCurrentBoardTile(tile)));
    dispatch(updateCurrentBoardTile(updatedTile));
  };

  const onClickContainer = (e: SyntheticEvent) => {
    if (showComments) {
      if (e.target === $container) {
        popinComments();
      }
    }
  }

  const popoutComments = () => {
    setShowComments(true);
    $container!.style.height = `${$container!.offsetHeight}px`;
    const $card: HTMLElement = $container!.firstElementChild! as HTMLElement;
    $card.style.width = `${$card.offsetWidth}px`;
    $card.style.top = `${$card.getBoundingClientRect().top}px`;

    setTimeout(() => {
      $card.style.top = `20px`;
      $card.style.left = `${$card.offsetLeft -5}px`;
      $card.style.width = `${$card.offsetWidth + 10}px`;
    });
  }

  const popinComments = () => {
    setShowComments(false);
    const $card: HTMLElement = $container!.firstElementChild! as HTMLElement;
    $container!.setAttribute('style', '');
    $card.setAttribute('style', '');
  }

  const onCommentsVisibilityChange = () => {
    if (!showComments) {
      popoutComments();
    } else {
      popinComments();
    }
  };

  useEffect(() => {
    if (deleted) {
      deleteBoardTile(boardId, tile.id)
        .catch(() => message.error(`Error deleting content`));
    }
  })

  if (deleted) {
    return null;
  }

  tile = parseTileHighlights(tile);

  const footer: ReactNode = showComments ? (
    <BoardTileComments tile={tile} />
  ) : null;

  return (
    <TileContainer className={getClassNames(tile)} ref={el => $container = el} onClick={onClickContainer}>
      <LineLoading loading={tile.loading}>
        {tile.tile_type === 'link' && (
          <BoardTileArticle
            link={tile.link!.link}
            summary={tile.link!.user_summary}
            onChangeSummary={onChangeArticleSummary}
            footer={footer}
            actions={!showComments && actions !== false && [
              <BoardTileFeedback tile={tile} boardId={boardId} />,
              <BoardTileCommentsCount onClick={onCommentsVisibilityChange} tile={tile} />,
              <BoardTileStar tile={tile} boardId={boardId} />,
              <Popconfirm
                onConfirm={() => setDeleted(true)}
                title="Are you sure you want to delete this content?"
                placement={'top'}
                icon={<DeleteOutlined style={{ color: 'red' }}/>}
              >
                <DeleteOutlined />
              </Popconfirm>
            ]}
          >
            <BoardTileExtraContent tile={tile} />
          </BoardTileArticle>
        )}

        {tile.tile_type === 'file' && (
          <BoardTileFile
            file={tile.file!}
            boardId={boardId}
            tileId={tile.id}
            footer={footer}
            actions={actions !== false && [
              <BoardTileFeedback tile={tile} boardId={boardId} />,
              <BoardTileCommentsCount onClick={onCommentsVisibilityChange} tile={tile} />,
              <BoardTileStar tile={tile} boardId={boardId} />,
              // <EditOutlined />,
              <BoardTileFileDownload boardId={boardId} tile={tile} />,
              <Popconfirm
                onConfirm={() => setDeleted(true)}
                title="Are you sure you want to delete this content?"
                placement={'top'}
                icon={<DeleteOutlined style={{ color: 'red' }}/>}
              >
                <DeleteOutlined />
              </Popconfirm>
            ]}
          >
            <BoardTileExtraContent tile={tile} />
          </BoardTileFile>
        )}

        {tile.tile_type === 'note' && (
          <BoardTileNote
            footer={footer}
            actions={actions !== false && [
              <BoardTileFeedback tile={tile} boardId={boardId} />,
              <BoardTileCommentsCount onClick={onCommentsVisibilityChange} tile={tile} />,
              <BoardTileStar tile={tile} boardId={boardId} />,
              <Popconfirm
                onConfirm={() => setDeleted(true)}
                title="Are you sure you want to delete this content?"
                placement={'top'}
                icon={<DeleteOutlined style={{ color: 'red' }}/>}
              >
                <DeleteOutlined />
              </Popconfirm>
            ]}
          >
            <ParagraphStyled ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>{tile.note!.note}</ParagraphStyled>
            {(tile.note as Note)!.links && (
              <div style={{marginTop: 20}}>
                {(tile.note as Note)!.links!.map((link: Article, index: number) => (
                  <BoardItemArticle key={index} link={link} />
                ))}
              </div>
            )}
            <BoardTileExtraContent tile={tile} />
          </BoardTileNote>
        )}
      </LineLoading>
    </TileContainer>
  );
}
