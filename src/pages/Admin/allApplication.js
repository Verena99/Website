import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';

const { Column } = Table;

const allApplication = props => {
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
      applyOwner: 'ccy',
      description: 'balabababababa',
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
        <Column title="申请状态" dataIndex="state" key="state" />
        <Column
          title="申请描述"
          dataIndex="description"
          key="description"
          span={3}
        />
        <Column
          title="申请人"
          key="applyOwner"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/userInfo/${record.applyOwner}`}>
                {record.applyOwner}
              </Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default allApplication;
