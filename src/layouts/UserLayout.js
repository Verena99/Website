import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'umi';
import { Layout } from 'antd';
import React from 'react';
import logo from '../assets/ZJL.png';
import styles from './index.less';

const UserLayout = props => {
  const { children } = props;
  return (
    <HelmetProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>召集令系统</span>
              </Link>
            </div>
            <div className={styles.desc}>Web开发技术实践作业</div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default UserLayout;
