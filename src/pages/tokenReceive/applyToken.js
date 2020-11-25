import React, { useEffect, useState } from 'react';
import { Input, Descriptions, Button } from 'antd';
import style1 from '@/css/showToken.css';
import { history } from 'umi';
const { TextArea } = Input;

const applyToken = props => {
  const { match } = props;
  const tokenId = match.params.tokenId;
  const {
    location: { query },
  } = props;
  const [applyInfo, setApply] = useState('');
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
  const onChange = e => {
    setApply(e.target.value);
  };
  const saveApplication = () => {
    //fetch 发送接令申请
    console.log(tokenId, applyInfo, query.userId);
    history.goBack();
  };

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
      <TextArea
        className={style1.applicationInfo}
        placeholder="textarea with clear icon"
        allowClear
        onChange={onChange}
      />
      <Button className={style1.save_button} onClick={saveApplication}>
        保存
      </Button>
      <Button
        className={style1.return_button}
        onClick={() => {
          history.goBack();
        }}
      >
        返回
      </Button>
    </>
  );
};
export default applyToken;
