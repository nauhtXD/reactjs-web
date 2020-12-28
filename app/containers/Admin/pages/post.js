/* eslint-disable no-param-reassign */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, DatePicker, Select, Input, Image, Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
import AdminTable from '../../../components/AdminTable/index';
import MyTable from '../../../components/MyTable/index';
// import minioClient from '../../../components/MyStorage/Loadable';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const Mrq = styled(ReactQuill)`
  .ql-container {
    height: 90% !important;
  }
`;

const MyContentDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  max-height: 100px;
`;

const init = { content: '', subcategoryId: 1, publishAt: moment() };

let k = -1;

export function Post(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [form] = Form.useForm();
  // #region useState
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [isRerender, setIsRerender] = useState(null);
  // #endregion

  useEffect(() => {
    props.getSubCategories();
    props.getPosts();
  }, [isRerender]);

  useEffect(() => {
    props.getPosts();
    if (k === -1) k = 0;
  }, [isRerender]);

  useEffect(() => {
    props.getPosts();
  }, [isRerender]);

  const mSC = props.adminReducer.subCategories;

  const propertyNames = [
    {
      title: 'Tiêu đề',
      data: 'title',
      render: record => <p style={{ maxWidth: '100px' }}>{record}</p>,
    },
    {
      title: 'Nội dung',
      data: 'content',
      render: record => (
        <MyContentDiv
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: record,
          }}
        />
      ),
    },
    {
      title: 'Danh mục',
      data: ['subcategory', 'name'],
    },
    {
      title: 'Ảnh',
      data: 'img',
      render: record => <Image width="50px" src={record} />,
    },
    {
      title: 'Lượt xem',
      data: 'view',
    },
  ];

  const handleCreate = async () => {
    form.validateFields().then(values => {
      // const metaData = { 'Content-Type': 'application/octet-stream' };
      // minioClient.fPutObject('photos', 'icon.png', url, metaData);
      values.publishAt = values.publishAt.format();
      console.log(values);
      // props.createPost(values);
      return 0;
    });
  };

  const handleClick = (record, key) => {
    if (key === 0) props.updatePost(record);
    else props.deletePost(record);
    setIsRerender(!isRerender);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleChange = url => {
    setImageUrl(url);
  };

  const myModal = [
    <div>
      <Row>
        <Col span={16}>
          <MyBox>
            <Form.Item {...layout} name="title" label="Tiêu đề">
              <Input placeholder="Tiêu đề" />
            </Form.Item>
          </MyBox>
          <MyBox>
            <Form.Item name="content">
              <Mrq
                theme="snow"
                modules={Post.modules}
                formats={Post.formats}
                bounds=".app"
                style={{ height: '300px', width: '600px' }}
              />
            </Form.Item>
          </MyBox>
        </Col>
        <Col span={8}>
          <MyBox>
            <Form.Item label="Ảnh hiển thị" name="img">
              <Upload listType="picture-card" onChange={handleChange}>
                {imageUrl ? (
                  <Image src={imageUrl} width={150} />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item label="Danh mục" name="subcategoryId">
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
            <Form.Item label="Nguồn" name="source">
              <Input placeholder="Nguồn" />
            </Form.Item>
            <Form.Item label="Ngày đăng" name="publishAt">
              <DatePicker format={dateFormat} />
            </Form.Item>
          </MyBox>
        </Col>
      </Row>
    </div>,
  ];

  return (
    <div>
      <Helmet>
        <title>Posts</title>
        <meta name="description" content="Description of posts" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách bài viết"
        mCreate={handleCreate}
        mModal={myModal}
        mTable={
          <MyTable
            mData={props.adminReducer.posts}
            mPropertyNames={propertyNames}
            mUpdate={handleClick}
            mDelete={handleClick}
            mModal={myModal}
            mWidth={1000}
          />
        }
        mInitialValues={init}
        mWidth={1000}
      />
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
  getPosts: PropTypes.func,
  updatePost: PropTypes.func,
  deletePost: PropTypes.func,
  getSubCategories: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  createPost: data => {
    dispatch(action.createPost(data));
  },
  getPosts: data => {
    dispatch(action.getPosts(data));
  },
  updatePost: data => {
    dispatch(action.updatePost(data));
  },
  deletePost: data => {
    dispatch(action.deletePost(data));
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
