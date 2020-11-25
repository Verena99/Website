import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import style1 from '@/css/applicationList.css';

const { Column } = Table;

const rejectedToken = props => {
  const [tokenList, setTokenList] = useState();
  const {
    location: { query },
  } = props;
  useEffect(() => {
    //fetch请求 我已接令的tokenInfo
    //fetch请求 我已接令的token的申请info
    let temp = new Array(12).fill({
      name: '国图志愿',
      class: '公益志愿者',
      tokenId: '123',
      endTime: '2020/10/1',
      state: '待处理',
      description: 'my apply rejected',
      applicationTime: '2020/9/21',
    });
    setTokenList(temp);
  }, []);
  return (
    <>
      <Table className={style1.applicationList} dataSource={tokenList}>
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="类别" dataIndex="class" key="class" />
        <Column title="结束时间" dataIndex="endTime" key="endTime" />
        <Column title="状态" dataIndex="state" key="state" />
        <Column title="请求描述" dataIndex="description" key="description" />
        <Column
          title="请求时间"
          dataIndex="applicationTime"
          key="applicationTime"
        />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/system/tokenReceive/showToken/${record.tokenId}`}>
                查看
              </Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default rejectedToken;
