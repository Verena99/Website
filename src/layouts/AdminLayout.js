import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';
import RightContent from '@/components/GlobalHEader/RightContent';
const { Header, Content, Footer } = Layout;
const menuData = [
  { route: '/admin/allUser', name: '当前用户' },
  { route: '/admin/allToken', name: '召集令' },
  { route: '/admin/allApplication', name: '接令请求' },
  { route: '/admin/incomeInfo', name: '收益信息' },
];
const BasicLayout = props => {
  const {
    location: { pathname, query },
    children,
  } = props;

  return (
    <Layout style={{ background: '#fff' }}>
      <Header>
        <div className={styles.logo2}>召集令</div>
        <RightContent style={{ float: 'right' }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: '64px' }}
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
      <Content style={{ padding: '5px 10px' }}>
        <div style={{ background: '#fff', height: '100%' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default BasicLayout;
