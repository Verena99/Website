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
                  <span>{item.author}</span>
                  <span>{item.journal}</span>
                </Space>
              </div>

              <div>
                <Space>
                  <span>来源:</span>
                  <a href={item.origin}>{item.origin}</a>
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
