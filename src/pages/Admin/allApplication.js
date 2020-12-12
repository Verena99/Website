import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';

const { Column } = Table;
const page_size = 10;
const allApplication = props => {
  const [appList, setAppList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const appStatus = {
    0: '未知',
    1: '待处理',
    2: '同意',
    3: '拒绝',
    4: '取消',
  };
  const {
    location: { query },
  } = props;
  useEffect(() => {
    //请求我的待审批的tokenInfo
    axios({
      method: 'get',
      url: '/api/v1/application',
      params: {
        page: currentPage,
        page_size,
      },
    })
      .then(response => {
        if (response.status === 200) {
          setAppList(response.data.application_list);
          setTotal(response.data.total);
        } else throw Error('error status:', response.status);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  function handleChangePage(page) {
    setCurrentPage(page);
  }
  return (
    <>
      <Table
        className={style1.applicationList}
        dataSource={appList}
        pagination={{
          pageSize: 10,
          current: currentPage,
          onChange: handleChangePage,
          total: total,
        }}
      >
        <Column title="召集令id" key="callup_id" dataIndex="callup_id" />
        <Column
          title="请求者id"
          key="callee_id"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/userInfo/${record.callee_id}`}>
                {record.callee_id}
              </Link>
            </Space>
          )}
        />
        <Column title="请求描述" dataIndex="desc" key="desc" />
        <Column
          title="请求状态"
          key="status"
          render={(text, record) => <span>{appStatus[record.status]}</span>}
        />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/tokenInfo/${record.callup_id}`}>查看</Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default allApplication;
