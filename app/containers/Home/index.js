/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable no-plusplus */
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import { Row, Col, Image } from 'antd';
// import reducer from './reducer';
// import saga from './saga';
import makeSelect from './selectors';
import MyLayout from '../../components/MyLayout/Loadable';
import ImgCom from '../../components/ImgCom/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import * as action from './actions';

const MyDiv = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// #region  row
const row = [];
for (let i = 0; i < 4; i++) {
  row.push(
    <Col span={6}>
      <ImgCom
        mStyle="center"
        mWidth="150px"
        mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        mLink="/news/1"
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

function formatDate(string) {
  return new Date(string).toLocaleDateString();
}

export function Home(props) {
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
    props.getLastestPosts(5);
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
                  {props.homeReducer.lastestPosts[0] && (
                    <Row gutter={16} style={{ marginBottom: '15px' }}>
                      <Col span={16}>
                        <Image
                          height={300}
                          src={props.homeReducer.lastestPosts[0].img}
                        />
                      </Col>
                      <Col span={8}>
                        <a
                          href={`/news/${props.homeReducer.lastestPosts[0].id}`}
                        >
                          {props.homeReducer.lastestPosts[0].title}
                        </a>
                        <p>
                          {formatDate(
                            props.homeReducer.lastestPosts[0].publishAt,
                          )}
                        </p>
                        <MyDiv
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: props.homeReducer.lastestPosts[0].content,
                          }}
                        />
                      </Col>
                    </Row>
                  )}
                  <Row>
                    {props.homeReducer.lastestPosts &&
                      props.homeReducer.lastestPosts.map(
                        (i, index) =>
                          index !== 0 && (
                            <Col key={i.id} span={6}>
                              <ImgCom
                                mStyle="center"
                                mWidth="150px"
                                mSrc={i.img}
                                mLink={`/news/${i.id}`}
                                mTitle={i.title}
                                mDay={formatDate(i.publishAt)}
                                mContent={
                                  <MyDiv
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{
                                      __html: i.content,
                                    }}
                                  />
                                }
                              />
                            </Col>
                          ),
                      )}
                  </Row>
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
  getLastestPosts: PropTypes.func,
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
  getLastestPosts: data => {
    dispatch(action.getLastestPosts(data));
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
