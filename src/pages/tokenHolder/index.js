import React, { useEffect, useState } from 'react';
import { Card, Table, Button, message } from 'antd';
import NewToken from './newToken';
import TokenDetail from './tokenDetail';
import { connect } from 'umi';

const Token = props => {
  const { caller_id, dispatch } = props;
  const [createToken, setCreateToken] = useState(false);
  const [update, setUpdate] = useState();
  const [tokenName, setTokenName] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState();
  const [tokenInfo, setTokenInfo] = useState();
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
      render: text => <>{new Date(text * 1000).toLocaleString()}</>,
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
                setTokenInfo(record);
                clickDetail(record.name, record.id);
              }}
            >
              详情
            </a>
            <a
              style={{ marginLeft: '10px' }}
              onClick={() => changeToken(record.id, record)}
            >
              修改
            </a>
            <a
              style={{ marginLeft: '10px' }}
              onClick={() => deleteToken(record.id)}
            >
              删除
            </a>
          </div>
        ) : (
          <a
            onClick={() => {
              setTokenInfo(record);
              clickDetail(record.name, record.id);
            }}
          >
            详情
          </a>
        ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'token/tokenList',
      payload: { page, page_size: pageSize, caller_id },
    }).then(res => {
      if (res) {
        setData(res.callup_list);
        setTotalPage(res.total);
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'token/tokenList',
      payload: { page, page_size: pageSize, caller_id },
    }).then(res => {
      if (res) {
        setData(res.callup_list);
        setTotalPage(res.total);
      }
    });
  }, [page, refresh]);

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

  const changeToken = (id, record) => {
    setTokenInfo(record);
    setTokenId(id);
    setUpdate(true);
    setCreateToken(true);
  };

  return (
    <>
      {!showDetail && (
        <Card
          title="召集令列表"
          style={{ height: '100%' }}
          extra={
            <Button
              type="primary"
              onClick={() => {
                setUpdate(false);
                setCreateToken(true);
              }}
            >
              新建召集令
            </Button>
          }
        >
          <Table
            dataSource={data}
            columns={columns}
            pagination={{
              current: page,
              total: totalPage,
              pageSize: pageSize,
              onChange: page => {
                console.log(page);
                setPage(page);
              },
            }}
          />
        </Card>
      )}
      <NewToken
        createToken={createToken}
        setCreateToken={setCreateToken}
        setRefresh={setRefresh}
        refresh={refresh}
        update={update}
        tokenId={tokenId}
        tokenInfo={tokenInfo}
      />
      {showDetail && (
        <TokenDetail
          tokenName={tokenName}
          data={tokenInfo}
          tokenId={tokenId}
          setShowDetail={setShowDetail}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};

export default connect(({ user }) => ({
  caller_id: user.currentUser.user_id,
}))(Token);
