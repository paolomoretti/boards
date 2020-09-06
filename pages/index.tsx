import * as React from 'react';
import {lazy, useEffect, useState} from 'react';
import styled from 'styled-components';
import LoggedPage from '../components/layouts/LoggedPage';
import {message, Spin} from 'antd';
import {getBoards} from '../utils/fetchers/getBoards';
import {Size} from '../styles/vars';
import {useDispatch, useSelector} from 'react-redux';
import {getBoards as getBoardsList} from '../data/store/selectors';
import {updateBoards} from '../data/store/actions';
import {Suspense} from "react";
const Boards = lazy(() => import("../components/boards/Boards"));

const Content = styled.div`
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  height: calc(100vh - ${Size.HEADER_HEIGHT}px);
  margin: 0 auto;
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
          <Suspense fallback={<Spin spinning={true} />}>
            <Boards boards={boards} />
          </Suspense>
        </Content>
      </Spin>
    </LoggedPage>
  );
}
