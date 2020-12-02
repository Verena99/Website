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
  const {
    location: { query },
  } = props;
  useEffect(() => {
    /*请求我的待审批的tokenInfo
    axios({
      method: 'get',
      url: '/api/v1/application',
      params: {
        page: currentPage,
        page_size
      }
    })
      .then((response) => {
        if(response.status===200){
            setAppList(response.data.application_list);
            setTotal(response.data.total)
        }
        else
          throw Error('error status:',response.status);
      })
      .catch((error) => {
        console.log(error)
      })*/
    let temp = new Array(12).fill({
      callup_id: 12,
      callee_id: 17,
      id: 1,
      desc: '我立志做一名公益志愿者，balabalabbbbbbbbbbbbbbbbb',
      status: 0,
    });
    setAppList(temp);
  }, []);
  async function confirm(id) {
    /*await axios({
      method: 'delete',
      url: '/api/v1/application',
      data: {
        application_id:id
      }
    })
      .then((response) => {
        if(response.status===200)
          message.success('已删除该请求' + id);
      })
      .catch((error) => {
        console.log(error)
      });
    await axios({
      method: 'get',
      url: '/api/v1/application',
      params: {
        page: currentPage,
        page_size,
        callee_id:query.userId,
        status:0
      }
    })
      .then((response) => {
        if(response.status===200){
            setAppList(response.data.application_list);
            setTotal(response.data.total)
        }
        else
          throw Error('error status:',response.status);
      })
      .catch((error) => {
        console.log(error)
      });*/
  }
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
          render={(text, record) => <span>{'待批准'}</span>}
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
