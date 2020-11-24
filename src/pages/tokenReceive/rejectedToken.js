import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import styles from '@/css/applicationList.css';

const { Search } = Input;
const { Option } = Select;
const { Column } = Table;

const onSearch = value => console.log(value);

function handleChange(value) {
  console.log(`selected ${value}`);
}
function confirm(e) {
  message.success('已删除该请求' + e);
}

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    tokenId: '1',
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    tokenId: '2',
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    tokenId: '3',
  },
];

const rejectedToken = props => {
  return (
    <>
      <Table className={styles.applicationList} dataSource={data}>
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="类别" dataIndex="class" key="class" />
        <Column title="结束时间" dataIndex="endTime" key="endTime" />
        <Column title="状态" dataIndex="state" key="state" />
        <Column title="请求描述" dataIndex="application" key="application" />
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
