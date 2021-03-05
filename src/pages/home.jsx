import React, { Component } from 'react';
import { connect } from 'umi';
import ReactEcharts from 'echarts-for-react';
import { List, Space, Typography } from 'antd';

class Home extends Component {
  render() {
    const { type } = this.props.home.search;
    const { option, list } = this.props.home;

    switch (type) {
      case 0:
        return (
          <List
            itemLayout="vertical"
            size="large"
            pagination={
              list.current.length
                ? {
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 10,
                    total: list.total,
                    showSizeChanger: false,
                  }
                : false
            }
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
        );

      case 1:
        return (
          <ReactEcharts
            option={option}
            style={{ height: '100%', overflow: 'scroll' }}
          />
        );

      default:
        return <h1>待定</h1>;
    }
  }
}

export default connect(({ home }) => ({ home }))(Home);
