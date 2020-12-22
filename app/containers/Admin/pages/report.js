import React, { memo } from 'react';
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

import MyTable from '../../../components/MyTable/index';
import AdminTable from '../../../components/AdminTable/Loadable';
import makeSelect from '../selectors';
import * as action from '../actions';

const { Option } = Select;

export function Report() {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  return (
    <div>
      <Helmet>
        <title>Report</title>
        <meta name="description" content="Description of Report" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách sự cố"
        mTable={
          <MyTable
            mPropertyNames={propertyNames}
            mDelete={handleClick}
            mUpdate={handleClick}
            mModal={
              <div>
                <Form.Item label="Tiêu đề" name="title">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Người gửi" name="userId">
                  <Input />
                </Form.Item>
                <Form.Item label="Trạng thái" name="status">
                  <Select>
                    <Option />
                  </Select>
                </Form.Item>
              </div>
            }
          />
        }
      />
    </div>
  );
}

Report.propTypes = {
  adminReducer: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Report);
