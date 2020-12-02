import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';
import axios from 'axios';
const { Column } = Table;
const page_size = 10;
const userType = { 0: '系统管理员', 1: '普通用户' };
const userLevel = { 0: '钻石级', 1: '重要', 2: '一般' };
const allUser = props => {
  const [userList, setUserList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const {
    location: { query },
  } = props;
  useEffect(() => {
    /*axios({
      method: 'get',
      url: '/api/v1/user',
        page: currentPage,
        page_size,
    })
      .then((response) => {
        if(response.status===200){
            setUserList(response.data.user_list);
            setTotal(response.data.total)
        }
        else
          throw Error('error status:',response.status);
      })
      .catch((error) => {
        console.log(error)
      })*/
    let temp = new Array(12).fill({
      name: 'ccy',
      admin_type: 0,
      city: 0,
      level: 0,
      desc: 'balabalabbbbb',
      id: 0,
    });
    setUserList(temp);
  }, []);
  function confirm(tokenId) {
    message.success('已删除该请求' + tokenId);
    //fetch 发送请求：删除申请
    console.log(query.userId, tokenId);
    //fetch 发送请求重新获取我的待审批的申请
  }
  function handleChangePage(page) {
    setCurrentPage(page);
  }
  return (
    <>
      <Table
        className={style1.applicationList}
        dataSource={userList}
        pagination={{
          pageSize: 10,
          current: currentPage,
          onChange: handleChangePage,
          total: total,
        }}
      >
        <Column title="用户名" dataIndex="name" key="name" />
        <Column
          title="用户类型"
          key="admin_type"
          render={(text, record) => (
            <Space size="middle">{userType[record.admin_type]}</Space>
          )}
        />
        <Column
          title="用户级别"
          key="level"
          render={(text, record) => (
            <Space size="middle">{userLevel[record.level]}</Space>
          )}
        />
        <Column title="用户简介" dataIndex="desc" key="desc" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/userInfo/${record.id}`}>查看</Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default allUser;
