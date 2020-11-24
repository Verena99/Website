import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;
const TokenReceive = props => {
  const { children, history } = props;
  return (
    <Layout style={{ height: '81vh' }}>
      <Sider style={{ height: '81vh', width: '160px' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%' }}
        >
          <Menu.Item
            icon={<UserOutlined />}
            key="1"
            onClick={() => {
              history.push('/system/tokenReceive/searchToken');
            }}
          >
            请求接令
          </Menu.Item>
          <Menu.Item
            icon={<LaptopOutlined />}
            key="2"
            onClick={() => {
              history.push('/system/tokenReceive/myApplication');
            }}
          >
            待批准的申请
          </Menu.Item>
          <Menu.Item
            icon={<NotificationOutlined />}
            key="3"
            onClick={() => {
              history.push('/system/tokenReceive/myToken');
            }}
          >
            已批准的申请
          </Menu.Item>
          <Menu.Item
            icon={<NotificationOutlined />}
            key="4"
            onClick={() => {
              history.push('/system/tokenReceive/rejectedToken');
            }}
          >
            被拒绝的申请
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ backgroundColor: '#ffffff' }}>{children}</Content>
    </Layout>
  );
};

export default TokenReceive;
