import React, { useEffect, useState } from 'react';
import {
  Card,
  DatePicker,
  Select,
  Button,
  Table,
  Row,
  Col,
  Slider,
  Space,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
//导入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import style1 from '@/css/incomeInfo.css';
import { provinceData } from '@/global';

const { Column } = Table;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM';
const { Option } = Select;

const incomeInfo = props => {
  const [detail, setDetail] = useState();
  const [province, setProvince] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [searchClass, setSearchClass] = useState();
  const [recordList, setRecordList] = useState();
  const [monthList, setMonthList] = useState();
  const [incomeList, setIncomeList] = useState();
  const [recordNumList, setRecordNumList] = useState();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    let temp = new Array(18).fill({
      application_id: '12345',
      callee_id: 1,
      caller_id: 2,
      succeed_time: 1197919388928,
    });
    setRecordList(temp);
  }, []);

  const handleProvinceChange = value => {
    console.log(value);
    setProvince(value);
  };
  function searchByClass(value) {
    setSearchClass(value);
    console.log(value);
  }
  function getOption() {
    let option = {
      title: {
        //标题
        text: '每月中介费及成交单数变化趋势',
        x: 'center',
        textStyle: {
          //字体颜色
          color: '#ccc',
        },
      },
      tooltip: {
        //提示框组件
        trigger: 'axis',
      },
      legend: {
        data: ['月中介费', '月成交单数'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        //X轴坐标值
        type: 'category',
        data: monthList,
      },
      yAxis: {
        type: 'value', //数值轴，适用于连续数据
      },
      series: [
        {
          name: '中介费', //坐标点名称
          type: 'line', //线类型
          data: incomeList, //坐标点数据
        },
        {
          name: '成交单数', //坐标点名称
          type: 'line', //线类型
          data: recordNumList, //坐标点数据
        },
      ],
    };
    return option;
  }

  function getDetails() {
    axios({
      method: 'GET',
      url: '/api/v1/income',
      params: {
        begin_time: startTime,
        callup_type: searchClass,
        city: province,
        end_time: endTime,
      },
    })
      .then(response => {
        setFlag(true);
        setRecordList(response.data.record_list);
        let tempstart = new Date(startTime * 1000);
        let arry = [];
        while (tempstart.getTime() <= endTime * 1000) {
          arry.push(
            String(tempstart.getFullYear()) +
              '/' +
              String(tempstart.getMonth() + 1),
          );
          tempstart.setMonth(tempstart.getMonth() + 1);
        }
        setMonthList(arry);
        let income = [];
        let record_num = [];

        for (let i = 0; i < arry.length; i++) {
          if (response.data.month_map.hasOwnProperty(arry[i])) {
            income.push(response.data.month_map[arry[i]].income);
            record_num.push(response.data.month_map[arry[i]].record_num);
          } else {
            income.push(0);
            record_num.push(0);
          }
        }

        setIncomeList(income);
        setRecordNumList(record_num);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <div className={style1.container}>
      <RangePicker
        format={dateFormat}
        picker="month"
        className={style1.dateRange}
        onChange={dates => {
          setStartTime(dates[0].format('X'));
          setEndTime(dates[1].format('X'));
        }}
      />
      <Select
        className={style1.province}
        style={{ width: 120 }}
        onChange={handleProvinceChange}
      >
        {Object.keys(provinceData).map(province => (
          <Option key={province} value={province}>
            {provinceData[province]}
          </Option>
        ))}
      </Select>
      <Select
        className={style1.select}
        placeholder="please select"
        onChange={searchByClass}
        value={searchClass}
      >
        <Option value={0}>全部</Option>
        <Option value={1}>技术交流</Option>
        <Option value={2}>学业探讨</Option>
        <Option value={3}>社会实践</Option>
        <Option value={4}>公益志愿者</Option>
        <Option value={5}>游玩</Option>
      </Select>
      <Button
        className={style1.search}
        type="primary"
        shape="circle"
        icon={<SearchOutlined />}
        onClick={getDetails}
      />

      {flag && (
        <>
          <Table
            dataSource={recordList}
            pagination={{ pageSize: 12 }}
            className={style1.detail}
          >
            <Column
              title="请求标识"
              dataIndex="application_id"
              key="application_id"
            />
            <Column title="令主" dataIndex="caller_id" key="caller_id" />
            <Column title="接令用户" dataIndex="callee_id" key="callee_id" />
            <Column
              title="达成日期"
              key="succeed_time"
              render={(text, record) => (
                <Space size="middle">
                  {new Date(record.succeed_time * 1000).toLocaleString()}
                </Space>
              )}
            />
          </Table>

          <Card.Grid className={style1.echart}>
            <ReactEcharts option={getOption()} theme="ThemeStyle" />
          </Card.Grid>
        </>
      )}
    </div>
  );
};
export default incomeInfo;
