import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Form, Input, Layout, message, PageHeader, Spin } from 'antd';
import { useRouter } from 'next/router';
import * as Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../data/store/actions';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import styled from 'styled-components';
import GuestPage from '../components/layouts/GuestPage';

const { Content } = Layout;
const LoginCard = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`
export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const { email, password } = values;
    setLoading(true);

    const loginData = await fetch('/api/v3/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email,
          password,
          password_confirmation: password
        }
      })
    })
      .then(res => res.json())
      .catch(err => err);

    setLoading(false);
    if (loginData && loginData.errors) {
      message.error(loginData.errors);
    } else if (loginData.error) {
      message.error(loginData.error);
    } else {
      // Logged in correctly
      dispatch(setUser(loginData[0].user))
      dispatch(setToken(loginData[0].auth_token))
      Cookies.set('token', loginData[0].auth_token);
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
      <PageHeader
        // onBack={() => null}
        title="Boards"
      />
      <Content style={{padding: '0 20px 20px'}}>
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