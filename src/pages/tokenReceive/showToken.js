import React from 'react';
import { Descriptions } from 'antd';
import styles from '@/css/showToken.css';
import Button from 'antd/es/button';
import { history } from 'umi';
const showToken = props => {
  const { match } = props;
  const tokenId = match.params.tokenId;
  return (
    <>
      <Descriptions title="召集令信息" className={styles.info} bordered>
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
      <Button
        className={styles.return_button}
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
