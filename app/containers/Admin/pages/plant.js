/* eslint-disable prettier/prettier */
import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Form, Input, Select, DatePicker } from 'antd';

import reducer from '../reducer';
import saga from '../saga';

import AdminTable from '../../../components/AdminTable/Loadable';
import makeSelect from '../selectors';
import * as action from '../actions';

const { Option } = Select;

let k = -1;

export function Plant(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(false);

  useEffect(() => {
    props.getPlants();
    // props.getLands();
    props.getHouseholds();
    props.getGenusFeatures();
  }, [isRerender]);

  useEffect(() => {
    props.getPlants();
    if (k === -1) k = 0;
  }, [isRerender]);

  useEffect(() => {
    props.getPlants();
  }, [isRerender]);

  const propertyNames = [
    {
      title: 'Hộ dân',
      data: ['household', 'name'],
    },
    {
      title: 'Loại cây',
      data: ['genusFeature', 'name'],
    },

    {
      title: 'Số gốc cây',
      data: 'root',
    },
    {
      title: 'Tuổi',
      data: 'age',
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updatePlant(record);
    else props.deletePlant(record);
    setIsRerender(!isRerender);
  };

  const handleCreate = record => {
    props.createPlant(record);
    setIsRerender(!isRerender);
    return 0;
  };

  return (
    <div>
      <Helmet>
        <title>Plant</title>
        <meta name="description" content="Description of Plant" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách thông tin cây trồng của hộ dân"
        mData={props.adminReducer.Plants}
        mPropertyNames={propertyNames}
        mDelete={handleClick}
        mUpdate={handleClick}
        mCreate={handleCreate}
        mModal={
          <div>
            <Form.Item name="householdId" label="Hộ dân">
              <Select>
                {props.adminReducer.households.length > 0 &&
                  props.adminReducer.households.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="genusFeatureId" label="Loại cây">
              <Select>
                {props.adminReducer.genusFeatures.length > 0 &&
                  props.adminReducer.genusFeatures.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="root" label="Số gốc cây">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="age" label="Thời gian trồng">
              <DatePicker />
            </Form.Item>
          </div>
        }
        mTableModal={
          <div>
            <Form.Item name="householdId" label="Hộ dân">
              <Select>
                {props.adminReducer.households.length > 0 &&
                  props.adminReducer.households.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="genusFeatureId" label="Loại cây">
              <Select>
                {props.adminReducer.genusFeatures.length > 0 &&
                  props.adminReducer.genusFeatures.map(i => (
                    <Option key={i.id} value={i.id}>
                      {i.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="root" label="Số gốc cây">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="age" label="Thời gian trồng">
              <DatePicker />
            </Form.Item>
          </div>
        }
      />
    </div>
  );
}

Plant.propTypes = {
  adminReducer: PropTypes.any,
  getPlants: PropTypes.func,
  createPlant: PropTypes.func,
  updatePlant: PropTypes.func,
  deletePlant: PropTypes.func,
  getHouseholds: PropTypes.func,
  getGenusFeatures: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getPlants: data => {
    dispatch(action.getPlants(data));
  },
  createPlant: data => {
    dispatch(action.createPlant(data));
  },
  updatePlant: data => {
    dispatch(action.updatePlant(data));
  },
  deletePlant: data => {
    dispatch(action.deletePlant(data));
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
  getHouseholds: data => {
    dispatch(action.getHouseholds(data));
  },
  getGenusFeatures: data => {
    dispatch(action.getGenusFeatures(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Plant);