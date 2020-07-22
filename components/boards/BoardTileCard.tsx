import * as React from 'react';
import { useEffect, useState } from 'react';
import { Article, BoardTile, Note } from '../../types/boards.types';
import styled from 'styled-components';
import { message, Popconfirm } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
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

const TileContainer = styled.div`
  padding: 10px;
  
  &.is-loading {
    filter: grayscale(1);
  }
`;
const ParagraphStyled = styled(Paragraph)`
  word-break: break-word;
`;

export default function BoardTileCard({ tile: tileRef, boardId }: { tile: BoardTile; boardId: number; }) {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const tiles: BoardTile[] = useSelector(getCurrentBoardTiles);
  const tile: BoardTile = _.find(tiles, t => t.id === tileRef.id)!;

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

  useEffect(() => {
    if (deleted) {
      deleteBoardTile(boardId, tile.id)
        .catch(() => message.error(`Error deleting content`));
    }
  })

  if (deleted) {
    return null;
  }

  return (
    <TileContainer className={tile.loading ? 'is-loading' : ''}>
      {tile.tile_type === 'link' && (
        <BoardTileArticle
          link={tile.link!.link}
          summary={tile.link!.user_summary}
          onChangeSummary={onChangeArticleSummary}
          actions={[
            <BoardTileFeedback tile={tile} boardId={boardId} />,
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
          actions={[
            <BoardTileFeedback tile={tile} boardId={boardId} />,
            <EditOutlined />,
            <CloudDownloadOutlined />,
            <Popconfirm
              onConfirm={() => setDeleted(true)}
              title="Are you sure you want to delete this content?"
              placement={'top'}
              icon={<DeleteOutlined style={{ color: 'red' }}/>}
            >
              <DeleteOutlined onClick={() => alert('download')} />
            </Popconfirm>
          ]}
        >
          <BoardTileExtraContent tile={tile} />
        </BoardTileFile>
      )}

      {tile.tile_type === 'note' && (
        <BoardTileNote
          actions={[
            <BoardTileFeedback tile={tile} />,
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
    </TileContainer>
  );
}