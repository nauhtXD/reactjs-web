/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable no-plusplus */
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Row, Col } from 'antd';
import reducer from './reducer';
import saga from './saga';
import makeSelect from './selectors';
import MyLayout from '../../components/MyLayout/Loadable';
import H3news from '../../components/H3news/Loadable';
import CenterImgWT from '../../components/CenterImgWT/Loadable';
import LeftImgWttd from '../../components/LeftImgWttd/Loadable';
import RightImgWttd from '../../components/RightImgWttd/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import * as action from './actions';

// #region  row
const row = [];
for (let i = 0; i < 4; i++) {
  row.push(
    <Col span={6}>
      <CenterImgWT
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        linkTitle="Title2"
      />
    </Col>,
  );
}

const rowc = [];
for (let i = 0; i < 3; i++) {
  rowc.push(
    <Col span={8}>
      <LeftImgWttd
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        mTitle="Title2"
      />
    </Col>,
  );
}

const rowc1 = [];
for (let i = 0; i < 3; i++) {
  rowc.push(
    <Col span={8}>
      <RightImgWttd
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        mTitle="Title2"
      />
    </Col>,
  );
}

const rowh = [];
for (let i = 0; i < 3; i++) {
  rowh.push(
    <Col span={8}>
      <H3news
        num={3}
        mWidth="100px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        mTitle="Title2"
        mDay="dd/MM/yyyy"
        mCategory="Category"
      />
    </Col>,
  );
}
// #endregion

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  useEffect(() => {
    props.getCategories();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <TitleCom
              mCategory="Tin tức - Sự kiện"
              mCont={
                <div>
                  <Row>{row}</Row>
                  <Row>{row}</Row>
                </div>
              }
            />
            <TitleCom
              mCategory="Nhà nông cần biết"
              mCont={
                <div>
                  <Row>{rowc}</Row>
                  <Row>{rowc1}</Row>
                </div>
              }
            />
            <Row gutter={16}>{rowh}</Row>
          </div>
        }
        mCategories={props.homeReducer.categories}
      />
    </div>
  );
}

Home.propTypes = {
  homeReducer: PropTypes.any,
  getCategories: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => {
    dispatch(action.getCategories(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
