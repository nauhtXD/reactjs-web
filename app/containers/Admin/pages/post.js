/* eslint-disable no-param-reassign */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, DatePicker, Select, Input, Image, Form } from 'antd';
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

import AdminTable from '../../../components/AdminTable/index';
import MyUpload from '../../../components/MyUpload/index';
import { MyBox, layout, ContentDiv } from '../../../components/Style/index';

const dateFormat = 'L';
const { Option } = Select;

const MyContentDiv = styled(ContentDiv)`
  -webkit-line-clamp: 4;
  max-width: 300px;
  max-height: 100px;
`;
const Mrq = styled(ReactQuill)`
  .ql-container {
    height: 90% !important;
    cursor: auto !important;
  }
`;

let k = -1;

const init = {
  content: '',
  subcategoryId: 1,
  publishAt: moment(),
  img: [],
  author:
    localStorage.getItem('usr') &&
    JSON.parse(localStorage.getItem('usr')).username,
};

export function Post(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(false);
  const [defValue, setDefValue] = useState(init);

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

  useEffect(() => {
    setDefValue({ ...defValue, img: props.adminReducer.url });
  }, [props.adminReducer.url]);

  const setNullPreview = () => {
    setDefValue({ ...defValue, img: null });
  };

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

  const handleCreate = record => {
    props.createPost(record);
    setIsRerender(!isRerender);
    return 0;
  };

  const handleClick = (record, key) => {
    if (key === 0) {
      props.updatePost(record);
    } else props.deletePost(record);
    setIsRerender(!isRerender);
  };

  const handleSearch = (entry, currValue) =>
    entry.title.toLowerCase().includes(currValue) ||
    entry.content.toLowerCase().includes(currValue) ||
    entry.subcategory.name.toLowerCase().includes(currValue) ||
    entry.view.toString().includes(currValue);

  const myModal = [
    <div>
      <Row>
        <Col span={16}>
          <MyBox>
            <Form.Item
              {...layout}
              name="title"
              label="Tiêu đề"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tiêu đề!',
                },
              ]}
            >
              <Input placeholder="Tiêu đề" />
            </Form.Item>
          </MyBox>
          <MyBox>
            <Form.Item
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nội dung!',
                },
              ]}
            >
              <Mrq
                theme="snow"
                modules={Post.modules}
                formats={Post.formats}
                style={{ height: '300px', width: '600px' }}
              />
            </Form.Item>
          </MyBox>
        </Col>
        <Col span={8}>
          <MyBox>
            <Form.Item
              label="Ảnh hiển thị"
              name="img"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng upload ảnh!',
                },
              ]}
            >
              <MyUpload mUpload={props.uploadImg} mSetNull={setNullPreview} />
            </Form.Item>
            <Form.Item label="Danh mục" name="subcategoryId">
              <Select>
                {mSC &&
                  mSC.length > 0 &&
                  mSC.map(
                    i =>
                      i.key.includes('list/') && (
                        <Option value={i.id} key={i.name}>
                          {i.name}
                        </Option>
                      ),
                  )}
              </Select>
            </Form.Item>
            <Form.Item label="Ngày đăng" name="publishAt">
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item label="Nguồn" name="source">
              <Input />
            </Form.Item>
            <Form.Item label="Tác giả" name="author">
              <Input readOnly />
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
        mData={props.adminReducer.posts}
        mPropertyNames={propertyNames}
        mDelete={handleClick}
        mUpdate={handleClick}
        mTableModal={myModal}
        mInitialValues={defValue}
        mSearch={handleSearch}
        mWidth={1000}
        mCheckImg
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
    ['link', 'image', 'video'],
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
  'video',
];

Post.propTypes = {
  adminReducer: PropTypes.any,
  createPost: PropTypes.func,
  getPosts: PropTypes.func,
  updatePost: PropTypes.func,
  deletePost: PropTypes.func,
  getSubCategories: PropTypes.func,
  uploadImg: PropTypes.func,
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
  uploadImg: data => {
    dispatch(action.uploadImg(data));
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
