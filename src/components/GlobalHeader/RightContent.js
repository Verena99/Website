import { Tag } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const className = `${styles.right}  ${styles.dark}`;

  return (
    <div className={className}>
      <Avatar menu />
    </div>
  );
};

export default GlobalHeaderRight;
