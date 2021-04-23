import styles from './index.less';
import { Layout, Menu, Input, Select, Space, Button } from 'antd';
import { connect } from 'umi';
import { useEffect, useState } from 'react';
const { Header, Content } = Layout;
const { Option } = Select;
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
  const { dispatch, children, searchType, content } = props;
  const [searchValue, setSearchValue] = useState();
  const [options, setOption] = useState();

  const saveSearchType = ({ key }) => {
    dispatch({
      type: 'home/saveSearchType',
      payload: { currentType: Number(key) },
    })
  };

  useEffect(() => {
    search(content);
  }, [searchType]);

  // useEffect(()=>{
  //   searchInput.current.state.value = content;
  // },[content])

  const clickSearch = () => {
    dispatch({
      type: 'home/saveSearchContent',
      payload: { content: searchValue },
    })
    search();
  }

  const search = () => {
    dispatch({
      type: 'home/query',
      payload: { content: searchValue },
    }).then(res => {
      if (res) {
        const { status, data } = res;
        if (!(status == 200 && data.message == 'success')) {
          // message.error(data.message, 2);
        }
      }
    });
  };

  const handleSearch = value => {
    if (value) {
      // fetch(value, data => setData(data));
      dispatch({
        type: 'home/getSearchOption',
        payload: value,
      }).then(res =>{
          setOption(res.data);
        }
      )
    } 
    else {
      setOption();
    }
  };

  const handleChange = value => {
    setSearchValue(value);
  };

  return (
    <Layout className={styles.layoutHeader}>
      <Header className={styles.basicLayoutHeader} theme="light">
        <div>
          <Menu
            mode="horizontal"
            className={styles.searchHead}
            onSelect={saveSearchType}
            selectedKeys={[String(searchType)]}
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
            <div>
              <Select
                style={{width: '520px', top: '-10px', marginLeft: '200px', marginRight: '10px'}}
                showSearch
                value={searchValue}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
              >
                {options && options.map(item => (<Option key={item.value}>{item.text}</Option>))}
              </Select>
              <Button type='primary' style={{float: 'right'}} onClick={clickSearch}>搜索</Button>
            </div>
          </Space>
          {/* <Space align="center" style={{ position: 'fixed', right: '30px' }}>
            <span>消息({msgNum})</span>
            <span>帮助</span>
          </Space> */}
        </div>
      </Header>
      <Content style={{ padding: '20px 30px' }}>
        <div style={{ background: '#fff', height: '100%' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default connect(({ home }) => ({ 
  home,
  searchType: home.search.searchType,
  content: home.search.content,
 }))(BasicLayout);
