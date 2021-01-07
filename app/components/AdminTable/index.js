/**
 *
 * AdminTable
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Input, Form } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import MyTable from '../MyTable/index';
import {
  layout,
  MyBox,
  MyAntdModal,
  MyButton,
  MyAntdForm,
} from '../Style/index';

let k = -1;

const { Search } = Input;

function AdminTable(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [dataSource, setDataSource] = useState(props.mData);

  const [form] = Form.useForm();

  useEffect(() => {
    setDataSource(props.mData);
    k = 0;
  }, [props.mData, k === -1]);

  useEffect(() => {
    form.setFieldsValue(props.mInitialValues);
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
              <Search
                placeholder="Nhập ký tự cần tìm"
                value={searchValue}
                onChange={e => {
                  const currValue = e.target.value;
                  setSearchValue(currValue);
                  const filteredData = props.mData.filter(entry =>
                    props.mSearch(entry, currValue.toLowerCase()),
                  );
                  setDataSource(filteredData);
                }}
              />
            </Col>
            <Col span={4}>
              {props.mCreate && (
                <MyButton onClick={showModal}>Tạo mới</MyButton>
              )}
            </Col>
          </Row>
        </MyBox>
      </div>
      <div style={{ clear: 'both', height: '10px' }} />
      <MyBox>
        <MyTable
          mData={dataSource}
          mPropertyNames={props.mPropertyNames}
          mDelete={props.mDelete}
          mUpdate={props.mUpdate}
          mModal={props.mTableModal}
          mWidth={props.mWidth}
        />
      </MyBox>
      <MyAntdModal
        title="Thêm mới"
        centered
        visible={isVisible}
        onCancel={showModal}
        onOk={handleCreate}
        okText="Thêm"
        cancelText="Hủy"
        width={props.mWidth && props.mWidth}
      >
        <MyAntdForm form={form} {...layout}>
          {props.mModal}
        </MyAntdForm>
      </MyAntdModal>
    </div>
  );
}

AdminTable.propTypes = {
  mTitle: PropTypes.string,
  mCreate: PropTypes.func,
  mModal: PropTypes.any,
  mInitialValues: PropTypes.any,
  mWidth: PropTypes.number,
  mData: PropTypes.array,
  mPropertyNames: PropTypes.array,
  mDelete: PropTypes.func,
  mUpdate: PropTypes.func,
  mTableModal: PropTypes.any,
  mSearch: PropTypes.any,
};

export default memo(AdminTable);
