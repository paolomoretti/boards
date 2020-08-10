import * as React from 'react';
import * as _ from 'lodash';
import { List } from 'antd';
import { Board, BoardSearchResult } from '../../types/boards.types';
import BoardTileCard from '../boards/BoardTileCard';
import styled from 'styled-components';
import BoardBadge from '../boards/BoardBadge';
import { useSelector } from 'react-redux';
import { getBoards } from '../../data/store/selectors';
import Link from 'next/link';

const Container = styled(List.Item)`
  background-color: #fff;
  padding: 0;
  position: relative;
  
  &:not(:last-of-type) {
    margin-bottom: 30px;
    
    &:after {
      content: '';
      height: 1px;
      background-color: #ddd;
      width: 60%;
      left: 20%;
      display: block;
      position: absolute;
      bottom: -15px;
    }
  }
`;
const BoardDetails = styled.a`
  display: block;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  
  &:hover {
    background-color: #efefef;
  }
`;

export default function AppSearchItem({ item }: { item: BoardSearchResult; }) {
  const boards: Board[] = useSelector(getBoards)!;
  const board: Board = _.find(boards || [], b => b.id === item.topic_board.id) || item.topic_board;
  return (
    <Container>
      <Link href={'/boards/[id]'} as={`/boards/${board.id}`}>
        <BoardDetails>
          <BoardBadge board={board} />
        </BoardDetails>
      </Link>
      <BoardTileCard
        // @ts-ignore
        tile={item}
        boardId={board.id}
      />
    </Container>
  )
}