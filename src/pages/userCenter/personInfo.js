import React from 'react';
import { Form, Select, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { connect } from 'umi';

const PersonInfo = props => {
  const { userInfo } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 6 },
  };

  const backToPage = () => {
    history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Form form={form} {...layout}>
          <Form.Item label="姓名" name="name">
            <Input
              className={styles.login}
              defaultValue={userInfo.name}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input className={styles.login} defaultValue={userInfo.phone} />
          </Form.Item>
          <Form.Item label="证件类型" name="idType">
            <Select
              style={{ width: '238.6px' }}
              defaultValue={userInfo.idType}
              disabled
            >
              <Select.Option value="1">中华人民共和国居民身份证</Select.Option>
              <Select.Option value="2">港澳台居民居住证</Select.Option>
              <Select.Option value="3">香港居民身份证</Select.Option>
              <Select.Option value="4">澳门居民身份证</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="证件编号" name="idNumber">
            <Input
              className={styles.login}
              defaultValue={userInfo.idNumber}
              disabled
            />
          </Form.Item>
          <Form.Item label="城市" name="city">
            <Input
              className={styles.login}
              defaultValue={userInfo.city}
              disabled
            />
          </Form.Item>
          <Form.Item id="userId" label="用户名" name="username">
            <Input
              className={styles.login}
              defaultValue={userInfo.username}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码(不少于6位)', min: 6 },
            ]}
          >
            <Input.Password
              className={styles.login}
              defaultValue={userInfo.password}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Form>
        <div type="flex" align="middle">
          <Button
            style={{ marginTop: '16px', textAlign: 'center' }}
            type="primary"
            onClick={() => {
              backToPage();
            }}
          >
            确认
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(({ user }) => ({
  userInfo: user.userInfo,
}))(PersonInfo);
