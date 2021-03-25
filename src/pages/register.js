import React from 'react';
import { Input, Form, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { history, connect } from 'umi';

const Register = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 7 },
  };

  const validateForm = () => {
    form
      .validateFields(['username', 'password'])
      .then(() => {
        dispatch({
          type: 'user/register',
          payload: form.getFieldsValue(),
        }).then(res => {
          if (res) {
            const { status, data } = res;
            if (status == 200 && data.message == 'success') {
              message
                .success('注册成功', 0.5)
                .then(() => history.push('/login'));
            } else if (status == 200 && data.message == "failure") {
              message.error('用户名已注册');
            }
            else {
              message.error('server error');
            }
          }
        });
      })
      .catch(error => {});
  };

  const backPage = () => {
    history.goBack();
  };

  return (
    <div type="flex" align="middle">
      <Form form={form} {...layout}>
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
      <Button
        type="primary"
        style={{ marginTop: '16px', marginLeft: '20px' }}
        onClick={() => backPage()}
      >
        返回
      </Button>
    </div>
  );
};

export default connect(({ user }) => ({
  user,
}))(Register);
