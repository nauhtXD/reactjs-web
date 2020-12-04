import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Modal,
  Button,
  Table,
  Row,
  Col,
  Select,
  Input,
  Form,
  Space,
} from 'antd';
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
    title: 'Tên đăng nhập',
    dataIndex: 'id',
  },
  {
    title: 'Mật khẩu',
    dataIndex: 'password',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
  },
  {
    title: 'Bị khóa',
    dataIndex: 'subcategory_id',
  },
  {
    title: 'Loại tài khoản',
    dataIndex: 'user_category_id',
  },
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;
const { Search } = Input;

export function User(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });
  useEffect(() => {
    props.getUsers();
    props.getUserTypes();
  }, []);

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  const handleCancle = () => {
    setIsVisible(false);
  };
  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log(values);
      //  props.createUser(values);
    });
  };

  return (
    <div>
      <Helmet>
        <title>User</title>
        <meta name="description" content="Description of user" />
      </Helmet>
      <div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '30px', margin: '10px 0 10px 0' }}>
            Danh sách thành viên
          </p>
          <MyBox>
            <Row>
              <Col span={4}>
                <Select defaultValue={1} style={{ width: 120 }}>
                  {props.adminReducer.userTypes &&
                    props.adminReducer.userTypes.length > 0 &&
                    props.adminReducer.userTypes.map(i => (
                      <Option key={i.id} value={i.id}>
                        {i.name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col span={16}>
                <Search placeholder="Nhập ký tự cần tìm" />
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => setIsVisible(true)}>
                  Tạo mới
                </Button>
              </Col>
            </Row>
          </MyBox>
        </div>
        <div style={{ clear: 'both', height: '10px' }} />
        <MyBox>
          <Table
            columns={columns}
            dataSource={props.adminReducer.users}
            rowKey="id"
          />
        </MyBox>
      </div>
      <Modal
        title="Thêm thành viên mới"
        centered
        visible={isVisible}
        onCancel={handleCancle}
        footer={null}
      >
        <Form
          form={form}
          {...layout}
          initialValues={{
            userType: 1,
          }}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="userName"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
            ]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="retypePW"
            rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item label="Loại người dùng" name="userType">
            <Select>
              {props.adminReducer.userTypes &&
                props.adminReducer.userTypes.length > 0 &&
                props.adminReducer.userTypes.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" onClick={handleSubmit}>
                Thêm
              </Button>
              <Button onClick={handleCancle}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

User.propTypes = {
  adminReducer: PropTypes.any,
  getUsers: PropTypes.func,
  createUser: PropTypes.func,
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
