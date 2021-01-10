/* eslint-disable jsx-a11y/no-distracting-elements */
/* eslint-disable no-plusplus */
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Image } from 'antd';
import moment from 'moment';

import * as action from './actions';
import makeSelect from './selectors';
import MyLayout from '../../components/MyLayout/Loadable';
import ImgCom from '../../components/ImgCom/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import { MyLink, ContentDiv, API_KEY } from '../../components/Style/index';

const dateFormat = 'DD/MM/YYYY';

export function Home(props) {
  const [usrName, setUsrName] = useState(null);

  useEffect(() => {
    props.getCityList();
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getLastestPosts();
    props.getSubCategoriesByCID(3);
    props.getLastestDocuments(4);
  }, []);

  useEffect(() => {
    const dataList = props.homeReducer.cityList.map(i => i.province.weatherId);
    if (dataList.length > 0)
      props.getWeathers({
        data: [...new Set(dataList)],
        key: API_KEY,
      });
  }, [props.homeReducer.cityList]);

  useEffect(() => {
    if (props.homeReducer.loginToken.token) {
      localStorage.setItem('authToken', props.homeReducer.loginToken.token);
      localStorage.setItem('usrId', props.homeReducer.loginToken.uid);
      localStorage.setItem('usrName', usrName);
      window.location.reload();
    }
  }, [props.homeReducer.loginToken]);

  const handleLogin = values => {
    setUsrName(values.username);
    props.getLoginToken(values);
  };

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
                    <Row>
                      <Col span={15}>
                        <Image
                          height={300}
                          src={props.homeReducer.lastestPosts[0].img}
                        />
                        <div style={{ height: '10px' }} />
                        <MyLink
                          href={`/news/${props.homeReducer.lastestPosts[0].id}`}
                        >
                          <b style={{ fontSize: '19px' }}>
                            {props.homeReducer.lastestPosts[0].title}
                          </b>
                        </MyLink>
                        <p style={{ fontSize: '13px', opacity: 0.6 }}>
                          {moment(
                            props.homeReducer.lastestPosts[0].publishAt,
                          ).format(dateFormat)}
                        </p>
                        <ContentDiv
                          style={{
                            WebkitLineClamp: 4,
                          }}
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{
                            __html: props.homeReducer.lastestPosts[0].content,
                          }}
                        />
                      </Col>
                      <Col span={9}>
                        {props.homeReducer.lastestPosts &&
                          props.homeReducer.lastestPosts.map(
                            (i, index) =>
                              index !== 0 &&
                              index < 4 && (
                                <ImgCom
                                  key={i.id}
                                  mStyle="left"
                                  mWidth="128px"
                                  mSrc={i.img}
                                  mLink={`/news/${i.id}`}
                                  mTitle={i.title}
                                  mDay={moment(i.publishAt).format(dateFormat)}
                                  mContent={
                                    <ContentDiv
                                      // eslint-disable-next-line react/no-danger
                                      dangerouslySetInnerHTML={{
                                        __html: i.content,
                                      }}
                                    />
                                  }
                                />
                              ),
                          )}
                      </Col>
                    </Row>
                  )}
                </div>
              }
              mCheck
            />
          </div>
        }
        mCont2={
          <div>
            <TitleCom
              mCategory="Nhà nông cần biết"
              mCont={
                <Row>
                  {props.homeReducer.lastestPosts &&
                    props.homeReducer.lastestPosts
                      .filter(
                        i => i.subcategoryId === 6 || i.subcategoryId === 7,
                      )
                      .map(
                        (i, index) =>
                          index < 6 && (
                            <Col span={8}>
                              <ImgCom
                                key={i.id}
                                mStyle="left"
                                mWidth="128px"
                                mSrc={i.img}
                                mLink={`/news/${i.id}`}
                                mTitle={i.title}
                                mDay={moment(i.publishAt).format(dateFormat)}
                                mContent={
                                  <ContentDiv
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
              }
              mCheck
            />
            <Row gutter={16}>
              {props.homeReducer.subCategoriesByCID.length > 0 &&
                props.homeReducer.subCategoriesByCID.map(i => (
                  <Col span={8}>
                    <TitleCom
                      mCategory={i.name}
                      mCont={
                        <div>
                          {props.homeReducer.lastestPosts.length > 0 &&
                            props.homeReducer.lastestPosts
                              .filter(j => j.subcategoryId === i.id)
                              .map(
                                (j, index) =>
                                  index < 3 && (
                                    <ImgCom
                                      key={j.id}
                                      mStyle="left"
                                      mWidth="128px"
                                      mSrc={j.img}
                                      mLink={`/news/${j.id}`}
                                      mTitle={j.title}
                                      mDay={moment(j.publishAt).format(
                                        dateFormat,
                                      )}
                                      mContent={
                                        <ContentDiv
                                          // eslint-disable-next-line react/no-danger
                                          dangerouslySetInnerHTML={{
                                            __html: j.content,
                                          }}
                                        />
                                      }
                                    />
                                  ),
                              )}
                        </div>
                      }
                      mCheck
                      mLink={`/list/${i.id}`}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mContacts={props.homeReducer.contacts}
        mCreateReport={props.createProblem}
        mDocuments={props.homeReducer.lastestDocuments}
        mWeathers={props.homeReducer.weathers}
        mLogin={handleLogin}
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
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getLoginToken: data => {
    dispatch(action.getLoginToken(data));
  },
  getCityList: data => {
    dispatch(action.getCityList(data));
  },
  getWeathers: data => {
    dispatch(action.getWeathers(data));
  },
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
  createProblem: data => {
    dispatch(action.createProblem(data));
  },
  getLastestDocuments: data => {
    dispatch(action.getLastestDocuments(data));
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
