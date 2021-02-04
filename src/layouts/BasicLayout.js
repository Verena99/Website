import styles from './index.less';
import { Layout, Menu, Input, message } from 'antd';
import { connect } from 'umi';
import { useRef } from 'react';
const { Header, Content } = Layout;
const { Search } = Input;

const BasicLayout = props => {
  const {
    dispatch,
    children,
    home: {
      search: { type },
    },
  } = props;

  const searchInput = useRef();

  const saveSearchType = ({ key }) => {
    searchInput.current.state.value = '';
    searchInput.current.focus();
    dispatch({
      type: 'home/saveSearchType',
      payload: Number(key),
    });
  };

  const search = value => {
    if (!value) return;
    dispatch({
      type: 'home/query',
      payload: {
        type: type,
        content: value,
      },
    }).then(res => {
      if (res) {
        const { status, data } = res;
        if (!(status == 200 && data.message == 'success')) {
          message.error('server error', 2);
        }
      }
    });
  };

  return (
    <Layout className={styles.layoutHeader}>
      <Header className={styles.basicLayoutHeader} theme="light">
        <div className={styles.searchCombo}>
          <Menu
            mode="horizontal"
            className={styles.searchHead}
            onSelect={saveSearchType}
            defaultSelectedKeys={[String(type)]}
          >
            <Menu.Item
              key={'0'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              关键词
            </Menu.Item>
            <Menu.Item
              key={'1'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              主题图谱
            </Menu.Item>
            <Menu.Item
              key={'2'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              知识图谱
            </Menu.Item>
            <Menu.Item
              key={'3'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              作者
            </Menu.Item>
            <Menu.Item
              key={'4'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              单位
            </Menu.Item>
            <Menu.Item
              key={'5'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              作者机构
            </Menu.Item>
            <Menu.Item
              key={'6'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              主题作者
            </Menu.Item>
          </Menu>

          <Search
            placeholder="请输入"
            enterButton="搜索"
            size="middle"
            onSearch={search}
            className={styles.search}
            bordered={false}
            ref={searchInput}
          />
        </div>
      </Header>
      <Content style={{ padding: '20px 30px' }}>
        <div style={{ background: '#fff', height: '100%' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default connect(({ home }) => ({ home }))(BasicLayout);
