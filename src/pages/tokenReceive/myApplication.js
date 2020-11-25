import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';

const { Column } = Table;

const myApplication = props => {
  const [tokenList, setTokenList] = useState();
  const {
    location: { query },
  } = props;
  useEffect(() => {
    //fetch请求我的待审批的tokenInfo
    let temp = new Array(12).fill({
      name: '国图志愿',
      class: '公益志愿者',
      tokenId: '123',
      people: 10,
      startTime: '2020/9/1',
      endTime: '2020/10/1',
      state: '待处理',
    });
    setTokenList(temp);
  }, []);
  function confirm(tokenId) {
    message.success('已删除该请求' + tokenId);
    //fetch 发送请求：删除申请
    console.log(query.userId, tokenId);
    //fetch 发送请求重新获取我的待审批的申请
  }
  return (
    <>
      <Table
        className={style1.applicationList}
        dataSource={tokenList}
        pagination={{ pageSize: 12 }}
      >
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="类别" dataIndex="class" key="class" />
        <Column title="人数" dataIndex="people" key="people" />
        <Column title="创建时间" dataIndex="startTime" key="startTime" />
        <Column title="结束时间" dataIndex="endTime" key="endTime" />
        <Column title="状态" dataIndex="state" key="state" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link
                to={`/system/tokenReceive/changeApplication/${record.tokenId}`}
              >
                修改申请
              </Link>
              <Popconfirm
                title="你确定要删除该接令申请吗?"
                onConfirm={confirm.bind(this, record.tokenId)}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">删除</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default myApplication;
