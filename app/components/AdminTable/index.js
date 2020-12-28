/**
 *
 * AdminTable
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Input, Button, Modal, Form } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import MyBox from '../MyBox/index';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Search } = Input;

function AdminTable(props) {
  const [isVisible, setIsVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    let data = [];
    if (props.mInitialValues)
      data = {
        latitude: props.mInitialValues.lat,
        longitude: props.mInitialValues.lng,
      };
    form.setFieldsValue(data);
  }, [form, props.mInitialValues]);

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreate = () => {
    form.validateFields().then(values => {
      const check = props.mCreate(values);
      if (check === 0) showModal();
    });
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '30px', margin: '10px 0 10px 0' }}>
          {props.mTitle}
        </p>
        <MyBox>
          <Row>
            <Col span={4} />
            <Col span={16}>
              <Search placeholder="Nhập ký tự cần tìm" />
            </Col>
            <Col span={4}>
              {props.mCreate && (
                <Button type="primary" onClick={showModal}>
                  Tạo mới
                </Button>
              )}
            </Col>
          </Row>
        </MyBox>
      </div>
      <div style={{ clear: 'both', height: '10px' }} />
      <MyBox>{props.mTable}</MyBox>
      <Modal
        title="Thêm mới"
        centered
        visible={isVisible}
        onCancel={showModal}
        onOk={handleCreate}
        okText="Thêm"
        cancelText="Hủy"
        width={props.mWidth && props.mWidth}
      >
        <Form form={form} {...layout}>
          {props.mModal}
        </Form>
      </Modal>
    </div>
  );
}

AdminTable.propTypes = {
  mTitle: PropTypes.string,
  mCreate: PropTypes.func,
  mModal: PropTypes.any,
  mTable: PropTypes.any,
  mInitialValues: PropTypes.any,
  mWidth: PropTypes.number,
};

export default memo(AdminTable);
