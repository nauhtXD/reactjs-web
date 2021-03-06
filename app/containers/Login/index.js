import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Form, Input } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as action from './actions';

import makeSelectHome from '../Home/selectors';
import * as hAction from '../Home/actions';

import {
  layout,
  tailLayout,
  MyButton,
  MyAntdForm,
} from '../../components/Style/index';

const CenterDiv = styled.div`
  background-color: #eee;
  height: 100vh;
  padding: 2.27445vw;
`;

const FormDiv = styled.div`
  margin: auto;
  background: #fff;
  padding: 2.27445vw;
  width: 90%;
  max-width: 34.117vw;
  -webkit-box-shadow: 0 2.27445vw 4.5489vw 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 2.27445vw 4.5489vw 0 rgba(0, 0, 0, 0.3);
`;

export function Login(props) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  useEffect(() => {
    if (props.loginReducer.loginToken.token) {
      props.checkToken(props.loginReducer.loginToken.token);
    }
  }, [props.loginReducer.loginToken]);

  useEffect(() => {
    if (props.homeReducer.checkToken.token) {
      localStorage.setItem('authToken', props.loginReducer.loginToken.token);
      localStorage.setItem(
        'usr',
        JSON.stringify(props.loginReducer.loginToken.user),
      );
      window.location.href = '/admin';
    }
  }, [props.homeReducer.checkToken]);

  const [form] = Form.useForm();

  const handleCLick = () => {
    form.validateFields().then(values => {
      props.getLoginToken(values);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <CenterDiv>
        <FormDiv>
          <MyAntdForm form={form} {...layout}>
            <Form.Item label="Tên đăng nhập" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <MyButton onClick={handleCLick}>Đăng nhập</MyButton>
            </Form.Item>
          </MyAntdForm>
        </FormDiv>
      </CenterDiv>
    </div>
  );
}

Login.propTypes = {
  loginReducer: PropTypes.any,
  homeReducer: PropTypes.any,
  getLoginToken: PropTypes.func,
  checkToken: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loginReducer: makeSelect(),
  homeReducer: makeSelectHome(),
});

const mapDispatchToProps = dispatch => ({
  getLoginToken: data => {
    dispatch(action.getLoginToken(data));
  },
  checkToken: data => {
    dispatch(hAction.checkToken(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
