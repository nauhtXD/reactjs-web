/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
import { List, Space } from 'antd';
import moment from 'moment';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectHome from '../Home/selectors';
import * as action from './actions';
import * as hAction from '../Home/actions';

import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import CommentForm from '../../components/CommentForm/index';
import {
  MyLink,
  MyText,
  API_KEY,
  MyAntdList,
  MyComment,
  dateFormat,
} from '../../components/Style/index';

const bcrData = [
  {
    name: 'Tin tức',
  },
];

export function News(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });

  const [isRerender, setIsRerender] = useState(false);
  const postId = match.params.id;

  useEffect(() => {
    props.getPost(postId);
    props.getComments(postId);
    props.getLastestPosts();
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getCityList();
    props.getLastestDocuments(4);
    props.getBanners();
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
    props.getComments(postId);
  }, [isRerender]);

  useEffect(() => {
    if (props.homeReducer.loginToken.token) {
      localStorage.setItem('authToken', props.homeReducer.loginToken.token);
      localStorage.setItem(
        'usr',
        JSON.stringify(props.homeReducer.loginToken.user),
      );
      window.location.reload();
    }
  }, [props.homeReducer.loginToken]);

  useEffect(() => {
    if (localStorage.getItem('usr'))
      props.getForumPostsByUID(JSON.parse(localStorage.getItem('usr')).id);
  }, [localStorage.getItem('usr')]);

  const handleLogin = values => {
    props.getLoginToken(values);
  };

  const handleSubmit = values => {
    const data = {
      ...values,
      postId,
      userId: JSON.parse(localStorage.getItem('usr')).id,
    };
    props.createComment(data);
    setIsRerender(!isRerender);
  };

  return (
    <div>
      <Helmet>
        <title>News</title>
        <meta name="description" content="Description of News" />
      </Helmet>
      <div>
        <MyLayout
          mCont={
            <div>
              <TitleCom
                mCategory={
                  props.newsReducer.post.subcategory &&
                  props.newsReducer.post.subcategory.name
                }
                mCont={
                  <div>
                    <p
                      style={{
                        textAlign: 'right',
                        opacity: 0.6,
                        fontSize: '1.14vw',
                      }}
                    >
                      Ngày đăng:{' '}
                      {moment(props.newsReducer.post.publishAt).format(
                        dateFormat,
                      )}
                    </p>
                    <p style={{ fontSize: '1.5163vm' }}>
                      <b>{props.newsReducer.post.title}</b>
                    </p>
                    <div
                      style={{ lineHeight: 1.5, fontSize: '1.14vw' }}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: props.newsReducer.post.content,
                      }}
                    />

                    <div style={{ textAlign: 'right', fontSize: '1.14vw' }}>
                      <p>
                        Nguồn:{' '}
                        <MyLink
                          href={`https://${props.newsReducer.post.source}`}
                          style={{ textDecoration: 'underline' }}
                        >
                          {props.newsReducer.post.source}
                        </MyLink>
                      </p>

                      <p style={{ fontSize: '1.14vw' }}>{`Người đăng: ${
                        props.newsReducer.post.author
                      }`}</p>

                      <Space>
                        <FacebookShareButton url={window.location.href}>
                          <FacebookIcon size="2.426vw" round />
                        </FacebookShareButton>
                        <TelegramShareButton url={window.location.href}>
                          <TelegramIcon size="2.426vw" round />
                        </TelegramShareButton>
                        <TwitterShareButton url={window.location.href}>
                          <TwitterIcon size="2.426vw" round />
                        </TwitterShareButton>
                      </Space>
                    </div>
                  </div>
                }
              />

              {localStorage.getItem('authToken') && (
                <CommentForm mCreateComment={handleSubmit} />
              )}

              {props.newsReducer.comments &&
                props.newsReducer.comments.length > 0 && (
                  <MyAntdList
                    bordered
                    className="comment-list"
                    header={`${props.newsReducer.comments.length} bình luận`}
                    itemLayout="horizontal"
                    dataSource={props.newsReducer.comments}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <MyComment
                          author={item.user.username}
                          avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          content={item.content}
                          datetime={moment(item.createdAt).format(dateFormat)}
                        />
                      </List.Item>
                    )}
                  />
                )}
              <div style={{ height: '0.379vw' }} />
              {props.homeReducer.lastestPosts.length > 0 && (
                <MyAntdList
                  bordered
                  header="Tin liên quan"
                  dataSource={props.homeReducer.lastestPosts}
                  renderItem={(item, index) =>
                    index < 5 &&
                    !item.id.toString().includes(postId) && (
                      <List.Item key={item.id}>
                        <MyText>
                          <Space>
                            <MyLink href={`/news/${item.id}`}>
                              {item.title}
                            </MyLink>
                            <MyText
                              style={{ opacity: 0.6, fontSize: '1.14vw' }}
                            >{`[${moment(item.publishAt).format(
                              dateFormat,
                            )}]`}</MyText>
                          </Space>
                        </MyText>
                      </List.Item>
                    )
                  }
                />
              )}
            </div>
          }
          mCategories={props.homeReducer.categories}
          mSubCategories={props.homeReducer.subCategories}
          mContacts={props.homeReducer.contacts}
          mCreateReport={props.createProblem}
          mDocuments={props.homeReducer.lastestDocuments}
          mWeathers={props.homeReducer.weathers}
          mLogin={handleLogin}
          mBanner={props.homeReducer.banners}
          mBreadcrumbs={bcrData}
          mUpdate={props.updateUser}
          mThread={props.homeReducer.forumPosts}
        />
      </div>
    </div>
  );
}

News.propTypes = {
  homeReducer: PropTypes.any,
  newsReducer: PropTypes.any,
  getPost: PropTypes.func,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getComments: PropTypes.func,
  getLastestPosts: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  createComment: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  updateUser: PropTypes.func,
  getForumPostsByUID: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  newsReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getForumPostsByUID: data => {
    dispatch(hAction.getForumPostsByUID(data));
  },
  updateUser: data => {
    dispatch(hAction.updateUser(data));
  },
  getPost: data => {
    dispatch(action.getPost(data));
  },
  getComments: data => {
    dispatch(action.getComments(data));
  },
  createComment: data => {
    dispatch(action.createComment(data));
  },
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
  },
  getLastestPosts: data => {
    dispatch(hAction.getLastestPosts(data));
  },
  getCityList: data => {
    dispatch(hAction.getCityList(data));
  },
  getWeathers: data => {
    dispatch(hAction.getWeathers(data));
  },
  createProblem: data => {
    dispatch(hAction.createProblem(data));
  },
  getLastestDocuments: data => {
    dispatch(hAction.getLastestDocuments(data));
  },
  getLoginToken: data => {
    dispatch(hAction.getLoginToken(data));
  },
  getBanners: data => {
    dispatch(hAction.getBanners(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(News);
