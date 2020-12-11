import React, { useEffect, useState } from 'react';
import { Input, Form, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import { history, connect } from 'umi';
import md5 from 'js-md5';

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
            sso_name: form.getFieldValue('username'),
            password: md5(form.getFieldValue('password')),
          },
        }).then(res => {
          if (res) {
            dispatch({
              type: 'user/saveCurrentUser',
              payload: {
                name: form.getFieldValue('username'),
                user_id: res.user_id,
              },
            });
            if (res.admin_type === 2)
              history.push(`/admin/allUser?userId=${res.user_id}`);
            else if (res.admin_type === 1)
              history.push(`/system/tokenHolder?userId=${res.user_id}`);
            else message.error('用户名或密码错误');
          }
        });
        // console.log(md5(form.getFieldValue('password')));
        // dispatch({
        //   type: 'user/saveCurrentUser',
        //   payload: {
        //     name: form.getFieldValue('username'),
        //     caller_id: form.getFieldValue('username'),
        //   },
        // });
        // let userId = document.getElementById('userId').value;
        // if (userId === 'admin') {
        //   history.push(`/admin/allUser?userId=${userId}`);
        // } else {
        //   history.push(`/system/tokenHolder?userId=${userId}`);
        // }
      })
      .catch(error => {});
  };

  const goToRegister = () => {
    history.push('/register');
  };

  useEffect(() => {}, []);

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

export default connect(({ user }) => ({
  user,
}))(LogIn);
