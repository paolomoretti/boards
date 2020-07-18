import * as React from "react";
import {Card, Layout, PageHeader, Form, Input, Button, Spin, message} from "antd";
import {useState} from "react";
import { useRouter } from 'next/router';
import * as Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../data/store/actions';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';

const { Content } = Layout;

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

  return (
    <Layout>
      <PageHeader
        // onBack={() => null}
        title="Boards"
      />
      <Content style={{padding: '0 20px 20px'}}>
        <Card title={'Sign in to boards'}>
          <Spin spinning={loading}>
            <Form
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
        </Card>
      </Content>
    </Layout>
  )
}