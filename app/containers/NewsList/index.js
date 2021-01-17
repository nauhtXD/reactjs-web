import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { List, Image } from 'antd';
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
import TitleCom from '../../components/TitleCom/index';
import { MyLink, ContentDiv, API_KEY } from '../../components/Style/index';

const dateFormat = 'L';

export function NewsList(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  useInjectReducer({ key: 'newsList', reducer });
  useInjectSaga({ key: 'newsList', saga });

  const [bcrData, setBcrData] = useState(null);

  useEffect(() => {
    props.getPostsBySCID(match.params.subId);
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
    if (props.newsListReducer.posts.length > 0)
      setBcrData([{ name: props.newsListReducer.posts[0].subcategory.name }]);
  }, [props.newsListReducer.posts]);

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

  return (
    <div>
      <Helmet>
        <title>
          {props.newsListReducer.posts[0] &&
            props.newsListReducer.posts[0].subcategory.name}
        </title>
        <meta name="description" content="Description of NewsList" />
      </Helmet>
      <div>
        <MyLayout
          mCont={
            <div>
              {props.newsListReducer.posts.length > 0 && (
                <TitleCom
                  mCategory={props.newsListReducer.posts[0].subcategory.name}
                  mCont={
                    <div>
                      <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                          defaultPageSize: 5,
                          showSizeChanger: true,
                          pageSizeOptions: ['5', '10', '20'],
                        }}
                        dataSource={props.newsListReducer.posts}
                        renderItem={item => (
                          <List.Item
                            key={item.id}
                            extra={<Image width={160} src={item.img} />}
                          >
                            <MyLink
                              href={`/news/${item.id}`}
                              style={{ fontSize: '1.3vw' }}
                            >
                              <b>{item.title}</b>
                            </MyLink>
                            <p style={{ opacity: 0.6, fontSize: '1vw' }}>
                              {moment(item.publishAt).format(dateFormat)}
                            </p>
                            <ContentDiv
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  }
                  mCheck
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

NewsList.propTypes = {
  homeReducer: PropTypes.any,
  newsListReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getPostsBySCID: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  updateUser: PropTypes.func,
  getForumPostsByUID: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  newsListReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getForumPostsByUID: data => {
    dispatch(hAction.getForumPostsByUID(data));
  },
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
  getPostsBySCID: data => {
    dispatch(action.getPostsBySCID(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewsList);
