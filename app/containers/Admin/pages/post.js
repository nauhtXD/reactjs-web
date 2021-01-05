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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';
import { MyBox } from '../../../components/Style/index';
import AdminTable from '../../../components/AdminTable/index';
import MyEditor from '../../../components/MyEditor/index';
import MyUpload from '../../../components/MyUpload/index';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const MyContentDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  max-height: 100px;
`;
let k = -1;
const init = { content: '', subcategoryId: 1, publishAt: moment(), img: [] };

export function Post(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(null);
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

  const handleEditor = value => {
    setDefValue({ ...defValue, content: value });
  };

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
    return 0;
  };

  const handleClick = (record, key) => {
    if (key === 0) {
      const realValue = { ...record, content: defValue.content };
      props.updatePost(realValue);
    } else props.deletePost(record);
    setIsRerender(!isRerender);
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
              <MyEditor mHeight="300px" mWidth="600px" mChange={handleEditor} />
            </Form.Item>
          </MyBox>
        </Col>
        <Col span={8}>
          <MyBox>
            <Form.Item label="Ảnh hiển thị" name="img">
              <MyUpload mUpload={props.uploadImg} mSetNull={setNullPreview} />
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
        mData={props.adminReducer.posts}
        mPropertyNames={propertyNames}
        mDelete={handleClick}
        mUpdate={handleClick}
        mTableModal={myModal}
        mInitialValues={defValue}
        mWidth={1000}
      />
    </div>
  );
}

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
