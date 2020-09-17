import * as React from 'react';
import { lazy, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import LoggedPage from '../components/layouts/LoggedPage';
import { message, Spin } from 'antd';
import { getBoards } from '../utils/fetchers/getBoards';
import { Size } from '../styles/vars';
import { useDispatch, useSelector } from 'react-redux';
import { getBoards as getBoardsList, isLoading } from '../data/store/selectors';
import { updateBoards } from '../data/store/actions';
import { useApi } from '../components/shared/ApiProvider';
import { Board } from '../types/boards.types';

const Boards = lazy(() => import("../components/boards/Boards"));

const Content = styled.div`
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  height: calc(100vh - ${Size.HEADER_HEIGHT}px);
  margin: 0 auto;
`;

export default function Home() {
  const dispatch = useDispatch();
  const { request } = useApi();
  const loading: boolean = useSelector(isLoading);
  const boards = useSelector(getBoardsList);

  useEffect(() => {
    if (!Array.isArray(boards) && !loading) {
      request<Array<Board>>(getBoards)
        .then(boards => dispatch(updateBoards(boards)))
        .catch(message.error);
    }
  });

  return (
    <LoggedPage>
      <Spin spinning={!boards || loading}>
        <Content>
          <Suspense fallback={<Spin spinning={true} />}>
            <Boards boards={boards} />
          </Suspense>
        </Content>
      </Spin>
    </LoggedPage>
  );
}
