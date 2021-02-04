import styles from './index.less';
import { Layout, Menu, Input, Space } from 'antd';
import { Link } from 'umi';
import RightContent from '@/components/GlobalHEader/RightContent';
const { Header, Content, Footer } = Layout;
const { Search } = Input;
const menuData = [
  { route: '/system', name: '推荐' },
  { route: '/system', name: '知识图谱' },
  { route: '/system', name: '主题图谱' },
  { route: '/system', name: '在线分析' },
  { route: '/system', name: '排行榜' },
  { route: '/system', name: '造句分析' },
  { route: '/system', name: '智能问答' },
  { route: '/system', name: '我的收藏' },
  { route: '/system', name: '我的评论' },
  { route: '/system', name: '词汇管理' },
];
const msgNum = 0;

const BasicLayout = props => {
  const {
    location: { pathname, query },
    children,
  } = props;

  return (
    <Layout className={styles.layoutHeader}>
      <Header className={styles.basicLayoutHeader} theme="light">
        <div>
          <Menu 
            mode="horizontal"
            className={styles.searchHead}
          >
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>关键词</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>主题图谱</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>知识图谱</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>作者</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>单位</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>作者机构</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>主题作者</Menu.Item>
            <Menu.Item style={{margin: '0 5px', lineHeight: '30px'}}>全景图谱</Menu.Item>
          </Menu>
          <Space>
          <div className={styles.search}>
            <Search
              placeholder="请输入"
              allowClear
              enterButton="搜索"
              size="middle"
            />
          </div>
          <a>高级搜索</a>
          </Space>
          <Space align='center'style={{position: 'fixed', right: '30px'}}>
            <span>消息({msgNum})</span>
            <span>帮助</span>
          </Space>
          
        </div>
        {/* <RightContent style={{ float: 'right' }} /> */}
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '36px', width: '100%' }}
        >
          {menuData.map(menu => (
            <Menu.Item key={`${menu.route}`}>
                {menu.name}
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '20px 30px' }}>
        <div style={{ background: '#fff', height: '100%' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default BasicLayout;
