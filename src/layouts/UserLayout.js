import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import styles from './index.less';

const UserLayout = props => {
  const { children } = props;
  return (
    <HelmetProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}></div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default UserLayout;
