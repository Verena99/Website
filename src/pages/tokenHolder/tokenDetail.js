import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  LeftOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import TokenInfo from './tokenInfo';
import Appliers from './appliers';

const { Content, Sider } = Layout;

const TokenDetail = props => {
  const { setShowDetail, tokenName, tokenId, data } = props;
  const [menuKey, setMenuKey] = useState('1');

  return (
    <Layout>
      <Sider style={{ width: '120px' }} theme="light">
        <div style={{ marginTop: '5px' }}>
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => setShowDetail(false)}
          />
          <span className={styles.tokenName}>{tokenName}</span>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[menuKey]}
          style={{ height: '100%' }}
        >
          <Menu.Item
            icon={<FileTextOutlined />}
            key="1"
            onClick={key => {
              setMenuKey(key.key);
            }}
          >
            召集令信息
          </Menu.Item>
          <Menu.Item
            icon={<UserOutlined />}
            key="2"
            onClick={key => {
              setMenuKey(key.key);
            }}
          >
            申请者
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ backgroundColor: '#ffffff' }}>
        {menuKey === '1' && <TokenInfo tokenInfo={data} tokenId={tokenId} />}
        {menuKey === '2' && <Appliers tokenId={tokenId} />}
      </Content>
    </Layout>
  );
};

export default TokenDetail;
