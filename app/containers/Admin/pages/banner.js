/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Form, Image } from 'antd';
// import styled from 'styled-components';
// import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';
import AdminTable from '../../../components/AdminTable/index';
import MyUpload from '../../../components/MyUpload/index';

let k = -1;

export function Banner(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(null);
  const [defValue, setDefValue] = useState({ img: [] });

  useEffect(() => {
    props.getBanners();
  }, [isRerender]);

  useEffect(() => {
    props.getBanners();
    if (k === -1) k = 0;
  }, [isRerender]);

  useEffect(() => {
    props.getBanners();
  }, [isRerender]);

  useEffect(() => {
    setDefValue({ ...defValue, img: props.adminReducer.url });
  }, [props.adminReducer.url]);

  const setNullPreview = () => {
    setDefValue({ ...defValue, img: null });
  };

  const propertyNames = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'Hình ảnh',
      data: 'img',
      render: record => <Image width={400} src={record} />,
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updateBanner(record);
    setIsRerender(!isRerender);
  };

  const handleSearch = (entry, currValue) =>
    entry.id.toString().includes(currValue);

  return (
    <div>
      <Helmet>
        <title>Hình ảnh</title>
        <meta name="description" content="Description of Banner" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách banner"
        mData={props.adminReducer.banners}
        mPropertyNames={propertyNames}
        mUpdate={handleClick}
        mSearch={handleSearch}
        mTableModal={
          <div>
            <Form.Item label="Hình ảnh" name="img">
              <MyUpload mUpload={props.uploadImg} mSetNull={setNullPreview} />
            </Form.Item>
          </div>
        }
        mInitialValues={defValue}
        mCheckImg
      />
    </div>
  );
}

Banner.propTypes = {
  adminReducer: PropTypes.any,
  getBanners: PropTypes.func,
  updateBanner: PropTypes.func,
  uploadImg: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getBanners: data => {
    dispatch(action.getBanners(data));
  },
  updateBanner: data => {
    dispatch(action.updateBanner(data));
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
)(Banner);
