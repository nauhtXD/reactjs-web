/* eslint-disable prettier/prettier */
import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Input, Select } from 'antd';

import reducer from '../reducer';
import saga from '../saga';

import AdminTable from '../../../components/AdminTable/Loadable';
import makeSelect from '../selectors';
import * as action from '../actions';

const { Option } = Select;

let k = -1;

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
    props.createHousehold(record);
    setIsRerender(!isRerender);
    return 0;
  };

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
        mModal={
          <div>
            <Form.Item name="name" label="Chủ hộ">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="Tên tài khoản">
              <Select>
                {props.adminReducer.users.length > 0 &&
                  props.adminReducer.users.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="landArea" label="Hecta đất">
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
          </div>
        }
        mTableModal={
          <div>
            <Form.Item name="name" label="Chủ hộ">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="Tên tài khoản">
              <Select>
                {props.adminReducer.users.length > 0 &&
                  props.adminReducer.users.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.username}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="landArea" label="Hecta đất">
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
          </div>
        }
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
