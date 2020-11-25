import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Table, Space } from 'antd';
import styles from '@/css/searchToken.css';

const { Search } = Input;
const { Option } = Select;
const { Column } = Table;

const allToken = props => {
  const [tokenList, setTokenList] = useState();
  const [searchClass, setSearchClass] = useState();
  const [searchName, setSearchName] = useState();

  useEffect(() => {
    let temp = new Array(14).fill({
      name: '国图志愿',
      class: '公益志愿者',
      tokenId: '123',
      people: 10,
      owner: 'cyn',
      startTime: '2020/9/1',
      endTime: '2020/10/1',
      state: '待处理',
    });
    setTokenList(temp);
  }, []);

  const searchByName = value => {
    setSearchName(value);
    setSearchClass(null);
    let temp = new Array(14).fill({
      name: `${value}`,
      class: '公益志愿者',
      tokenId: '123',
      people: 10,
      owner: 'cyn',
      startTime: '2020/9/1',
      endTime: '2020/10/1',
      state: '待处理',
    });
    setTokenList(temp);
  };

  function searchByClass(value) {
    setSearchClass(value);
    setSearchName(null);
    let temp = new Array(14).fill({
      name: '国图志愿',
      class: `${value}`,
      tokenId: '123',
      people: 10,
      owner: 'cyn',
      startTime: '2020/9/1',
      endTime: '2020/10/1',
      state: '待处理',
    });

    setTokenList(temp);
  }
  function handleChange(e) {
    setSearchName(e.target.value);
  }
  return (
    <>
      <Search
        className={styles.search}
        placeholder="input search text"
        onSearch={searchByName}
        enterButton
        value={searchName}
        onChange={handleChange}
      />
      <Select
        className={styles.search}
        placeholder="please select"
        onChange={searchByClass}
        value={searchClass}
      >
        <Option value="技术交流">技术交流</Option>
        <Option value="学业探讨">学业探讨</Option>
        <Option value="社会实践">社会实践</Option>
        <Option value="公益志愿者">公益志愿者</Option>
        <Option value="游玩">游玩</Option>
      </Select>
      <Table
        className={styles.showList}
        dataSource={tokenList}
        pagination={{ pageSize: 12 }}
      >
        <Column title="名称" dataIndex="name" key="name" />
        <Column title="类别" dataIndex="class" key="class" />
        <Column title="人数" dataIndex="people" key="people" />
        <Column
          title="令主"
          key="owner"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/userInfo/${record.owner}`}>{record.owner}</Link>
            </Space>
          )}
        />
        <Column title="创建时间" dataIndex="startTime" key="startTime" />
        <Column title="结束时间" dataIndex="endTime" key="endTime" />
        <Column title="状态" dataIndex="state" key="state" />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/admin/tokenInfo/${record.tokenId}`}>查看</Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default allToken;
