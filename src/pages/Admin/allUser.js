import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';
import axios from 'axios';
const { Column } = Table;
const page_size = 10;
const userType = { 0: '未知', 1: '普通用户', 2: '系统管理员' };
const userLevel = { 0: '未知', 1: '一般', 2: '重要', 3: '钻石级' };
const allUser = props => {
  const [userList, setUserList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const {
    location: { query },
  } = props;
  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/user',
      page: currentPage,
      page_size,
    })
      .then(response => {
        if (response.status === 200) {
          setUserList(response.data.user_list);
          setTotal(response.data.total);
        } else throw Error('error status:', response.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  function handleChangePage(page) {
    axios({
      method: 'get',
      url: '/api/v1/user',
      page,
      page_size,
    })
      .then(response => {
        if (response.status === 200) {
          setUserList(response.data.user_list);
          setTotal(response.data.total);
          setCurrentPage(page);
        } else throw Error('error status:', response.status);
      })
      .catch(error => {
        console.log(error);
      });
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
