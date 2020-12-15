import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import style1 from '@/css/showToken.css';
import Button from 'antd/es/button';
import { history } from 'umi';
import axios from 'axios';
import { provinceData } from '@/global';
const userType = { 0: '未知', 1: '普通用户', 2: '系统管理员' };
const userLevel = { 0: '未知', 1: '一般', 2: '重要', 3: '钻石级' };

const userInfo = props => {
  const { match } = props;
  const userId = match.params.userId;
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
    city: 0,
    registrationTime: '2019/8/21',
    changeTime: '2019/9/22',
    introduction: 'bala bala bala',
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/user',
      params: {
        page: 1,
        page_size: 1,
        user_id: userId,
      },
    })
      .then(response => {
        if (response.status === 200) {
          setUserInfo(response.data.user_list[0]);
        } else throw Error('error status:', response.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Descriptions title="用户信息" className={style1.info} bordered>
        <Descriptions.Item label="用户姓名">{userInfo.name}</Descriptions.Item>
        <Descriptions.Item label="用户名">
          {userInfo.sso_name}
        </Descriptions.Item>
        <Descriptions.Item label="用户类型">
          {userType[userInfo.admin_type]}
        </Descriptions.Item>
        <Descriptions.Item label="用户级别">
          {userLevel[userInfo.level]}
        </Descriptions.Item>
        <Descriptions.Item label="证件号码">
          {userInfo.credential_number}
        </Descriptions.Item>
        <Descriptions.Item label="手机号码">{userInfo.phone}</Descriptions.Item>
        <Descriptions.Item label="注册城市">
          {provinceData[userInfo.city]}
        </Descriptions.Item>
        <Descriptions.Item label="用户简介" span={3}>
          {userInfo.desc}
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
