import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Form, Input } from 'antd';

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
import ThreadList from '../../components/ThreadList/index';
import { API_KEY, MyAntdModal, MyAntdForm } from '../../components/Style/index';

const bcrData = [
  {
    name: 'Thảo luận',
  },
];

export function Forum(props) {
  useInjectReducer({ key: 'forum', reducer });
  useInjectSaga({ key: 'forum', saga });

  const [isRerender, setIsRerender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    props.getForumPosts();
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
    props.getForumPosts();
  }, [isRerender]);

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = values => {
    props.getLoginToken(values);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const data = {
        ...values,
        userId: JSON.parse(localStorage.getItem('usr')).id,
      };
      props.createForumPost(data);
      showModal();
      setIsRerender(!isRerender);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Forum</title>
        <meta name="description" content="Description of Forum" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <TitleCom
              mCategory="Danh sách thảo luận"
              mCont={
                <div>
                  <ThreadList mData={props.forumReducer.forumPosts} />
                </div>
              }
              mCreate={localStorage.getItem('authToken') ? showModal : null}
            />
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
      <MyAntdModal
        title="Thảo luận mới"
        centered
        visible={isVisible}
        onCancel={showModal}
        onOk={handleSubmit}
        okText="Tạo"
        cancelText="Hủy"
        width={1000}
      >
        <MyAntdForm form={form}>
          <Form.Item name="title">
            <Input placeholder="Tiêu đề" />
          </Form.Item>
          <Form.Item name="content">
            <Input.TextArea
              placeholder="Nội dung"
              style={{ minHeight: '19vw' }}
            />
          </Form.Item>
        </MyAntdForm>
      </MyAntdModal>
    </div>
  );
}

Forum.propTypes = {
  homeReducer: PropTypes.any,
  forumReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  getForumPosts: PropTypes.func,
  createForumPost: PropTypes.func,
  updateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  forumReducer: makeSelect(),
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
  getForumPosts: data => {
    dispatch(action.getForumPosts(data));
  },
  createForumPost: data => {
    dispatch(action.createForumPost(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Forum);
