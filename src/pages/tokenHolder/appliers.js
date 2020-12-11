import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Descriptions } from 'antd';

const Appliers = props => {
  const [applierVisible, setApplierVisible] = useState(false);
  const column = [
    {
      title: '申请者',
      dataIndex: 'applyName',
      key: 'applyName',
      render: (text, record) => (
        <a
          onClick={() => {
            showApplier();
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '说明',
      dataIndex: 'descriptor',
      key: 'descriptor',
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      key: 'applyTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="text" style={{ color: '#1890ff' }}>
            同意
          </Button>
          <Button type="text" style={{ color: '#1890ff' }}>
            拒绝
          </Button>
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      applyName: '马云',
      descriptor: '阿里集团创始人',
      applyTime: '2020-11-26 09:23:44',
    },
    {
      key: '2',
      applyName: '马化腾',
      descriptor: '腾讯集团创始人',
      applyTime: '2020-11-26 22:20:00',
    },
    {
      key: '3',
      applyName: '刘强东',
      descriptor: '京东集团创始人',
      applyTime: '2020-11-21 12:00:00',
    },
    {
      key: '4',
      applyName: '雷军',
      descriptor: '小米集团创始人',
      applyTime: '2020-09-06 16:56:00',
    },
  ];

  const sample = {
    applyName: '雷军',
    city: '湖北',
    phone: '18866668888',
    descriptor: '小米集团创始人',
    applyTime: '2020-09-06 16:56:00',
  };

  useEffect(() => {}, []);

  const showApplier = () => {
    setApplierVisible(true);
  };

  // 接受申请
  const acceptApply = () => {
    setApplierVisible(false);
  };

  // 拒绝申请
  const rejectApply = () => {};

  return (
    <>
      <Table
        columns={column}
        dataSource={data}
        style={{ margin: '15px' }}
      ></Table>
      <Modal
        centered
        maskClosable={false}
        closable={true}
        width="600px"
        visible={applierVisible}
        footer={
          <Button type="primary" onClick={() => acceptApply()}>
            确认
          </Button>
        }
      >
        <Descriptions title="申请人信息" bordered>
          <Descriptions.Item label="申请人" span={2}>
            {sample.applyName}
          </Descriptions.Item>
          <Descriptions.Item label="所在城市">{sample.city}</Descriptions.Item>
          <Descriptions.Item label="电话号码" span={3}>
            {sample.phone}
          </Descriptions.Item>
          <Descriptions.Item label="申请时间" span={3}>
            {sample.applyTime}
          </Descriptions.Item>
          <Descriptions.Item label="简介">
            {sample.descriptor}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Appliers;
