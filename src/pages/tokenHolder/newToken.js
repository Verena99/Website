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

const { TextArea } = Input;

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
      ])
      .then(() => {
        const params = {};
        params.caller_id = caller_id;
        params.desc = form.getFieldValue('tokenDes');
        params.end_time = form.getFieldValue('deadline');
        params.name = form.getFieldValue('tokenName');
        params.quota = form.getFieldValue('tokenNum');
        params.type = form.getFieldValue('tokenType');
        dispatch({
          type: 'token/createToken',
          payload: { caller_id },
        }).then(res => {
          if (res && res.code === 0) {
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
              <Select defaultValue="技术交流">
                <Select.Option value="技术交流">技术交流</Select.Option>
                <Select.Option value="学业讨论">学业讨论</Select.Option>
                <Select.Option value="社会实践">社会实践</Select.Option>
                <Select.Option value="公益志愿者">公益志愿者</Select.Option>
                <Select.Option value="游玩">游玩</Select.Option>
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
  caller_id: user.currentUser.caller_id,
}))(NewToken);
