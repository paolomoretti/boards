import { Affix, Col, Row } from 'antd';
import styled from 'styled-components';
import Logo from './Logo';
import UserMenu from './UserMenu';
import Link from 'next/link';
import { User } from '../../types/app.types';
import { useSelector } from 'react-redux';
import { getUser } from '../../data/store/selectors';
import { Size } from '../../styles/vars';
import AppSearch from './AppSearch';

const LogoEl = styled(Logo)`
  cursor: pointer;
`;
const HeaderRow = styled(Row)`
  background: antiquewhite;
  min-height: ${Size.HEADER_HEIGHT}px;
  
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
    <Affix offsetTop={0} style={{zIndex: 1000}}>
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
    </Affix>
  )
}
