import { ReactNode } from 'react';
import { Layout } from 'antd';
import { Size } from '../../styles/vars';

const { Content } = Layout;

export default function GuestPage({ children }: { children: ReactNode; }) {
  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <Content style={{height: `calc(100vh - ${Size.HEADER_HEIGHT}px)`}}>
        {children}
      </Content>
    </Layout>
  )
};