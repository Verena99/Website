import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';
import RightContent from '@/components/GlobalHEader/RightContent';
const { Header, Content, Footer } = Layout;
const menuData = [
  { route: '/system/tokenHolder', name: '我是令主' },
  { route: '/system/tokenReceive', name: '我要接令' },
];
const BasicLayout = props => {
  const {
    location: { pathname, query },
    children,
  } = props;

  return (
    <Layout className={styles.layoutHeader}>
      <Header>
        <div className={styles.logo2}>召集令</div>
        <RightContent style={{ float: 'right' }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '48px' }}
        >
          {menuData.map(menu => (
            <Menu.Item key={`${menu.route}`}>
              <Link to={menu.route + `?userId=${query.userId}`}>
                {menu.name}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '20px 30px' }}>
        <div style={{ background: '#fff', height: '100%' }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by LYF、XF、CYN</Footer>
    </Layout>
  );
};

export default BasicLayout;
