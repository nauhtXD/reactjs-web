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
import { Row, Col, Image } from 'antd';
import reducer from './reducer';
import saga from './saga';
import makeSelect from './selectors';
import MyLayout from '../../components/MyLayout/Loadable';
import ImgCom from '../../components/ImgCom/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import * as action from './actions';

// #region  row
const row = [];
for (let i = 0; i < 4; i++) {
  row.push(
    <Col span={6}>
      <ImgCom
        mStyle="center"
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        mTitle="Title2"
        mDay="dd/MM/yyyy"
        mContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a eleifend lacus. Duis condimentum molestie leo, a scelerisque neque"
      />
    </Col>,
  );
}

const rowc = [];
for (let i = 0; i < 3; i++) {
  rowc.push(
    <Col span={8}>
      <ImgCom
        mStyle="left"
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        mTitle="Title2"
        mDay="dd/MM/yyyy"
        mContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </Col>,
  );
}

const rowc1 = [];
for (let i = 0; i < 3; i++) {
  rowc.push(
    <Col span={8}>
      <ImgCom
        mStyle="right"
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/News"
        mTitle="Title2"
        mDay="dd/MM/yyyy"
        mContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
    </Col>,
  );
}

const rowhcont = [];
for (let i = 0; i < 3; i++) {
  rowhcont.push(
    <ImgCom
      mStyle="left"
      mWidth="100px"
      mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      mLink="/News"
      mTitle="Title2"
      mDay="dd/MM/yyyy"
      mContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />,
  );
}

const rowh = [];
for (let i = 0; i < 3; i++) {
  rowh.push(
    <Col span={8}>
      <TitleCom mCategory="Category" mCont={<div>{rowhcont}</div>} />
    </Col>,
  );
}
// #endregion

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
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
                  <Row gutter={16} style={{ marginBottom: '15px' }}>
                    <Col span={16}>
                      <Image
                        height={300}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </Col>
                    <Col span={8}>
                      <a href=".">Title</a>
                      <p>dd/MM/yyyy</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean a eleifend lacus. Duis condimentum molestie leo,
                        a scelerisque neque eleifend eu. Quisque ullamcorper
                        mauris dui, scelerisque commodo nisi blandit sit amet.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Nullam faucibus
                        pharetra porta. Pellentesque sollicitudin eget dui
                        vitae.
                      </p>
                    </Col>
                  </Row>
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
        mSubCategories={props.homeReducer.subCategories}
        mMarks={props.homeReducer.marks}
        mContacts={props.homeReducer.contacts}
      />
    </div>
  );
}

Home.propTypes = {
  homeReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getMarks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => {
    dispatch(action.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(action.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(action.getContacts(data));
  },
  getMarks: data => {
    dispatch(action.getMarks(data));
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
