import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Descriptions, Button } from 'antd';
import style1 from '@/css/showToken.css';
import { history } from 'umi';
const { TextArea } = Input;

const onChange = e => {
  console.log(e);
};

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    tokenId: '1',
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    tokenId: '2',
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    tokenId: '3',
  },
];

const changeApplication = props => {
  return (
    <>
      <Descriptions title="召集令信息" className={style1.info} bordered>
        <Descriptions.Item label="名称">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="类型">Prepaid</Descriptions.Item>
        <Descriptions.Item label="所属令主">YES</Descriptions.Item>
        <Descriptions.Item label="召集人数">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="结束日期">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="当前状态">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="介绍照片">
          <img alt="logo" src={require('../../assets/ZJL.png')} />
        </Descriptions.Item>
        <Descriptions.Item label="具体描述" span={3}>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
      <TextArea
        defaultValue="xxxxxxx"
        className={style1.applicationInfo}
        allowClear
        onChange={onChange}
      />
      <Button
        className={style1.return_button}
        onClick={() => {
          history.goBack();
        }}
      >
        return
      </Button>
    </>
  );
};
export default changeApplication;
