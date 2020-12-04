import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import 'react-quill/dist/quill.snow.css';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';
import MyBox from '../../../components/MyBox/index';

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

export function Post(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  useEffect(() => {
    props.getSubCategories();
  }, []);

  // #region useState
  const [form] = Form.useForm();
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

  const mSC = props.adminReducer.subCategories;

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

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const { url } = fileList[0];
      values.img = url;
      values.publishAt = values.publishAt.format();
      props.createPost(values);
    });
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
          Bài viết mới
        </p>
        <Form
          form={form}
          name="basic"
          initialValues={{
            content: '',
            subcategoryId: 1,
            publishAt: moment(moment().date, dateFormat),
          }}
        >
          <Row>
            <Col span={16}>
              <MyBox>
                <Form.Item name="title" label="Title">
                  <Input placeholder="Title" />
                </Form.Item>
              </MyBox>
              <MyBox>
                <Form.Item name="content">
                  <Mrq
                    theme="snow"
                    modules={Post.modules}
                    formats={Post.formats}
                    bounds=".app"
                    style={{ height: '400px' }}
                  />
                </Form.Item>
              </MyBox>
            </Col>
            <Col span={8}>
              <MyBox>
                <Form.Item {...layout} label="Ảnh hiển thị">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
                <Form.Item {...layout} label="Danh mục" name="subcategoryId">
                  <Select>
                    {mSC &&
                      mSC.length > 0 &&
                      mSC.map(i => (
                        <Option value={i.id} key={i.name}>
                          {i.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item {...layout} label="Nguồn" name="source">
                  <Input placeholder="Source" />
                </Form.Item>
                <Form.Item {...layout} label="Ngày viết" name="publishAt">
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" onClick={handleSubmit}>
                    Đăng
                  </Button>
                </Form.Item>
              </MyBox>
            </Col>
          </Row>
        </Form>
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

Post.propTypes = {
  adminReducer: PropTypes.any,
  createPost: PropTypes.func,
  getSubCategories: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  createPost: data => {
    dispatch(action.createPost(data));
  },
  getSubCategories: data => {
    dispatch(action.getSubCategories(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Post);
