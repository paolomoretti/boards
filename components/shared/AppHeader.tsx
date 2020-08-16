import { Affix, Col, Row } from 'antd';
import styled from 'styled-components';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Link from 'next/link';
import { User } from '../../types/app.types';
import { useSelector } from 'react-redux';
import { getUser } from '../../data/store/selectors';
import { Colors, Size } from '../../styles/vars';
import AppSearch from './AppSearch';

const LogoEl = styled(Logo)`
  cursor: pointer;
`;
const Container = styled.div`
  background-color: ${Colors.APP_HEADER_BG};
`;
const HeaderRow = styled(Row)`
  min-height: ${Size.HEADER_HEIGHT}px;
  max-width: ${Size.MAX_APP_WIDTH + 40}px;
  margin: 0 auto;
  
  > * {
    padding: 0 20px;
  }
`;

interface AppHeaderProps {
  guest?: boolean;
}

export default function AppHeader({ guest }: AppHeaderProps) {
  const user: User = useSelector(getUser)!;

  return (
    <Affix offsetTop={0} style={{zIndex: 1000, width: '100%'}}>
      <Container>
        <HeaderRow align={'middle'}>
          <Col flex={1}>
            <Link href={`/`}>
            <span>
              <LogoEl />
            </span>
            </Link>
          </Col>
          {!guest && [
            <Col flex={100} style={{padding: 0}}>
              <AppSearch />
            </Col>,
            <Col flex={1}>
              {user && <UserMenu user={user} />}
            </Col>
          ]}
        </HeaderRow>
      </Container>
    </Affix>
  )
}
