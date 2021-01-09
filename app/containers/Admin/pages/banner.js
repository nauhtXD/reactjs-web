/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { Select, Input, Image, Form } from 'antd';
// import styled from 'styled-components';
// import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';
import AdminTable from '../../../components/AdminTable/index';

let k = -1;

export function Banner(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(null);

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

  const propertyNames = [
    {
      title: 'ID',
      data: 'id',
    },
    {
      title: 'Hình ảnh',
      data: 'img',
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updateBanner(record);
    setIsRerender(!isRerender);
  };

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
        mModal={<div>aaaaaaa</div>}
        mTableModal={<div>aaaaaa</div>}
      />
    </div>
  );
}

Banner.propTypes = {
  adminReducer: PropTypes.any,
  getBanners: PropTypes.func,
  updateBanner: PropTypes.func,
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Banner);
