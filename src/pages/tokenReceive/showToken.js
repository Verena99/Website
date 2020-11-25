import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import style1 from '@/css/showToken.css';
import Button from 'antd/es/button';
import { history } from 'umi';
const showToken = props => {
  const { match } = props;
  const tokenId = match.params.tokenId;
  const [tokenInfo, setTokenInfo] = useState({
    name: 'xxx',
    class: '公益志愿者',
    owner: 'cyn',
    people: 10,
    startTime: '2020/9/1',
    endTime: '2020/10/1',
    state: '待处理',
    picture: '../../assets/ZJL.png',
    description: 'bala bala',
  });

  useEffect(() => {
    //fetch请求tokenInfo
    let temp = {
      name: '国图志愿',
      class: '公益志愿者',
      owner: 'cyn',
      people: 10,
      startTime: '2020/9/1',
      endTime: '2020/10/1',
      state: '待处理',
      picture: '../../assets/ZJL.png',
      description: 'bala bala',
    };
    setTokenInfo(temp);
  }, []);
  return (
    <>
      <Descriptions title="召集令信息" className={style1.info} bordered>
        <Descriptions.Item label="名称">{tokenInfo.name}</Descriptions.Item>
        <Descriptions.Item label="类型">{tokenInfo.class}</Descriptions.Item>
        <Descriptions.Item label="所属令主">
          {tokenInfo.owner}
        </Descriptions.Item>
        <Descriptions.Item label="召集人数">
          {tokenInfo.people}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {tokenInfo.startTime}
        </Descriptions.Item>
        <Descriptions.Item label="结束日期">
          {tokenInfo.endTime}
        </Descriptions.Item>
        <Descriptions.Item label="当前状态">
          {tokenInfo.state}
        </Descriptions.Item>
        <Descriptions.Item label="介绍照片">
          <img alt="logo" src={require('../../assets/ZJL.png')} />
        </Descriptions.Item>
        <Descriptions.Item label="具体描述" span={3}>
          {tokenInfo.description}
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
