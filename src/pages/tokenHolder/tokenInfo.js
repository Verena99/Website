import React, { useState, useEffect } from 'react';
import { Descriptions, Badge } from 'antd';
import { tokenType, tokenStatus } from '@/global';

const TokenInfo = props => {
  const { tokenId, dispatch, tokenInfo } = props;

  return (
    <>
      {tokenInfo && (
        <Descriptions
          style={{ margin: '10px', height: 'calc(100% - 21px)' }}
          bordered
        >
          <Descriptions.Item label="名称" span={2}>
            {tokenInfo.name}
          </Descriptions.Item>
          <Descriptions.Item label="类型">
            {tokenType[tokenInfo.type]}
          </Descriptions.Item>
          <Descriptions.Item label="召集人数">
            {`${tokenInfo.success_num}/${tokenInfo.quota}`}
          </Descriptions.Item>
          {/* <Descriptions.Item label="创建时间">
          {tokenInfo.startTime}
        </Descriptions.Item> */}
          <Descriptions.Item label="结束日期">
            {new Date(tokenInfo.end_time * 1000).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="当前状态">
            {tokenInfo.status === 1 && <Badge status="processing" />}
            {tokenInfo.status === 2 && <Badge status="success" />}
            {tokenInfo.status === 3 && <Badge status="Default" />}
            {tokenInfo.status === 4 && <Badge status="Error" />}
            {tokenStatus[tokenInfo.status]}
          </Descriptions.Item>
          <Descriptions.Item label="具体描述" span={3}>
            {tokenInfo.desc}
          </Descriptions.Item>
          <Descriptions.Item label="介绍照片">
            <img
              alt="logo"
              src={`http://${tokenInfo.photo_url}`}
              style={{ height: '400px', width: 'auto' }}
            />
          </Descriptions.Item>
        </Descriptions>
      )}
    </>
  );
};

export default TokenInfo;
