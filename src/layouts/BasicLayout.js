import styles from './index.less';
import { Layout, Menu, Input, message, Space } from 'antd';
import { connect } from 'umi';
import { useRef } from 'react';
const { Header, Content } = Layout;
const { Search } = Input;
const menuData = [
  { key: '0', name: '推荐' },
  { key: '1', name: '知识图谱' },
  { key: '2', name: '主题图谱' },
  { key: '3', name: '在线分析' },
  { key: '4', name: '排行榜' },
  { key: '5', name: '造句分析' },
  { key: '6', name: '智能问答' },
  { key: '7', name: '我的收藏' },
  { key: '8', name: '我的评论' },
  { key: '9', name: '词汇管理' },
];
const msgNum = 0;

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
    dispatch({
      type: 'home/saveSearchType',
      payload: { currentType: Number(key) },
    }).then(res => {
      search(Number(key), searchInput.current.state.value);
    });
  };

  const clickSearch = value => {
    search(type, value);
  }

  const search = (currentType, value) => {
    if (!value) return;
    dispatch({
      type: 'home/query',
      payload: {
        type: currentType,
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
        <div>
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
            <Menu.Item
              key={'7'}
              style={{ margin: '0 5px', lineHeight: '30px' }}
            >
              全景图谱
            </Menu.Item>
          </Menu>
          <Space>
            <div className={styles.search}>
              <Search
                placeholder="请输入"
                allowClear
                enterButton="搜索"
                size="middle"
                onSearch={clickSearch}
                ref={searchInput}
              />
            </div>
            {/* <a>高级搜索</a> */}
          </Space>
          <Space align="center" style={{ position: 'fixed', right: '30px' }}>
            {/* <span>消息({msgNum})</span> */}
            <span>帮助</span>
          </Space>
        </div>
        {/* <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: '36px', width: '100%' }}
        >
          {menuData.map(menu => (
            <Menu.Item key={`${menu.key}`}>{menu.name}</Menu.Item>
          ))}
        </Menu> */}
      </Header>
      <Content style={{ padding: '20px 30px' }}>
        <div style={{ background: '#fff', height: '100%' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default connect(({ home }) => ({ home }))(BasicLayout);
