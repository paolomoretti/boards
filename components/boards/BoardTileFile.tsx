import * as React from 'react';
import Numeral from 'numeral';
import { File } from '../../types/boards.types';
import { BoardTile } from './BoardTile';
import styled from 'styled-components';
import { FileTypeIcon } from '../../styles/vars';
import { ReactNode } from 'react';
import { Card, Typography } from 'antd';

const { Paragraph, Text } = Typography;
const { Meta } = Card;
const ParagraphStyled = styled(Paragraph)`
  word-break: break-word;
`;

interface BoardTileFileProps {
  file: File;
  actions: any;
  children: ReactNode;
}

export default function BoardTileFile({ file, actions, children }: BoardTileFileProps) {

  return (
    <BoardTile
      size={'small'}
      cover={null}
      actions={actions}
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
      {children}
    </BoardTile>
  );
}