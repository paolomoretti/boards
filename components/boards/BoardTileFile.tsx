import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import Numeral from 'numeral';
import { File } from '../../types/boards.types';
import { BoardTile } from './BoardTile';
import styled from 'styled-components';
import { FileTypeIcon } from '../../styles/vars';
import { Card, Typography } from 'antd';
import { ProtectedImage } from '../shared/ProtectedImage';
import { getBoardFileDownloadUrl } from '../../utils/fetchers/getBoardFileDownloadUrl';
import { FileIcon } from '../shared/FileIcon';

const { Paragraph, Text } = Typography;
const { Meta } = Card;
const ParagraphStyled = styled(Paragraph)`
  word-break: break-word;
`;
const ExtendCardContent = styled.div`
  margin: 0 -12px;
  width: calc(100% + 24px);
  
  > img {
    width: 100%;
  }
`

interface BoardTileFileProps {
  file: File;
  tileId: number;
  boardId: number;
  actions: any;
  children: ReactNode;
  footer?: ReactNode;
}

const FileIconHolder = styled.div`
  font-size: 50px;
  padding: 10px 0 0;
  text-align: center;
`;

export default function BoardTileFile({ file, footer, actions, tileId, boardId, children }: BoardTileFileProps) {
  const [protectedUrl, setProtectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!protectedUrl) {
      getBoardFileDownloadUrl(boardId, tileId)
        .then(res => setProtectedUrl(res.url));
    }
  })
  const getFilePreview = (file: File): ReactNode => {
    if (file.content_type.indexOf('image') === 0) {
      return (
        <ExtendCardContent>
          <ProtectedImage src={file.file_url} />
        </ExtendCardContent>
      )
    } else if (file.content_type.indexOf('video') === 0) {
      return protectedUrl && (
        <ExtendCardContent>
          <video controls width={'100%'} src={protectedUrl} />
        </ExtendCardContent>
      );
    } else {
      return (
        <FileIconHolder>
          <FileIcon fileName={file.original_filename} />
        </FileIconHolder>
      );
    }
  };

  return (
    <BoardTile
      size={'small'}
      cover={null}
      actions={actions}
      footer={footer}
    >
      <Meta
        avatar={FileTypeIcon[file.content_type]}
        title={file.title}
        description={(
          <div>
            <Text type="secondary">{Numeral(file.file_size).format('a')} - {file.original_filename}</Text>
            <ParagraphStyled ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
              {file.summary}
            </ParagraphStyled>
          </div>
        )}
      />
      {getFilePreview(file)}
      {children}
    </BoardTile>
  );
}