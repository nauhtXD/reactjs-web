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
  notification,
} from 'antd';
// import styled from 'styled-components';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import MyBox from '../../../components/MyBox/index';
import MyTable from '../../../components/MyTable/index';
import makeSelect from '../selectors';
import * as action from '../actions';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;
const { Search } = Input;

const openNotiWIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export function User(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });
  useEffect(() => {
    props.getUsers();
    props.getUserTypes();
  }, []);

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'userType.name',
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Chỉnh sửa
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  const handleUpdate = record => {
    console.log(Object.getOwnPropertyNames(record));
  };

  const handleDelete = id => {
    console.log(id);
  };

  const handleCancle = () => {
    setIsVisible(false);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (values.password === values.retype) props.createUser(values);
      else openNotiWIcon('error', 'Lỗi', 'Mật khẩu nhập lại không trùng khớp');
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
            userTypeId: 1,
          }}
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
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
            name="retype"
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

          <Form.Item label="Loại người dùng" name="userTypeId">
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
