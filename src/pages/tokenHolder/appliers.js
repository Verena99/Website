import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Descriptions, message } from 'antd';
import { connect } from 'umi';

const Appliers = props => {
  const { dispatch, caller_id, tokenId, appliersList } = props;
  const [applierVisible, setApplierVisible] = useState(false);
  const [pageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [applierInfo, setApplierInfo] = useState();
  const [refresh, setRefresh] = useState();
  const accept = 1;
  const reject = 2;
  const column = [
    {
      title: '申请者ID',
      dataIndex: 'callee_id',
      key: 'callee_id',
      render: (text, record) => (
        <a
          onClick={() => {
            showApplier(record.callee_id, text);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '说明',
      dataIndex: 'desc',
      key: 'desc',
    },
    // {
    //   title: '申请时间',
    //   dataIndex: 'applyTime',
    //   key: 'applyTime',
    // },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <>
          <Button
            type="text"
            style={{ color: '#1890ff' }}
            onClick={() => dealApply(record.id, accept, index)}
          >
            同意
          </Button>
          <Button
            type="text"
            style={{ color: '#1890ff' }}
            onClick={() => dealApply(record.id, reject, index)}
          >
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

  // // 获取申请人列表
  // useEffect(() => {
  //   dispatch({
  //     type: 'token/fetchApplications',
  //     payload: { page_size: pageSize, page: current, callup_id: tokenId },
  //   }).then(res => {
  //     if (res) {
  //       setApplierList(res.application_list);
  //       setTotalPage(res.total);
  //     }
  //   });
  // }, []);

  // 获取申请人信息
  const showApplier = (id, text) => {
    setApplierVisible(true);
    dispatch({
      type: 'user/fetchUser',
      payload: { page_size: 1, page: 1, user_id: id },
    }).then(res => {
      if (res) {
        res.user_list.applierName = text;
        setApplierInfo(res.user_list);
      }
    });
  };

  // 处理申请 接受：1 拒绝：2
  const dealApply = (id, action, index) => {
    if (action === 1) appliersList[index].status = '2';
    if (action === 2) {
      appliersList[index].status = '3';
    }
    dispatch({
      type: 'token/dealApply',
      payload: { action_type: action, application_id: id, caller_id },
    }).then(res => {
      if ('code' in res) {
        message.error(res.message);
      } else {
        message.success('处理成功');
        setRefresh(!refresh);
      }
    });
  };

  return (
    <>
      <Table
        columns={column}
        dataSource={appliersList.filter(item => item.status === 1)}
        style={{ margin: '15px' }}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: totalPage,
          onChange: page => setCurrent(page),
        }}
      />
      {applierVisible && (
        <Modal
          centered
          maskClosable={false}
          closable={true}
          width="600px"
          visible={applierVisible}
          footer={
            <Button type="primary" onClick={() => setApplierVisible(false)}>
              确认
            </Button>
          }
        >
          <Descriptions title="申请人信息" bordered>
            <Descriptions.Item label="申请人" span={2}>
              {applierInfo.applierName}
            </Descriptions.Item>
            <Descriptions.Item label="所在城市">
              {applierInfo.city}
            </Descriptions.Item>
            <Descriptions.Item label="电话号码" span={3}>
              {applierInfo.phone}
            </Descriptions.Item>
            {/* <Descriptions.Item label="申请时间" span={3}>
            {applierInfo.applyTime}
          </Descriptions.Item> */}
            <Descriptions.Item label="简介">
              {applierInfo.desc}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </>
  );
};

export default connect(({ token, user }) => ({
  token,
  caller_id: user.currentUser.user_id,
}))(Appliers);
