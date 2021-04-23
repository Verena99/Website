import React, { useEffect } from 'react';
import { connect } from 'umi';
import ReactEcharts from 'echarts-for-react';
import { List, Space } from 'antd';

const Home = props => {
  const { dispatch, searchType, option, list } = props;

  const onChartClick = (e) =>{ 
    console.log(e.name);
    dispatch({
      type: 'home/saveSearchContent',
      payload: { content: e.name },
    }).then(()=>{
      dispatch({
        type: 'home/saveSearchType',
        payload: { currentType: Number(0) },
      })
    })
  }

  let onEvents = {
    'click': onChartClick,
  }

  const handleLink = (url) => {
    const w=window.open('about:blank');
    w.location.href=url;
  }

  return (
    <>
    {
      searchType === 0 && 
        <List
          itemLayout="vertical"
          size="large"
          dataSource={list.current}
          renderItem={item => (
            <List.Item key={item.title}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <div>
                <Space>
                  <span>{item.keywords}</span>
                 {/* <span>{item.journal}</span> */}
                </Space>
              </div>

              <div>
                <Space>
                  <span>来源:</span>
                  <a href={item.origin} target="_Blank">{item.origin}</a>
                  {/* <a href="http://127.0.0.1:8080/神舟七号--科技--人民网.html" target="_Blank">tett</a> */}
                  {/* <a href="http://127.0.0.1:8000/static/AC-130J Ghostrider   U S  Air Force   Fact Sheet Display.html" target="_Blank">test</a> */}
                  {/* <a href="http://127.0.0.1:8000/static/神舟五号飞船_360百科.html"target="_Blank">test2</a> */}
                  {/* <a href="http://127.0.0.1:8000/static/神舟五号_百度百科.html"target="_Blank">test23</a> */}
                  {/* <a href="http://scitech.people.com.cn/GB/25509/28166/index.html">test</a> */}
                  {/* <a href={item.origin}>链接</a> */}
                  {/* <a href = "https://www.baidu.com/">test</a> */}
                </Space>
              </div>
            </List.Item>
          )}
        />
    }
    {
      searchType === 1 &&  
      <ReactEcharts
        option={option}
        style={{ height: '100%', overflow: 'scroll' }}
        onEvents={onEvents}
      />
    }
    {
      searchType !== 0 && searchType !==1 && <h1>待定</h1>
    }
    </>
  )
}

export default connect(({ home }) => ({ 
  home,
  searchType:  home.search.searchType,
  option: home.option,
  list: home.list,
}))(Home);
