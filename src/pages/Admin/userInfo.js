import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import style1 from '@/css/showToken.css';
import Button from 'antd/es/button';
import { history } from 'umi';
const userInfo = props => {
  const { match } = props;
  const tokenId = match.params.userId;
  const [userInfo, setUserInfo] = useState({
    name: 'ccy',
    class: '普通用户',
    userId: '1234',
    level: '钻石',
    key: 'cyn252127',
    trueName: '李明',
    credentialType: '身份证',
    credentialNumber: '511002199806127632',
    phone: '18810224693',
    city: '北京',
    registrationTime: '2019/8/21',
    changeTime: '2019/9/22',
    introduction: 'bala bala bala',
  });

  useEffect(() => {
    //fetch请求tokenInfo
    let temp = {
      name: 'ccy',
      class: '普通用户',
      userId: '1234',
      level: '钻石',
      key: 'cyn252127',
      trueName: '李明',
      credentialType: '身份证',
      credentialNumber: '511002199806127632',
      phone: '18810224693',
      city: '北京',
      registrationTime: '2019/8/21',
      changeTime: '2019/9/22',
      introduction: 'bala bala bala',
    };
    setUserInfo(temp);
  }, []);
  return (
    <>
      <Descriptions title="用户信息" className={style1.info} bordered>
        <Descriptions.Item label="用户名">{userInfo.name}</Descriptions.Item>
        <Descriptions.Item label="用户类型">{userInfo.class}</Descriptions.Item>
        <Descriptions.Item label="用户级别">{userInfo.level}</Descriptions.Item>
        <Descriptions.Item label="登陆密码">{userInfo.key}</Descriptions.Item>
        <Descriptions.Item label="用户姓名">
          {userInfo.trueName}
        </Descriptions.Item>
        <Descriptions.Item label="证件类型">
          {userInfo.credentialType}
        </Descriptions.Item>
        <Descriptions.Item label="证件号码">
          {userInfo.credentialNumber}
        </Descriptions.Item>
        <Descriptions.Item label="手机号码">{userInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="注册城市">{userInfo.city}</Descriptions.Item>
        <Descriptions.Item label="注册时间">
          {userInfo.registrationTime}
        </Descriptions.Item>
        <Descriptions.Item label="修改时间">
          {userInfo.changeTime}
        </Descriptions.Item>
        <Descriptions.Item label="用户简介" span={3}>
          {userInfo.introduction}
        </Descriptions.Item>
      </Descriptions>
      <Button
        className={style1.return}
        onClick={() => {
          history.goBack();
        }}
      >
        return
      </Button>
    </>
  );
};
export default userInfo;
