import { ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { getUser as fetchUser } from '../../utils/fetchers/getUser';
import { Layout, message, Spin } from 'antd';
import AppHeader from '../shared/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import {getProcessing, getToken, getUser} from '../../data/store/selectors';
import { setToken, setUser } from '../../data/store/actions';
import { Size } from '../../styles/vars';
import styled from 'styled-components';
import {LineLoading} from "../shared/LineLoading";

const { Content } = Layout;
const AppContent = styled(Content)`
  min-height: calc(100vh - ${Size.HEADER_HEIGHT}px);
`;

export default function LoggedPage({ children }: { children: ReactNode; }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isProcessing: boolean = useSelector(getProcessing);
  const token = useSelector(getToken);
  const [ready, setReady] = useState(false);
  const [gettingUser, setGettingUser] = useState(false);

  useEffect(() => {
    if (gettingUser) {
      return;
    }
    if (!user) {
      if (!token) {
        Router.push('/login');
      } else {
        // Try to load the user
        setGettingUser(true);
        fetchUser(token)
          .then(userData => {
            setGettingUser(false);
            if (userData) {
              dispatch(setUser(userData));
              setReady(true);
            } else {
              dispatch(setUser(undefined));
              dispatch(setToken(undefined));
              Router.push('/login');
            }
          })
          .catch(err => {
            message.error(err);
            setGettingUser(false);
          });
      }
    } else {
      setReady(true);
    }
  });

  return (
    <Layout style={{ width: '100%', minHeight: '100vh' }}>
      <Spin spinning={!ready}>
        <div style={{zIndex: 1000, position: 'relative'}}>
          <AppHeader />
        </div>
        <AppContent>
          <LineLoading loading={isProcessing}>
            {ready && children}
          </LineLoading>
        </AppContent>
      </Spin>
    </Layout>
  )
};
