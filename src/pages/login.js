import React, { useEffect } from 'react';
import { Input, Form, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import { history, connect } from 'umi';

const LogIn = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();

  const validateForm = () => {
    form
      .validateFields(['username', 'password'])
      .then(() => {
        dispatch({
          type: 'user/login',
          payload: {
            username: form.getFieldValue('username'),
            password: form.getFieldValue('password'),
          },
        }).then(res => {
          if (res) {
            const { status, data } = res;
            if (status == 200) {
              if (data.message == 'success') {
                // 尚无system
                message
                  .success('登录成功', 0.5)
                  .then(() => history.push('/system'));
              } else {
                message.error('用户名或密码错误');
              }
            } else {
              message.error('server error');
            }
          }
        });
      })
      .catch(error => {console.log(error)});
  };

  const goToRegister = () => {
    history.push('/register');
  };

  useEffect(() => {}, []);

  return (
    <div type="flex" align="middle">
      <Form form={form} style={{ verticalAlign: 'middle', marginTop: '100px' }}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            id="userId"
            className={styles.login}
            placeholder="用户名"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            className={styles.login}
            placeholder="密码"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <span className={styles.noAccount}>还没有账号?</span>
          <a onClick={() => goToRegister()} style={{ fontSize: '12px' }}>
            注册
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => validateForm()}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(({ user }) => ({
  user,
}))(LogIn);
