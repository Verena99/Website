import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space, Popconfirm, message } from 'antd';
import styles from '@/css/searchToken.css';

const { Search } = Input;
const { Option } = Select;
const { Column } = Table;

const onSearch = value => console.log(value);

function handleChange(value) {
  console.log(`selected ${value}`);
}
function confirm(e) {
  message.success('恭喜，已成功接令' + e);
}

function cancel(e) {
  message.error('您已放弃接令');
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

const searchToken = props => {
  return (
    <>
      <Search
        className={styles.search}
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
      <Select
        className={styles.search}
        placeholder="please select"
        onChange={handleChange}
      >
        <Option value="技术交流">技术交流</Option>
        <Option value="学业探讨">学业探讨</Option>
        <Option value="社会实践">社会实践</Option>
        <Option value="公益志愿者">公益志愿者</Option>
        <Option value="游玩">游玩</Option>
      </Select>
      <Table className={styles.showList} dataSource={data}>
        <Column title="名称" dataIndex="name" key="firstName" />
        <Column title="类别" dataIndex="class" key="lastName" />
        <Column title="人数" dataIndex="people" key="age" />
        <Column title="创建时间" dataIndex="startTime" key="address" />
        <Column title="结束时间" dataIndex="endTime" key="address" />
        <Column title="状态" dataIndex="state" key="state" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/system/tokenReceive/showToken/${record.tokenId}`}>
                查看
              </Link>
              <Link to={`/system/tokenReceive/applyToken/${record.tokenId}`}>
                请求接令
              </Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default searchToken;
