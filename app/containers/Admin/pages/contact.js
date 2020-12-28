import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Form, Input, Select, Row, Col } from 'antd';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import * as action from '../actions';

import AdminTable from '../../../components/AdminTable';
import MyTable from '../../../components/MyTable';

const { Option } = Select;

const mZoom = 10;

let k = -1;

export function Contact(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [currCenter, setCurrCenter] = useState([10.83333, 106.666672]);
  const [currPos, setCurrPos] = useState(null);
  console.log(currCenter);
  useEffect(() => {
    props.getProvinces();
  }, []);

  useEffect(() => {
    if (k !== -1)
      setCurrCenter([
        props.adminReducer.center.latitude,
        props.adminReducer.center.longitude,
      ]);
  }, [props.adminReducer.center]);

  const handleCreate = record => {
    console.log(record);
  };

  const handleClick = e => {
    setCurrPos(e.latlng);
  };

  const handleSelect = value => {
    props.getCenter(value);
    if (k === -1) k = 0;
  };

  return (
    <div>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Description of Contact" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách liên hệ"
        mCreate={handleCreate}
        mModal={
          <div>
            <Row gutter={16}>
              <Col span={14}>
                <Form.Item
                  label="Tên"
                  name="name"
                  rules={[
                    { required: true, message: 'Vui lòng nhập tên hội quán!' },
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
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Tỉnh/TP" name="provinceId">
                  <Select onSelect={handleSelect} defaultValue={79}>
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
                    <Form.Item label="Kinh độ" name="longitude">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Vĩ độ" name="latitude">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <Map
                  style={{
                    height: '310px',
                    width: '100%',
                  }}
                  zoom={mZoom}
                  center={currCenter}
                  onclick={handleClick}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {currPos && <Marker position={currPos} />}
                </Map>
              </Col>
            </Row>
          </div>
        }
        mWidth={1000}
        mInitialValues={currPos && currPos}
      />
    </div>
  );
}

Contact.propTypes = {
  adminReducer: PropTypes.any,
  getProvinces: PropTypes.func,
  getCenter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getProvinces: data => {
    dispatch(action.getProvinces(data));
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
