import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { connect, history } from 'umi';
import { provinceData } from '@/global';
import md5 from 'js-md5';

const { TextArea } = Input;

const PersonInfo = props => {
  const { dispatch, user_id, userInfoExam } = props;
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState();
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 6 },
  };

  const backToPage = () => {
    const data = form.getFieldsValue();
    data.city = userInfo.city;
    data.password = md5(data.password);
    dispatch({
      type: 'user/changeUserInfo',
      payload: { user_id, data },
    }).then(res => {
      if (!'code' in res) {
        message.success('修改成功!');
        history.goBack();
      } else {
        message.error('修改失败！');
      }
    });
  };

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
      payload: { page: 1, page_size: 1, user_id: user_id },
    }).then(res => {
      if ('total' in res) {
        setUserInfo(res.user_list[0]);
        console.log(res.user_list[0]);
        message.success('请求成功');
        form.setFieldsValue({
          name: res.user_list[0].name,
          phone: res.user_list[0].phone,
          credential_number: res.user_list[0].credential_number,
          city: provinceData[res.user_list[0].city],
          sso_name: res.user_list[0].sso_name,
          des: res.user_list[0].desc,
        });
      } else message.error('Error');
    });
  }, []);

  return (
    <>
      {userInfo && (
        <div className={styles.container}>
          <div className={styles.content}>
            <Form form={form} {...layout}>
              <Form.Item label="姓名" name="name" key="name">
                <Input
                  className={styles.login}
                  defaultValue={userInfo.name}
                  disabled
                />
              </Form.Item>
              <Form.Item label="手机号" name="phone" key="phone">
                <Input className={styles.login} defaultValue={userInfo.phone} />
              </Form.Item>
              <Form.Item label="证件类型" name="idType">
                <Select style={{ width: '238.6px' }} defaultValue={1} disabled>
                  <Select.Option value={1}>
                    中华人民共和国居民身份证
                  </Select.Option>
                  <Select.Option value={2}>港澳台居民居住证</Select.Option>
                  <Select.Option value={3}>香港居民身份证</Select.Option>
                  <Select.Option value={4}>澳门居民身份证</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="证件编号"
                name="credential_number"
                key="credential_number"
              >
                <Input
                  disabled
                  className={styles.login}
                  defaultValue={userInfo.credential_number}
                />
              </Form.Item>
              <Form.Item label="城市" name="city" key="city">
                <Select defaultValue={provinceData[userInfo.city]} disabled>
                  {Object.keys(provinceData).map(province => (
                    <Option key={province} value={province}>
                      {provinceData[province]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                id="userId"
                label="用户名"
                name="sso_name"
                key="sso_name"
              >
                <Input
                  disabled
                  className={styles.login}
                  defaultValue={userInfo.sso_name}
                />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ message: '请输入密码(不少于6位)', min: 6 }]}
              >
                <Input.Password
                  className={styles.login}
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
                <TextArea
                  defaultValue={userInfo.desc}
                  className={styles.login}
                />
              </Form.Item>
            </Form>
            <div type="flex" align="middle">
              <Button
                style={{ marginTop: '16px', marginRight: '20px' }}
                type="primary"
                onClick={() => {
                  backToPage();
                }}
              >
                确认
              </Button>
              <Button
                style={{ marginTop: '16px' }}
                type="primary"
                onClick={() => {
                  history.goBack();
                }}
              >
                返回
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(({ user }) => ({
  user_id: user.currentUser.user_id,
}))(PersonInfo);
