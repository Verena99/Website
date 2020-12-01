import React, { useState } from 'react';
import { Input, Form, Button, message, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { history } from 'umi';

const Register = props => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 6 },
  };

  const validateForm = () => {
    form
      .validateFields([
        'name',
        'phone',
        'idType',
        'idNumber',
        'city',
        'username',
        'password',
      ])
      .then(() => {
        history.push('/login');
      })
      .catch(error => {});
  };

  return (
    <div type="flex" align="middle">
      <Form form={form} {...layout}>
        <Form.Item
          label="姓名"
          name="name"
          // className={styles.itemWidth}
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          // className={styles.itemWidth}
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          label="证件类型"
          name="idType"
          // className={styles.itemWidth}
          rules={[{ required: true, message: '请选择证件类型' }]}
        >
          <Select style={{ width: '260px' }}>
            <Select.Option value="1">中华人民共和国居民身份证</Select.Option>
            <Select.Option value="2">港澳台居民居住证</Select.Option>
            <Select.Option value="3">香港居民身份证</Select.Option>
            <Select.Option value="4">澳门居民身份证</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="证件编号"
          name="idNumber"
          rules={[{ required: true, message: '请输入证件编号' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          label="城市"
          name="city"
          rules={[{ required: true, message: '请输入城市' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          id="userId"
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码(不少于6位)', min: 6 }]}
        >
          <Input.Password
            className={styles.login}
            placeholder="不少于6位"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        style={{ marginTop: '16px' }}
        onClick={() => validateForm()}
      >
        注册
      </Button>
    </div>
  );
};

export default Register;
