import * as React from 'react';
import { Button, Card, Form, Input, Layout, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import * as Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../data/store/actions';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import styled from 'styled-components';
import GuestPage from '../components/layouts/GuestPage';
import { login } from '../utils/fetchers/login';
import { useApi } from '../components/shared/ApiProvider';
import { isLoading } from '../data/store/selectors';
import { User } from '../types/app.types';

const { Content } = Layout;
const LoginCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`;
export default function Login() {
  const dispatch = useDispatch();
  const { request } = useApi();
  const loading: boolean = useSelector(isLoading);
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { email, password } = values;

    const loginData = await request<{ errors?: string; error?: string; }>(login, email, password);

    if (loginData && loginData.errors) {
      message.error(loginData.errors);
    } else if (loginData.error) {
      message.error(loginData.error);
    } else {
      // Logged in correctly
      const loggedInData: { user: User; auth_token: string; } = (loginData as { user: User; auth_token: string; }[])[0];
      dispatch(setUser(loggedInData.user))
      dispatch(setToken(loggedInData.auth_token))
      Cookies.set('token', loggedInData.auth_token);
      router.push('/');
    }
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  return (
    <GuestPage>
      <Content style={{padding: '20px'}}>
        <LoginCard title={'Sign in'}>
          <Spin spinning={loading}>
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </LoginCard>
      </Content>
    </GuestPage>
  )
}
