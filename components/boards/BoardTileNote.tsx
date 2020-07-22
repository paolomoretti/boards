import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { BoardTile } from './BoardTile';
import { Colors } from '../../styles/vars';

const BoardTileNoteContainer = styled(BoardTile)`
  background-color: ${Colors.NOTE};
  
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