import React, { useEffect, useState } from 'react';
import { Card, Table, Button, message } from 'antd';
import NewToken from './newToken';
import TokenDetail from './tokenDetail';
import { connect } from 'umi';

const tempdata = [
  {
    key: '1',
    name: '秋游',
    type: '游玩',
    success_num: 2,
    quota: 10,
    end_time: '2020/11/22 11:23:02',
  },
  {
    key: '2',
    name: '冬奥会志愿者',
    type: '公益志愿者',
    success_num: 3,
    quota: 9,
    end_time: '2020/11/02 9:00:00',
  },
  {
    key: '3',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: 1,
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '4',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: 0,
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '5',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: '1',
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '6',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: '1',
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '7',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: '1',
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '8',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: '1',
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '9',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: '1',
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
  {
    key: '10',
    name: '人工智能学术交流大会',
    type: '学业探讨',
    success_num: '1',
    quota: 10,
    end_time: '2020/9/5 08:10:40',
  },
];

const Token = props => {
  const { caller_id, dispatch } = props;
  const [createToken, setCreateToken] = useState(false);
  const [tokenName, setTokenName] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [data, setData] = useState(tempdata);
  const [totalPage, setTotalPage] = useState(12);
  const [refresh, setRefresh] = useState(false);
  const [tokenId, setTokenId] = useState();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '已召集人数',
      dataIndex: 'success_num',
      key: 'success_num',
    },
    {
      title: '目标召集人数',
      dataIndex: 'quota',
      key: 'quota',
    },
    {
      title: '截止时间',
      dataIndex: 'end_time',
      key: 'end_time',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) =>
        record.success_num === 0 ? (
          <div>
            <a
              onClick={() => {
                setTokenName(record.name);
                setShowDetail(true);
              }}
            >
              详情
            </a>
            <a
              style={{ marginLeft: '10px' }}
              onClick={() => deleteToken(record.callup_id)}
            >
              删除
            </a>
          </div>
        ) : (
          <a
            onClick={() => {
              clickDetail(record.name, record.id);
            }}
          >
            详情
          </a>
        ),
    },
  ];

  // useEffect(()=>{
  //   dispatch({
  //     type: 'token/tokenList',
  //     payload: { page, pageSize, caller_id },
  //   }).then((res)=>{
  //     if(res && res.data) {
  //       setData(res.callup_list);
  //       setTotalPage(res.total);
  //     }
  //   })
  // },[page, refresh])

  const clickDetail = (name, id) => {
    setTokenName(name);
    setTokenId(id);
    setShowDetail(true);
  };

  const deleteToken = callup_id => {
    dispatch({
      type: 'token/deleteToken',
      payload: { callup_id },
    }).then(res => {
      message.success('删除成功');
      setRefresh(!refresh);
    });
  };

  return (
    <div>
      {!showDetail && (
        <Card
          title="召集令列表"
          extra={
            <Button type="primary" onClick={() => setCreateToken(true)}>
              新建召集令
            </Button>
          }
        >
          <Table
            dataSource={data}
            columns={columns}
            pagination={{
              defaultCurrent: page,
              total: totalPage,
              pageSize: pageSize,
              onchange: page => {
                setPage(page);
              },
            }}
          />
        </Card>
      )}
      <NewToken createToken={createToken} setCreateToken={setCreateToken} />
      {showDetail && (
        <TokenDetail
          tokenName={tokenName}
          tokenId={tokenId}
          setShowDetail={setShowDetail}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default connect(({ user }) => ({
  caller_id: user.currentUser.caller_id,
}))(Token);
