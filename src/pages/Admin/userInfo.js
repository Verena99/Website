import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import style1 from '@/css/showToken.css';
import Button from 'antd/es/button';
import { history } from 'umi';
import axios from 'axios';
const userType = { 0: '未知', 1: '普通用户', 2: '系统管理员' };
const userLevel = { 0: '未知', 1: '一般', 2: '重要', 3: '钻石级' };
const provinceData = {
  0: '未知',
  1: '北京市',
  2: '天津市',
  3: '河北省',
  4: '山西省',
  5: '内蒙古自治区',
  6: '辽宁省',
  7: '吉林省',
  8: '黑龙江省',
  9: '上海市',
  10: '江苏省',
  11: '浙江省',
  12: '安徽省',
  13: '福建省',
  14: '江西省',
  15: '山东省',
  16: '河南省',
  17: '湖北省',
  18: '湖南省',
  19: '广东省',
  20: '广西壮族自治区',
  21: '海南省',
  22: '重庆市',
  23: '四川省',
  24: '贵州省',
  25: '云南省',
  26: '西藏自治区',
  27: '陕西省',
  28: '甘肃省',
  29: '青海省',
  30: '宁夏回族自治区',
  31: '新疆维吾尔自治区',
  32: '台湾省',
  33: '香港特别行政区',
  34: '澳门特别行政区',
};
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
    city: '北京',
    registrationTime: '2019/8/21',
    changeTime: '2019/9/22',
    introduction: 'bala bala bala',
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/user',
      page: 1,
      page_size: 1,
      user_id: userId,
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
