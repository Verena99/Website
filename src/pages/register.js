import React, { useState } from 'react';
import { Input, Form, Button, message, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { history, connect } from 'umi';
import md5 from 'js-md5';

const Register = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 7 },
  };
  const { TextArea } = Input;

  const validateForm = () => {
    form
      .validateFields([
        'name',
        'phone',
        'idType',
        'idNumber',
        'credential_number',
        'city',
        'username',
        'password',
        'desc',
        'sso_name',
      ])
      .then(() => {
        const userInfo = form.getFieldsValue();
        userInfo.city = Number(userInfo.city);
        userInfo.password = md5(userInfo.password);
        let { idType, ...params } = userInfo;
        dispatch({
          type: 'user/register',
          payload: params,
        }).then(res => {
          if ('id' in res) {
            history.push('/login');
          } else message.error('注册失败');
        });
      })
      .catch(error => {});
  };

  return (
    <div type="flex" align="middle">
      <Form form={form} {...layout}>
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input className={styles.login} />
        </Form.Item>
        <Form.Item
          label="证件类型"
          name="idType"
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
          name="credential_number"
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
          name="sso_name"
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
        <Form.Item
          label="简介"
          name="desc"
          rules={[{ required: true, message: '请输入简介!' }]}
        >
          <TextArea className={styles.login} />
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

export default connect(({ user }) => ({
  user,
}))(Register);
