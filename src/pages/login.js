import React, { useState } from 'react';
import { Input, Form, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import { history } from 'umi';

const LogIn = props => {
  const [form] = Form.useForm();

  const validateForm = () => {
    form
      .validateFields(['username', 'password'])
      .then(() => {
        let userId = document.getElementById('userId').value;
        if (userId === 'admin') {
          history.push(`/admin/allUser?userId=${userId}`);
        } else {
          history.push(`/system/tokenHolder?userId=${userId}`);
        }
      })
      .catch(error => {});
  };

  const goToRegister = () => {
    history.push('/register');
  };

  return (
    <div type="flex" align="middle">
      <Form form={form} style={{ verticalAlign: 'middle' }}>
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

export default LogIn;
