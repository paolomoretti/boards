import * as React from 'react';
import { BoardTile } from '../../types/boards.types';
import BoardTileTags from './BoardTileTags';
import styled from 'styled-components';

const Container = styled.div`
  > * {
    margin-top: 10px;
  }
`

export default function BoardTileExtraContent({ tile }: { tile: BoardTile; }) {
  return (
    <Container>
      <BoardTileTags tile={tile} />
    </Container>
  );
}