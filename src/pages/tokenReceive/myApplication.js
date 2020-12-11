import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';

const { Column } = Table;
const page_size = 10;
const myApplication = props => {
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
      })*/
    let temp = new Array(12).fill({
      callup_id: 12,
      id: 1,
      desc: '我立志做一名公益志愿者，balabalabbbbbbbbbbbbbbbbb',
      status: 0,
    });
    setAppList(temp);
  }, []);
  async function confirm(id) {
    console.log(id);
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
        <Column
          title="召集令id"
          key="callup_id"
          render={(text, record) => (
            <Link to={`/system/tokenReceive/showToken/${record.callup_id}`}>
              {record.callup_id}
            </Link>
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
              <Link
                to={`/system/tokenReceive/changeApplication/?application_id=${record.id}&callup_id=${record.callup_id}`}
              >
                修改申请
              </Link>
              <Popconfirm
                title="你确定要删除该接令申请吗?"
                onConfirm={confirm.bind(this, record.id)}
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
