import React, { useState, useEffect } from 'react';
import { Descriptions, Badge } from 'antd';

const TokenInfo = props => {
  const { tokenId, dispatch, tokenInfo } = props;
  // const [tokenInfo, setTokenInfo] = useState({
  //   name: 'xxx',
  //   type: '公益志愿者',
  //   success_num: 5,
  //   quota: 10,
  //   // startTime: '2020/9/1',
  //   end_time: '2020/10/1',
  //   status: '待响应',
  //   picture: '../../assets/ZJL.png',
  //   desc: 'bala bala',
  // });

  // useEffect(() => {
  //   dispatch({
  //     type: 'token/tokenList',
  //     payload: { page: 1, page_size: 1, callup_id: tokenId },
  //   }).then(res => {
  //     setTokenInfo(res.callup_list);
  //   });
  // }, []);

  return (
    <>
      <Descriptions style={{ margin: '10px' }} bordered>
        <Descriptions.Item label="名称">{tokenInfo.name}</Descriptions.Item>
        <Descriptions.Item label="类型">{tokenInfo.type}</Descriptions.Item>
        <Descriptions.Item label="召集人数">
          {`${tokenInfo.success_num}/${tokenInfo.quota}`}
        </Descriptions.Item>
        {/* <Descriptions.Item label="创建时间">
          {tokenInfo.startTime}
        </Descriptions.Item> */}
        <Descriptions.Item label="结束日期">
          {tokenInfo.end_time}
        </Descriptions.Item>
        <Descriptions.Item label="当前状态">
          {tokenInfo.status === '待响应' && <Badge status="processing" />}
          {tokenInfo.status === '已完成' && <Badge status="success" />}
          {tokenInfo.status === '已取消' && <Badge status="Default" />}
          {tokenInfo.status === '到期未达成' && <Badge status="Error" />}
          {tokenInfo.status}
        </Descriptions.Item>
        <Descriptions.Item label="具体描述" span={24}>
          {tokenInfo.desc}
        </Descriptions.Item>
        <Descriptions.Item label="介绍照片">
          <img alt="logo" src={require('../../assets/ZJL.png')} />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default TokenInfo;
