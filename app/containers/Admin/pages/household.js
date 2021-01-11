/* eslint-disable prettier/prettier */
import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Input, Select, Row, Col } from 'antd';

import reducer from '../reducer';
import saga from '../saga';

import AdminTable from '../../../components/AdminTable/Loadable';
import makeSelect from '../selectors';
import * as action from '../actions';

const { Option } = Select;

let k = -1;
const init = {
  landId: 1,
  provinceId: 79,
  landArea: 1,
};

export function Household(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(false);

  useEffect(() => {
    props.getHouseholds();
    props.getLands();
    props.getUsers();
    props.getProvinces();
  }, [isRerender]);

  useEffect(() => {
    props.getHouseholds();
    if (k === -1) k = 0;
  }, [isRerender]);

  useEffect(() => {
    props.getHouseholds();
  }, [isRerender]);

  const propertyNames = [
    {
      title: 'Tên hộ',
      data: 'name',
    },
    {
      title: 'Tên tài khoản',
      data: ['user', 'username'],
    },
    {
      title: 'Hecta đất',
      data: 'landArea',
    },
    {
      title: 'Tỉnh',
      data: ['province', 'provinceName'],
    },
    {
      title: 'Loại đất',
      data: ['land', 'name'],
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updateHousehold(record);
    else props.deleteHousehold(record);
    setIsRerender(!isRerender);
  };

  const handleCreate = record => {
    const userTypeId = 2;
    const input = { ...record, user: { ...record.user, userTypeId } };
    props.createHousehold(input);
    setIsRerender(!isRerender);
    return 0;
  };

  const handleSearch = (entry, currValue) =>
    entry.name.toLowerCase().includes(currValue) ||
    entry.landArea.toString().includes(currValue) ||
    entry.user.username.toLowerCase().includes(currValue) ||
    entry.land.name.toLowerCase().includes(currValue) ||
    entry.province.provinceName.toLowerCase().includes(currValue);

  const mModal = [
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Chủ hộ"
            rules={[{ required: true, message: 'Vui lòng nhập tên chủ hộ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="landArea"
            label="Hecta đất"
            rules={[{ required: true, message: 'Vui lòng nhập số hecta đất!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="landId" label="Loại đất">
            <Select>
              {props.adminReducer.lands.length > 0 &&
                props.adminReducer.lands.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="provinceId" label="Tỉnh/TP">
            <Select>
              {props.adminReducer.provinces.length > 0 &&
                props.adminReducer.provinces.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.provinceName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Tên đăng nhập"
            name={['user', 'username']}
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name={['user', 'password']}
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name={['user', 'email']}
            rules={[
              {
                type: 'email',
                message: 'Vui lòng nhập đúng định dạng email!',
              },
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name={['user', 'phone']}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>,
  ];

  const mModalUpdate = [
    <div>
      <Form.Item
        name="name"
        label="Chủ hộ"
        rules={[{ required: true, message: 'Vui lòng nhập tên chủ hộ!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="landArea"
        label="Hecta đất"
        rules={[{ required: true, message: 'Vui lòng nhập số hecta đất!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="landId" label="Loại đất">
        <Select>
          {props.adminReducer.lands.length > 0 &&
            props.adminReducer.lands.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="provinceId" label="Tỉnh/TP">
        <Select>
          {props.adminReducer.provinces.length > 0 &&
            props.adminReducer.provinces.map(i => (
              <Option key={i.id} value={i.id}>
                {i.provinceName}
              </Option>
            ))}
        </Select>
      </Form.Item>
    </div>,
  ];

  return (
    <div>
      <Helmet>
        <title>Household</title>
        <meta name="description" content="Description of Household" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách hộ dân"
        mData={props.adminReducer.households}
        mPropertyNames={propertyNames}
        mDelete={handleClick}
        mUpdate={handleClick}
        mCreate={handleCreate}
        mSearch={handleSearch}
        mModal={mModal}
        mTableModal={mModalUpdate}
        mWidth={900}
        mInitialValues={init}
      />
    </div>
  );
}

Household.propTypes = {
  adminReducer: PropTypes.any,
  getHouseholds: PropTypes.func,
  createHousehold: PropTypes.func,
  updateHousehold: PropTypes.func,
  deleteHousehold: PropTypes.func,
  getLands: PropTypes.func,
  getUsers: PropTypes.func,
  getProvinces: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getHouseholds: data => {
    dispatch(action.getHouseholds(data));
  },
  createHousehold: data => {
    dispatch(action.createHousehold(data));
  },
  updateHousehold: data => {
    dispatch(action.updateHousehold(data));
  },
  deleteHousehold: data => {
    dispatch(action.deleteHousehold(data));
  },
  getLands: data => {
    dispatch(action.getLands(data));
  },
  getUsers: data => {
    dispatch(action.getUsers(data));
  },
  getProvinces: data => {
    dispatch(action.getProvinces(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Household);
