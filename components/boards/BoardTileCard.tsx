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

const TileContainer = styled.div`
  padding: 10px;
  
  &.is-loading {
    filter: grayscale(1);
  }
`;
const ParagraphStyled = styled(Paragraph)`
  word-break: break-word;
`;

export default function BoardTileCard({ tile, boardId }: { tile: BoardTile; boardId: number; }) {
  const [deleted, setDeleted] = useState(false);

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
          actions={[
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