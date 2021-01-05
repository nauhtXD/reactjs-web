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
import moment from 'moment';
import makeSelect from './selectors';
import MyLayout from '../../components/MyLayout/Loadable';
import ImgCom from '../../components/ImgCom/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import * as action from './actions';

const dateFormat = 'DD/MM/YYYY';

const MyDiv = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
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
// #endregion

export function Home(props) {
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getLastestPosts(4);
    props.getSubCategoriesByCID(3);
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
                      <Col span={14}>
                        <Image
                          height={300}
                          src={props.homeReducer.lastestPosts[0].img}
                        />
                      </Col>
                      <Col span={10}>
                        <a
                          href={`/news/${props.homeReducer.lastestPosts[0].id}`}
                        >
                          <b style={{ fontSize: '17px' }}>
                            {props.homeReducer.lastestPosts[0].title}
                          </b>
                        </a>
                        <p style={{ fontSize: '13px' }}>
                          {moment(
                            props.homeReducer.lastestPosts[0].publishAt,
                          ).format(dateFormat)}
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
                            <Col key={i.id} span={8}>
                              <ImgCom
                                mStyle="left"
                                mWidth="150px"
                                mSrc={i.img}
                                mLink={`/news/${i.id}`}
                                mTitle={i.title}
                                mDay={moment(i.publishAt).format(dateFormat)}
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
                  <Row>{rowc}</Row>
                </div>
              }
            />
            <Row gutter={16}>
              {props.homeReducer.subCategoriesByCID.length > 0 &&
                props.homeReducer.subCategoriesByCID.map(i => (
                  <Col span={8}>
                    <TitleCom
                      mCategory={i.name}
                      mCont={<div>{rowhcont}</div>}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mContacts={props.homeReducer.contacts}
      />
    </div>
  );
}

Home.propTypes = {
  homeReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getSubCategoriesByCID: PropTypes.func,
  getContacts: PropTypes.func,
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
  getSubCategoriesByCID: data => {
    dispatch(action.getSubCategoriesByCID(data));
  },
  getContacts: data => {
    dispatch(action.getContacts(data));
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
