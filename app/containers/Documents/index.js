import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Form, Input, Select, DatePicker } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDocuments from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

export function Documents() {
  useInjectReducer({ key: 'documents', reducer });
  useInjectSaga({ key: 'documents', saga });

  return (
    <div>
      <Helmet>
        <title>Documents</title>
        <meta name="description" content="Description of Documents" />
      </Helmet>
      <div>
        <MyLayout
          mCont={
            <div>
              <TitleCom
                mCategory="Văn bản hội"
                mCont={
                  <div>
                    <Form {...layout}>
                      <Form.Item label="Số kí hiệu" name="numbercode">
                        <Input placeholder="Số kí hiệu" />
                      </Form.Item>
                      <Form.Item label="Trích yếu" name="">
                        <Input placeholder="Trích yếu" />
                      </Form.Item>
                      <Form.Item label="Ngày ban hành" name="daysubmit">
                        <RangePicker />
                      </Form.Item>
                      <Form.Item label="Loại" name="category">
                        <Select defaultValue="1">
                          <Option value="1">1</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Cơ quan ban hành" name="authority">
                        <Select defaultValue="1">
                          <Option value="1">1</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="Lĩnh vực" name="field">
                        <Select defaultValue="1">
                          <Option value="1">1</Option>
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                }
              />
            </div>
          }
        />
      </div>
    </div>
  );
}

Documents.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  documents: makeSelectDocuments(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Documents);
