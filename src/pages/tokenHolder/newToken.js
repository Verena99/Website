import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Row,
  Col,
  message,
  DatePicker,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { provinceData } from '@/utils/utils';

const { TextArea } = Input;
const { Option } = Select;

const NewToken = props => {
  const {
    createToken,
    setCreateToken,
    refresh,
    setRefresh,
    dispatch,
    caller_id,
  } = props;
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState();
  const [picture, setPicture] = useState();

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handlePreview = file => {
    if (!file.url && !file.preview) {
      file.preview = getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
  };

  const upLoadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      console.log('正在上传');
    }
    if (info.file.status === 'done') {
      setPicture(info.file);
      console.log('上传成功');
    }
  };

  const createCallup = () => {
    form
      .validateFields([
        'tokenName',
        'tokenType',
        'tokenDes',
        'tokenNum',
        'tokenPicture',
        'deadline',
        'city',
      ])
      .then(() => {
        const params = {};
        params.caller_id = caller_id;
        params.desc = form.getFieldValue('tokenDes');
        const time = new Date(form.getFieldValue('deadline'));
        params.end_time = parseInt(time.getTime() / 1000);
        params.name = form.getFieldValue('tokenName');
        params.quota = form.getFieldValue('tokenNum');
        params.type = form.getFieldValue('tokenType');
        params.type = Number(form.getFieldValue('city'));
        dispatch({
          type: 'token/createToken',
          payload: params,
        }).then(res => {
          if ('callup_id' in res) {
            setRefresh(!refresh);
            setCreateToken(false);
          } else {
            message.error('召集令创建失败');
          }
        });
      });
  };

  return (
    <Modal
      centered
      visible={createToken}
      title="新建召集令"
      width="600px"
      maskClosable={false}
      cancelText="取消"
      okText="确认"
      onOk={() => createCallup()}
      onCancel={() => setCreateToken(false)}
    >
      <Form form={form}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="召集令名称"
              name="tokenName"
              rules={[{ required: true, message: '请输入召集令名称称' }]}
            >
              <Input placeholder="请输入召集令名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="召集令类别"
              name="tokenType"
              rules={[{ required: true, message: '请选择召集令类别' }]}
            >
              <Select>
                <Select.Option value={1}>技术交流</Select.Option>
                <Select.Option value={2}>学业讨论</Select.Option>
                <Select.Option value={3}>社会实践</Select.Option>
                <Select.Option value={4}>公益志愿者</Select.Option>
                <Select.Option value={5}>游玩</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="召集令描述"
          name="tokenDes"
          rules={[{ required: true, message: '请输入描述信息' }]}
        >
          <TextArea rows={5} placeholder="描述信息" />
        </Form.Item>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="召集的人数"
              name="tokenNum"
              rules={[{ required: true, message: '请输入召集人数' }]}
            >
              <InputNumber placeholder="请输入召集人数" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="截止日期"
              name="deadline"
              rules={[{ required: true, message: '请输入截止日期' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="召集的城市"
          name="city"
          rules={[{ required: true, message: '请输入截止日期' }]}
        >
          <Select>
            {Object.keys(provinceData).map(province => (
              <Option key={province} value={province}>
                {provinceData[province]}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="召集令介绍照片" name="tokenPicture">
          <div style={{ border: '1px' }}>
            <Upload
              listType="picture-card"
              onPreview={file => handlePreview(file)}
              onChange={info => handleChange(info)}
              onRemove={() => {
                setPicture(undefined);
              }}
            >
              {picture ? null : upLoadButton}
            </Upload>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ token, user }) => ({
  token,
  caller_id: user.currentUser.user_id,
}))(NewToken);
