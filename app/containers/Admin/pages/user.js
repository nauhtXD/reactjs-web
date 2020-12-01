import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, Button, Table, Row, Col, Select, Input, Form } from 'antd';
// import styled from 'styled-components';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import MyBox from '../../../components/MyBox/index';
import makeSelect from '../selectors';
import * as action from '../actions';

const columns = [
  {
    title: 'UID',
    dataIndex: 'id',
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },
  {
    title: 'Status',
    dataIndex: 'subcategory_id',
  },
  {
    title: 'Category',
    dataIndex: 'user_category_id',
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;
const { Search } = Input;

export function User(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    props.getUsers();
  }, []);
  return (
    <div>
      <Helmet>
        <title>User</title>
        <meta name="description" content="Description of user" />
      </Helmet>
      <div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '30px', margin: '10px 0 10px 0' }}>
            List of users
          </p>
          <MyBox>
            <Row>
              <Col span={4}>
                <Select defaultValue="jack" style={{ width: 120 }}>
                  {props.adminReducer.users &&
                    props.adminReducer.users.length > 0 &&
                    props.adminReducer.users.map(i => (
                      <Option value={i.id}>{i.id}</Option>
                    ))}
                </Select>
              </Col>
              <Col span={16}>
                <Search placeholder="input text here" />
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => setIsVisible(true)}>
                  Create new
                </Button>
              </Col>
            </Row>
          </MyBox>
        </div>
        <div style={{ clear: 'both', height: '10px' }} />
        <MyBox>
          <Table columns={columns} dataSource={props.adminReducer.users} />
        </MyBox>
      </div>
      <Modal
        title="Create new user"
        centered
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsVisible(false)}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => setIsVisible(false)}
          >
            Submit
          </Button>,
        ]}
      >
        <Form {...layout}>
          <Form.Item label="ID" name="id">
            <Input placeholder="User ID" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Form.Item label="Retype password" name="retypepw">
            <Input placeholder="Retype password" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Account type" name="accounttype">
            <Select defaultValue="user">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

User.propTypes = {
  adminReducer: PropTypes.any,
  getUsers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getUsers: data => {
    dispatch(action.getUsers(data));
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
