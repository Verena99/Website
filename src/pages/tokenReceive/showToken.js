import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import style1 from '@/css/showToken.css';
import Button from 'antd/es/button';
import { history } from 'umi';
import axios from 'axios';
const statusList = {
  0: '未知',
  1: '待响应',
  2: '已完成',
  3: '取消',
  4: '到期未达成',
};
const showToken = props => {
  const { match } = props;
  const callup_id = match.params.tokenId;
  console.log(callup_id);
  const [tokenInfo, setTokenInfo] = useState({
    name: 'xxx',
    type: 0, //类型
    caller_id: 123,
    success_num: 10,
    end_time: 123323456,
    status: 0,
    desc: 'bala bala',
    city: 0,
    photo_url: '../../assets/ZJL.png',
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/callup',
      params: {
        page: 1,
        page_size: 1,
        callup_id: Number(callup_id),
      },
    })
      .then(response => {
        setTokenInfo(response.data.callup_list[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Descriptions title="召集令信息" className={style1.info} bordered>
        <Descriptions.Item label="名称">{tokenInfo.name}</Descriptions.Item>
        <Descriptions.Item label="类型">{tokenInfo.type}</Descriptions.Item>
        <Descriptions.Item label="所属令主">
          {tokenInfo.caller_id}
        </Descriptions.Item>
        <Descriptions.Item label="召集人数">
          {tokenInfo.success_num}
        </Descriptions.Item>
        <Descriptions.Item label="结束日期">
          {new Date(tokenInfo.end_time * 1000).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="当前状态">
          {statusList[tokenInfo.status]}
        </Descriptions.Item>
        <Descriptions.Item label="介绍照片">
          <img alt="logo" src={require('../../assets/ZJL.png')} />
        </Descriptions.Item>
        <Descriptions.Item label="具体描述" span={3}>
          {tokenInfo.desc}
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
export default showToken;
