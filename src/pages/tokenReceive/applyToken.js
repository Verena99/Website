import React, { useEffect, useState } from 'react';
import { Input, Descriptions, Button } from 'antd';
import style1 from '@/css/showToken.css';
import { history } from 'umi';
import axios from 'axios';
const { TextArea } = Input;
const statusList = {
  0: '未知',
  1: '待响应',
  2: '已完成',
  3: '取消',
  4: '到期未达成',
};
const applyToken = props => {
  const {
    location: { query },
  } = props;
  const callup_id = query.callup_id;
  const callee_id = query.userId;
  const [applyInfo, setApply] = useState('');
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
    /*请求tokenInfo
    axios({
      method: 'get',
      url: '/api/v1/callup',
      params: {
        page: 1,
        page_size: 1,
        callup_id,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setTokenInfo(response.data.callup_list[0]);
        }
        else
          throw Error('error status:', response.status);
      })
      .catch((error) => {
        console.log(error)
      })*/
    let temp = {
      name: 'xxx',
      type: 0, //类型
      caller_id: 123,
      success_num: 10,
      end_time: 123323456,
      status: 0,
      desc: 'bala bala',
      city: 0,
      photo_url: '../../assets/ZJL.png',
    };
    setTokenInfo(temp);
  }, []);
  const onChange = e => {
    setApply(e.target.value);
  };
  const saveApplication = () => {
    /*发送接令申请
    axios({
      method: 'post',
      url: '/api/v1/application',
      data: {
        callee_id,
        callup_id,
        desc:applyInfo
      },
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("请求成功");
        }
        else
          throw Error('error status:', response.status);
      })
      .catch((error) => {
        console.log(error)
      })*/
    console.log(callup_id, applyInfo, callee_id);
    history.goBack();
  };

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
          {new Date(tokenInfo.end_time).toLocaleString()}
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
