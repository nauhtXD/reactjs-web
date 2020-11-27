import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  Button,
  Form,
  Upload,
  Modal,
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import ReactQuill from 'react-quill';
import MyBox from '../../../components/MyBox/index';
import 'react-quill/dist/quill.snow.css';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

const Mrq = styled(ReactQuill)`
  .ql-container {
    height: 90% !important;
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function Post() {
  // #region useState
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewTitle, setPreviewTitle] = useState(null);
  // #endregion
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  return (
    <div>
      <Helmet>
        <title>Posts</title>
        <meta name="description" content="Description of posts" />
      </Helmet>
      <div>
        <p
          style={{
            fontSize: '30px',
            margin: '10px 10px 0 10px',
            textAlign: 'center',
          }}
        >
          Post
        </p>
        <Row>
          <Col span={16}>
            <div style={MyBox}>
              <Row>
                <Col span={2}>
                  <h4 style={{ margin: '5px' }}>Title</h4>
                </Col>
                <Col span={22}>
                  <Input placeholder="Title" />
                </Col>
              </Row>
            </div>
            <div style={MyBox}>
              <Mrq
                theme="snow"
                modules={Post.modules}
                formats={Post.formats}
                bounds=".app"
                style={{ height: '400px' }}
              />
            </div>
          </Col>
          <Col span={8}>
            <div style={MyBox}>
              <Form {...layout} name="basic">
                <Form.Item label="Ảnh hiển thị" name="image">
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
                <Form.Item label="Danh mục" name="category">
                  <Select id="select" defaultValue="lucy">
                    <Option value="lucy">Lucy</Option>
                    <Option value="jack">Jack</Option>
                    <Option value="windy">Windy</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Nguồn" name="source">
                  <Input id="source" placeholder="Source" />
                </Form.Item>
                <Form.Item label="Ngày viết" name="datepicker">
                  <DatePicker
                    id="daypicker"
                    defaultValue={moment(moment().date, dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary">Đăng</Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

Post.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

Post.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

Post.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = () => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Post);
