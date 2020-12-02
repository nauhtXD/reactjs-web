import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Rate, Typography, List, Comment, Tooltip } from 'antd';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import * as action from './actions';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const data1 = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(1, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure), to help people create their
        product prototypes beautifully and efficiently.
      </p>
    ),
    datetime: (
      <Tooltip
        title={moment()
          .subtract(2, 'days')
          .format('YYYY-MM-DD HH:mm:ss')}
      >
        <span>
          {moment()
            .subtract(2, 'days')
            .fromNow()}
        </span>
      </Tooltip>
    ),
  },
];

export function News(props) {
  useInjectReducer({ key: 'news', reducer });
  useInjectSaga({ key: 'news', saga });
  useEffect(() => {
    props.getPost(3);
    props.getCategories();
    props.getSubCategories();
  }, []);
  const mD = props.newsReducer.post;
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
                mCategory={mD.title}
                mCont={
                  <div style={{ textAlign: 'right' }}>
                    <p>
                      Ngày đăng: {moment(mD.publishAt).format('DD-MM-YYYY')}
                    </p>
                    <div
                      style={{ textAlign: 'left' }}
                      dangerouslySetInnerHTML={{ __html: mD.content }}
                    />
                    <p>
                      Nguồn: <a href={mD.source}>{mD.source}</a>
                    </p>
                  </div>
                }
              />
              <div>
                <Rate />
                <div />
              </div>
              <List
                className="comment-list"
                header={`${data.length} replies`}
                itemLayout="horizontal"
                dataSource={data1}
                renderItem={item => (
                  <li>
                    <Comment
                      actions={item.actions}
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
              <div>
                <h2>Tin liên quan</h2>
                <div>
                  <List
                    bordered
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <Typography.Text mark>[dd/MM/yyyy]</Typography.Text>
                        {item}
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </div>
          }
          mCategories={props.newsReducer.categories}
          mSubCategories={props.newsReducer.subCategories}
        />
      </div>
    </div>
  );
}

News.propTypes = {
  newsReducer: PropTypes.any,
  getPost: PropTypes.func,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newsReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getPost: data => {
    dispatch(action.getPost(data));
  },
  getCategories: data => {
    dispatch(action.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(action.getSubCategories(data));
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
