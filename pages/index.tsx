import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoggedPage from '../components/layouts/LoggedPage';
import { Affix, message, Spin } from 'antd';
import { getBoards } from '../utils/fetchers/getBoards';
import BoardCard from '../components/boards/BoardCard';
import { Board } from '../types/boards.types';
import AddBoardButton from '../components/boards/AddBoardButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { cardColBreakpoints, Size } from '../styles/vars';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards as getBoardsList } from '../data/store/selectors';
import { updateBoards } from '../data/store/actions';

const MasonryContainer = styled(Masonry)`
  display: flex;
  width: auto;
  margin-left: -20px;
    
  .my-masonry-grid_column {
    background-clip: padding-box;
    padding-left: 20px;
  }
  .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 20px;
  }
`;
const BoardsContainer = styled.div`
  padding: 0 20px 20px;
  
  > * {
    margin-bottom: 10px;
  }
`;

export default function Home() {
  const router = useRouter();
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

  const navigateToBoard = (boardId: number) => {
    router.push(`/boards/[id]`, `/boards/${boardId}`);
  };

  return (
    <LoggedPage>
      <Spin spinning={!boards}>
        <div style={{height: `calc(100vh - ${Size.HEADER_HEIGHT}px)`}}>
          {boards && Array.isArray(boards) ? (
            <BoardsContainer>
              <Affix offsetTop={Size.HEADER_HEIGHT} style={{ zIndex: 900 }}>
                <AddBoardButton boards={boards} onSelect={navigateToBoard}/>
              </Affix>
              <MasonryContainer
                breakpointCols={cardColBreakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {boards.map((board: Board) =>
                  <Link key={board.id} href={'/boards/[id]'} as={`/boards/${board.id}`}>
                    <div>
                      <BoardCard board={board}/>
                    </div>
                  </Link>
                )}
              </MasonryContainer>
            </BoardsContainer>
          ) : null}
        </div>
      </Spin>
    </LoggedPage>
  );
}
