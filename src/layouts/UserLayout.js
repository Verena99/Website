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
<<<<<<< HEAD
            <div className={styles.header}></div>
=======
            <div className={styles.header}>
            </div>
>>>>>>> d28bb557a4cba2b74c3eab5c12983b4b897d17ee
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default UserLayout;
