import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
import { List, Comment, Space, Form, Input } from 'antd';
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

// import messages from './messages';
import * as action from './actions';
import * as hAction from '../Home/actions';

import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import {
  MyLink,
  MyText,
  MyButton,
  API_KEY,
} from '../../components/Style/index';

const dateFormat = 'DD/MM/YYYY';

export function News(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });
  const [form] = Form.useForm();

  useEffect(() => {
    props.getPost(match.params.id);
    props.getComments(match.params.id);
    props.getLastestPosts();
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getCityList();
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

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log(values);
    });
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
                    <p style={{ textAlign: 'right', opacity: 0.6 }}>
                      Ngày đăng:{' '}
                      {moment(props.newsReducer.post.publishAt).format(
                        'DD-MM-YYYY',
                      )}
                    </p>
                    <h2>{props.newsReducer.post.title}</h2>
                    <div
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{
                        __html: props.newsReducer.post.content,
                      }}
                    />

                    <div style={{ textAlign: 'right' }}>
                      <p>
                        Nguồn:{' '}
                        <MyLink
                          href={`https://${props.newsReducer.post.source}`}
                        >
                          {props.newsReducer.post.source}
                        </MyLink>
                      </p>

                      <Space>
                        <FacebookShareButton url={window.location.href}>
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TelegramShareButton url={window.location.href}>
                          <TelegramIcon size={32} round />
                        </TelegramShareButton>
                        <TwitterShareButton url={window.location.href}>
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                      </Space>
                    </div>
                  </div>
                }
              />

              <Form form={form}>
                <Form.Item name="content">
                  <Input.TextArea placeholder="Để lại bình luận" />
                </Form.Item>
                <Form.Item>
                  <MyButton onClick={handleSubmit}>Bình luận</MyButton>
                </Form.Item>
              </Form>

              {props.newsReducer.comments.length > 0 && (
                <List
                  bordered
                  className="comment-list"
                  header={`${props.newsReducer.comments.length} bình luận`}
                  itemLayout="horizontal"
                  dataSource={props.newsReducer.comments}
                  style={{ margin: '10px auto' }}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <Comment
                        author={item.user.username}
                        avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        content={
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          />
                        }
                        datetime={moment(item.updatedAt).format(dateFormat)}
                      />
                    </List.Item>
                  )}
                />
              )}

              {props.homeReducer.lastestPosts.length > 0 && (
                <List
                  bordered
                  header="Tin liên quan"
                  dataSource={props.homeReducer.lastestPosts}
                  renderItem={(item, index) =>
                    index < 5 &&
                    item.id !== match.params.id && (
                      <List.Item key={item.id}>
                        <MyText>
                          <Space>
                            <MyLink href={`/news/${item.id}`}>
                              {item.title}
                            </MyLink>
                            <MyText style={{ opacity: 0.6 }}>{`[${moment(
                              item.publishAt,
                            ).format(dateFormat)}]`}</MyText>
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
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  newsReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getPost: data => {
    dispatch(action.getPost(data));
  },
  getComments: data => {
    dispatch(action.getComments(data));
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(News);
