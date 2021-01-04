import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { List, Comment, Space, Form, Button } from 'antd';
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
import MyEditor from '../../components/MyEditor/Loadable';

const dateFormat = 'DD/MM/YYYY';

const MyContentDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
  max-height: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export function News(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });

  const [editorValue, setEditorValue] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    props.getPost(match.params.id);
    props.getComments(match.params.id);
    props.getLastestPosts(5);
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      content: editorValue,
    });
  }, [form, editorValue]);

  const handleEditor = value => {
    setEditorValue(value);
  };

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
                    <p style={{ textAlign: 'right' }}>
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
                        <a href={props.newsReducer.post.source}>
                          {props.newsReducer.post.source}
                        </a>
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
                  <MyEditor mHeight="200px" mChange={handleEditor} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleSubmit}>
                    Bình luận
                  </Button>
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
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={<a href={`/news/${item.id}`}>{item.title}</a>}
                        description={moment(item.publishAt).format(dateFormat)}
                      />
                      <MyContentDiv
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
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
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  newsReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getPost: data => {
    dispatch(action.getPost(data));
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
  getComments: data => {
    dispatch(action.getComments(data));
  },
  getLastestPosts: data => {
    dispatch(hAction.getLastestPosts(data));
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
