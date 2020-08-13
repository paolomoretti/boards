import { ReactNode } from 'react';
import { Layout } from 'antd';
import { Size } from '../../styles/vars';
import AppHeader from "../shared/AppHeader";

const { Content } = Layout;

export default function GuestPage({ children }: { children: ReactNode; }) {
  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <div style={{zIndex: 1000, position: 'relative'}}>
        <AppHeader guest={true} />
      </div>
      <Content style={{minHeight: `calc(100vh - ${Size.HEADER_HEIGHT}px)`}}>
        {children}
      </Content>
    </Layout>
  )
};
