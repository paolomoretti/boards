import { ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { getUser as fetchUser } from '../../utils/fetchers/getUser';
import { Layout, message, Spin } from 'antd';
import AppHeader from '../shared/AppHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getUser } from '../../data/store/selectors';
import { setToken, setUser } from '../../data/store/actions';
import { Size } from '../../styles/vars';

const { Content } = Layout;

export default function LoggedPage({ children }: { children: ReactNode; }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
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
        <AppHeader />
        <Content style={{minHeight: `calc(100vh - ${Size.HEADER_HEIGHT}px)`}}>
          {ready && children}
        </Content>
      </Spin>
    </Layout>
  )
};