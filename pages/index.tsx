import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoggedPage from '../components/layouts/LoggedPage';
import { message, Spin } from 'antd';
import { getBoards } from '../utils/fetchers/getBoards';
import BoardCard from '../components/boards/BoardCard';
import { Board } from '../types/boards.types';
import AddBoardButton from '../components/boards/AddBoardButton';
import Link from 'next/link';
import { Size } from '../styles/vars';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards as getBoardsList } from '../data/store/selectors';
import { updateBoards } from '../data/store/actions';

const Content = styled.div`
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  height: calc(100vh - ${Size.HEADER_HEIGHT}px);
  margin: 0 auto;
`
const BoardsContainer = styled.div`
  padding: 20px 10px;
  
  .board-card-item {
    width: 100%;
    display: inline-block;
    padding: 0 10px 20px;
    box-sizing: border-box;
    
    @media only screen and (min-width: 650px) {
      width: 50%;
    }
    @media only screen and (min-width: 950px) {
      width: 33.3%;
    }
    @media only screen and (min-width: 1250px) {
      width: 25%;
    }
  }
`;

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const boards = useSelector(getBoardsList);

  useEffect(() => {
    if (!Array.isArray(boards) && !loading) {
      setLoading(true);
      getBoards()
        .then(boards => {
          dispatch(updateBoards(boards));
          setLoading(false);
        })
        .catch(err => {
          message.error(err);
          setLoading(false);
        });
    }
  });

  return (
    <LoggedPage>
      <Spin spinning={!boards}>
        <Content>
          {boards && Array.isArray(boards) ? (
            <BoardsContainer>
              <AddBoardButton />
                {boards.map((board: Board) =>
                  <Link key={board.id} href={'/boards/[id]'} as={`/boards/${board.id}`}>
                    <div className={'board-card-item'}>
                      <BoardCard board={board}/>
                    </div>
                  </Link>
                )}
            </BoardsContainer>
          ) : null}
        </Content>
      </Spin>
    </LoggedPage>
  );
}
