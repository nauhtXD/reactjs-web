/* eslint-disable indent */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { List, Row, Col, Divider, Image } from 'antd';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';

import * as action from './actions';
import * as hAction from '../Home/actions';
import makeSelectHome from '../Home/selectors';

import MyLayout from '../../components/MyLayout/index';
import CommentForm from '../../components/CommentForm/index';
import TitleCom from '../../components/TitleCom/index';
import { API_KEY, MyAntdList, MyComment } from '../../components/Style/index';

const bcrData = [
  {
    name: 'Thảo luận',
  },
  {
    name: 'Bài viết',
  },
];
const dateFormat = 'L';

export function ForumPost(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  useInjectReducer({ key: 'forumPost', reducer });
  useInjectSaga({ key: 'forumPost', saga });

  const [isRerender, setIsRerender] = useState(false);
  const forumPostId = match.params.id;

  useEffect(() => {
    props.getForumPost(forumPostId);
    props.getForumComments(forumPostId);
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
    props.getForumComments(forumPostId);
  }, [isRerender]);

  const handleSubmit = values => {
    const data = {
      ...values,
      forumPostId,
      userId: JSON.parse(localStorage.getItem('usr')).id,
    };
    props.createForumComment(data);
    setIsRerender(!isRerender);
  };

  const handleLogin = values => {
    props.getLoginToken(values);
  };

  return (
    <div>
      <Helmet>
        <title>ForumPost</title>
        <meta name="description" content="Description of ForumPost" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            {props.forumPostReducer.forumPost && (
              <TitleCom
                mCategory={props.forumPostReducer.forumPost.title}
                mCont={
                  <div>
                    <Row>
                      <Col span={4}>
                        <div style={{ textAlign: 'center' }}>
                          <Image
                            width="50%"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            style={{ borderRadius: '50%' }}
                          />
                          <p style={{ fontSize: '1.14vw' }}>
                            {props.forumPostReducer.forumPost.user &&
                              props.forumPostReducer.forumPost.user.username}
                          </p>
                        </div>
                      </Col>
                      <Col span={20}>
                        <Divider
                          orientation="left"
                          style={{
                            margin: '0.379vw',
                            fontSize: '1vw',
                            opacity: 0.6,
                          }}
                        >
                          {moment(
                            props.forumPostReducer.forumPost.createdAt,
                          ).format('L')}
                        </Divider>
                        <p style={{ fontSize: '1.14vw' }}>
                          {props.forumPostReducer.forumPost.content}
                        </p>
                      </Col>
                    </Row>
                  </div>
                }
                mCheck
              />
            )}
            <div style={{ height: '0.379vw' }} />
            {localStorage.getItem('authToken') && (
              <CommentForm mCreateComment={handleSubmit} />
            )}
            <div style={{ height: '0.379vw' }} />
            {props.forumPostReducer.forumComments &&
              props.forumPostReducer.forumComments.length > 0 && (
                <MyAntdList
                  bordered
                  className="comment-list"
                  header={`${
                    props.forumPostReducer.forumComments.length
                  } câu trả lời`}
                  itemLayout="horizontal"
                  dataSource={props.forumPostReducer.forumComments}
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
      />
    </div>
  );
}

ForumPost.propTypes = {
  homeReducer: PropTypes.any,
  forumPostReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  getForumPost: PropTypes.func,
  getForumComments: PropTypes.func,
  createForumComment: PropTypes.func,
  updateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  forumPostReducer: makeSelect(),
  homeReducer: makeSelectHome(),
});

const mapDispatchToProps = dispatch => ({
  updateUser: data => {
    dispatch(hAction.updateUser(data));
  },
  getBanners: data => {
    dispatch(hAction.getBanners(data));
  },
  getLoginToken: data => {
    dispatch(hAction.getLoginToken(data));
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
  getForumPost: data => {
    dispatch(action.getForumPost(data));
  },
  getForumComments: data => {
    dispatch(action.getForumComments(data));
  },
  createForumComment: data => {
    dispatch(action.createForumComment(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ForumPost);
