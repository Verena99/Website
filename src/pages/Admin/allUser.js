import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';

const { Column } = Table;

const allUser = props => {
  const [tokenList, setTokenList] = useState();
  const {
    location: { query },
  } = props;
  useEffect(() => {
    //fetch请求我的待审批的tokenInfo
    let temp = new Array(12).fill({
      name: 'ccy',
      class: '普通用户',
      userId: '1234',
      level: '钻石',
      registrationTime: '2019/8/21',
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
        <Column title="用户名" dataIndex="name" key="name" />
        <Column title="用户类型" dataIndex="class" key="class" />
        <Column title="用户级别" dataIndex="level" key="level" />
        <Column
          title="注册时间"
          dataIndex="registrationTime"
          key="registrationTime"
        />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/userInfo/${record.userId}`}>查看</Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default allUser;
