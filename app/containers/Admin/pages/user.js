import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Select, Input, Form } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';

import AdminTable from '../../../components/AdminTable/Loadable';
import makeSelect from '../selectors';
import * as action from '../actions';

const { Option } = Select;

let k = -1;

export function User(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isReRender, setIsReRender] = useState(false);

  useEffect(() => {
    props.getUsers();
    props.getUserTypes();
  }, [isReRender]);

  useEffect(() => {
    props.getUsers();
  }, [isReRender, k]);

  useEffect(() => {
    props.getUsers();
    if (k === -1) k = 0;
  }, [isReRender]);

  const propertyNames = [
    {
      title: 'Tên đăng nhập',
      data: 'username',
    },
    {
      title: 'Mật khẩu',
      data: 'password',
    },
    {
      title: 'Email',
      data: 'email',
    },
    {
      title: 'Số điện thoại',
      data: 'phone',
    },
    {
      title: 'Trạng thái',
      data: 'status',
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updateUser(record);
    setIsReRender(!isReRender);
  };

  const handleSearch = (entry, currValue) =>
    entry.username.toLowerCase().includes(currValue) ||
    entry.password.toLowerCase().includes(currValue) ||
    entry.email.toLowerCase().includes(currValue) ||
    entry.phone.toString().includes(currValue);

  return (
    <div>
      <Helmet>
        <title>User</title>
        <meta name="description" content="Description of user" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách tài khoản"
        mSearch={handleSearch}
        mData={props.adminReducer.users}
        mPropertyNames={propertyNames}
        mUpdate={handleClick}
        mTableModal={
          <div>
            <Form.Item label="Tên đăng nhập" name="username">
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Vui lòng nhập đúng định dạng email!',
                },
                {
                  required: true,
                  message: 'Vui lòng nhập email hội quán!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Select>
                <Option value={false}>Khóa</Option>
                <Option value>Mở Khóa</Option>
              </Select>
            </Form.Item>
          </div>
        }
      />
    </div>
  );
}

User.propTypes = {
  adminReducer: PropTypes.any,
  getUsers: PropTypes.func,
  updateUser: PropTypes.func,
  getUserTypes: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getUsers: data => {
    dispatch(action.getUsers(data));
  },
  createUser: data => {
    dispatch(action.createUser(data));
  },
  updateUser: data => {
    dispatch(action.updateUser(data));
  },
  deleteUser: data => {
    dispatch(action.deleteUser(data));
  },
  getUserTypes: data => {
    dispatch(action.getUserTypes(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(User);
