import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { BoardTile } from './BoardTile';

const BoardTileNoteContainer = styled(BoardTile)`
  background-color: #fef2da;
  
  .ant-card-actions {
    background-color: rgba(0, 0, 0, .1);
  }
`
interface BoardTileNoteProps {
  actions: any;
  children: ReactNode;
}

export default function BoardTileNote({ actions, children }: BoardTileNoteProps) {
  return (
    <BoardTileNoteContainer
      size={'small'}
      actions={actions}
    >
      {children}
    </BoardTileNoteContainer>
  );
}