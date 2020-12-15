import React, { useEffect, useState } from 'react';
import { Input, Descriptions, Button } from 'antd';
import axios from 'axios';
import style1 from '@/css/showToken.css';
import { history } from 'umi';
const { TextArea } = Input;
const statusList = {
  0: '未知',
  1: '待响应',
  2: '已完成',
  3: '取消',
  4: '到期未达成',
};
const typleList = {
  0: '未知',
  1: '技术交流',
  2: '学业探讨',
  3: '社会实践',
  4: '公益志愿者',
  5: '游玩',
};
const changeApplication = props => {
  const {
    location: { query },
  } = props;
  const callup_id = query.callup_id;
  const application_id = query.application_id;
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
    //请求tokenInfo和applyInfo
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
        if (response.status === 200) {
          axios({
            method: 'get',
            url: '/api/v1/application',
            params: {
              page: 1,
              page_size: 1,
              application_id: Number(application_id),
            },
          })
            .then(res => {
              if (res.status === 200) {
                setTokenInfo(response.data.callup_list[0]);
                setApply(res.data.application_list[0].desc);
              } else throw Error('error status:', response.status);
            })
            .catch(error => {
              console.log(error);
            });
        } else throw Error('error status:', response.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onChange = e => {
    setApply(e.target.value);
  };
  const saveApplication = () => {
    //更新申请
    axios({
      method: 'patch',
      url: `/api/v1/application/${application_id}`,
      data: {
        desc: applyInfo,
        is_canceled: 0,
      },
    })
      .then(res => {
        if (res.status == 200) {
          console.log('已更新请求');
          history.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Descriptions title="召集令信息" className={style1.info} bordered>
        <Descriptions.Item label="名称">{tokenInfo.name}</Descriptions.Item>
        <Descriptions.Item label="类型">
          {typleList[tokenInfo.type]}
        </Descriptions.Item>
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
          <img
            alt="logo"
            src={`http://${tokenInfo.photo_url}`}
            style={{ height: '400px', width: 'auto' }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="具体描述" span={3}>
          {tokenInfo.desc}
        </Descriptions.Item>
      </Descriptions>

      <TextArea
        value={applyInfo}
        className={style1.applicationInfo}
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
export default changeApplication;
