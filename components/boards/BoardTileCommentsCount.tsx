import { CommentOutlined } from '@ant-design/icons';
import * as React from 'react';
import { BoardTile } from '../../types/boards.types';
import styled from 'styled-components';

const Container = styled.div`
  .counter {
    font-size: .9em;
    margin-right: .4em;
  }
`;
export const BoardTileCommentsCount = ({ tile, onClick }: { tile: BoardTile; onClick: any; }) => {
  return (
    <Container onClick={onClick}>
      <span className={'counter'}>{tile.comment_count}</span>
      <CommentOutlined />
    </Container>
  )
};