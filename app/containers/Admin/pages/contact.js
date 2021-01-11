import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Form, Input, Select, Row, Col } from 'antd';
// import { OpenStreetMapProvider } from 'leaflet-geosearch';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import * as action from '../actions';

import AdminTable from '../../../components/AdminTable';
import MyMap from '../../../components/MyMap/index';

const { Option } = Select;

let k = -1;
const init = { provinceId: 79 };

export function Contact(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isReRender, setIsReRender] = useState(false);
  const [currPos, setCurrPos] = useState({ lat: 0, lng: 0 });
  const [defValue, setDefValue] = useState(init);
  const [center, setCenter] = useState({
    longitude: 106.666672,
    latitude: 10.83333,
  });

  useEffect(() => {
    props.getProvinces();
    props.getContacts();
  }, [isReRender]);

  useEffect(() => {
    props.getContacts();
    if (k === -1) k = 0;
  }, [isReRender]);

  useEffect(() => {
    props.getContacts();
  }, [isReRender]);

  useEffect(() => {
    if (currPos.lat)
      setDefValue({
        ...defValue,
        longitude: currPos.lng,
        latitude: currPos.lat,
      });
  }, [currPos]);

  useEffect(() => {
    if (props.adminReducer.center.latitude) {
      setCenter({
        latitude: props.adminReducer.center.latitude,
        longitude: props.adminReducer.center.longitude,
      });
    }
  }, [props.adminReducer.center]);

  const handleCreate = record => {
    props.createContact(record);
    setIsReRender(!isReRender);
    return 0;
  };

  const handleClick = (record, key) => {
    if (key === 0) props.updateContact(record);
    else props.deleteContact(record);
    setIsReRender(!isReRender);
  };

  const handleCenter = value => {
    props.getCenter(value);
  };

  const handlePos = value => {
    setCurrPos({
      lat: value.lat,
      lng: value.lng,
    });
  };

  const handleSearch = (entry, currValue) =>
    entry.name.toLowerCase().includes(currValue) ||
    entry.address.toLowerCase().includes(currValue) ||
    entry.email.toLowerCase().includes(currValue) ||
    entry.province.provinceName.toLowerCase().includes(currValue);

  const propertyNames = [
    {
      title: 'Tên',
      data: 'name',
    },
    {
      title: 'Địa chỉ',
      data: 'address',
    },
    {
      title: 'Email',
      data: 'email',
    },
    {
      title: 'Tỉnh/TP',
      data: ['province', 'provinceName'],
    },
  ];

  const mModal = [
    <div>
      <Row gutter={16}>
        <Col span={14}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên hội quán!' }]}
          >
            <Input />
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
          <Form.Item label="Fax" name="fax">
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa chỉ hội quán!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tỉnh/TP" name="provinceId">
            <Select onSelect={handleCenter}>
              {props.adminReducer.provinces &&
                props.adminReducer.provinces.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.provinceName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item key="longitude" label="Kinh độ" name="longitude">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item key="latitude" label="Vĩ độ" name="latitude">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Form.Item name="map">
            <MyMap mCenter={center} mPos={handlePos} />
          </Form.Item>
        </Col>
      </Row>
    </div>,
  ];

  return (
    <div>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Description of Contact" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách liên hệ"
        mCreate={handleCreate}
        mModal={mModal}
        mData={props.adminReducer.contacts}
        mPropertyNames={propertyNames}
        mDelete={handleClick}
        mUpdate={handleClick}
        mTableModal={mModal}
        mSearch={handleSearch}
        mInitialValues={defValue}
        mWidth={1000}
        mCheckMap
      />
    </div>
  );
}

Contact.propTypes = {
  adminReducer: PropTypes.any,
  getProvinces: PropTypes.func,
  getContacts: PropTypes.func,
  createContact: PropTypes.func,
  updateContact: PropTypes.func,
  deleteContact: PropTypes.func,
  getCenter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getProvinces: data => {
    dispatch(action.getProvinces(data));
  },
  getContacts: data => {
    dispatch(action.getContacts(data));
  },
  createContact: data => {
    dispatch(action.createContact(data));
  },
  updateContact: data => {
    dispatch(action.updateContact(data));
  },
  deleteContact: data => {
    dispatch(action.deleteContact(data));
  },
  getCenter: data => {
    dispatch(action.getCenter(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Contact);
