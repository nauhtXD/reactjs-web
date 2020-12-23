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

import MyTable from '../../../components/MyTable/index';
import AdminTable from '../../../components/AdminTable/Loadable';
import makeSelect from '../selectors';
import * as action from '../actions';

const { Option } = Select;
const { TextArea } = Input;

export function Report(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isReRender, setIsRerender] = useState(false);

  useEffect(() => {
    props.getStatuses();
    props.getProblems();
  }, [isReRender]);

  useEffect(() => {
    props.getProblems();
  }, [isReRender]);

  const propertyNames = [
    {
      title: 'Tiêu đề',
      data: 'title',
    },
    {
      title: 'Nội dung',
      data: 'content',
    },
    {
      title: 'Người gửi',
      data: ['user', 'username'],
    },
    {
      title: 'Trạng thái',
      data: ['status', 'name'],
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updateProblem(record);
    else props.deleteProblem(record);
    setIsRerender(!isReRender);
  };

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
            mData={props.adminReducer.problems}
            mPropertyNames={propertyNames}
            mDelete={handleClick}
            mUpdate={handleClick}
            mModal={
              <div>
                <Form.Item label="Tiêu đề" name="title">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                  <TextArea disabled />
                </Form.Item>
                <Form.Item label="Trạng thái" name="statusId">
                  <Select>
                    {props.adminReducer.statuses &&
                      props.adminReducer.statuses.length > 0 &&
                      props.adminReducer.statuses.map(i => (
                        <Option key={i.id} value={i.id}>
                          {i.name}
                        </Option>
                      ))}
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
  getStatuses: PropTypes.func,
  getProblems: PropTypes.func,
  updateProblem: PropTypes.func,
  deleteProblem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getStatuses: data => {
    dispatch(action.getStatuses(data));
  },
  getProblems: data => {
    dispatch(action.getProblems(data));
  },
  updateProblem: data => {
    dispatch(action.updateProblem(data));
  },
  deleteProblem: data => {
    dispatch(action.deleteProblem(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Report);
