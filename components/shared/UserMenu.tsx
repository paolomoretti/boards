import { Avatar, Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { User } from '../../types/app.types';
import { doLogout } from '../../data/store/actions';

export default function UserMenu({ user }: { user: User; }) {
  const dispatch = useDispatch();
  const router = useRouter();
  if (!user) {
    return null;
  }

  const signOut = () => {
    dispatch(doLogout());
    router.push(`/login`);
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={signOut}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      {user && user.avatar ? (
        <Avatar shape="square" src={user.avatar.small} />
      ) : (
        <Avatar shape="square">{user.full_name[0].toUpperCase()}</Avatar>
      )}
    </Dropdown>
  )
}