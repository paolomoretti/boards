import { BoardTile, File } from '../../types/boards.types';
import { CloudDownloadOutlined } from '@ant-design/icons';
import * as React from 'react';
import { getBoardFileDownloadUrl } from '../../utils/fetchers/getBoardFileDownloadUrl';
import { Button } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const TransparentButton = styled(Button)`
  padding: 0;
  height: initial;
  color: inherit;
  width: initial;
  font-size: initial;
  line-height: initial;
  
  &:hover {
    background-color: transparent;
  }
`;

export const BoardTileFileDownload = ({ tile, boardId }: { tile: BoardTile; boardId: number; }) => {
  const [loading, setLoading] = useState(false);
  const file: File = tile.file!;

  const onDownload = () => {
    setLoading(true);
    getBoardFileDownloadUrl(boardId, tile.id)
      .then(res => {
        const a = document.createElement('a');
        a.href = res.url!;
        a.download = file.original_filename;

        const clickHandler = () => {
          setTimeout(() => {
            setLoading(false);
            a.removeEventListener('click', clickHandler);
          }, 150);
        };
        a.addEventListener('click', clickHandler, false);
        a.click();
      })
  };

  return (
    <TransparentButton onClick={onDownload} icon={<CloudDownloadOutlined />} loading={loading} type={'text'} />
  )
};