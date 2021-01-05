import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Form, Input, Select, DatePicker, Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
// import * as action from './actions';
import * as hAction from '../Home/actions';
import makeSelectHome from '../Home/selectors';

// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Column } = Table;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function Documents(props) {
  useInjectReducer({ key: 'documents', reducer });
  useInjectSaga({ key: 'documents', saga });

  useEffect(() => {
    props.getContacts();
    props.getCategories();
    props.getSubCategories();
  }, []);

  const propertyNames = [
    {
      title: 'STT',
      data: 'id',
    },
    {
      title: 'Số ký hiệu',
      data: '',
    },
    {
      title: 'Ngày ban hành',
      data: '',
    },
    {
      title: 'Cơ quan ban hành',
      data: '',
    },
    {
      title: 'Trích yếu',
      data: '',
    },
  ];

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
                  <div style={{ margin: 'auto' }}>
                    <Form {...layout}>
                      <Form.Item label="Số kí hiệu" name="code">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Trích yếu" name="summary">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Ngày ban hành" name="publishAt">
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
                      <Form.Item {...tailLayout}>
                        <Button type="primary">Tìm</Button>
                      </Form.Item>
                    </Form>
                    <Table rowKey="id">
                      {propertyNames.map(i => (
                        <Column
                          align="center"
                          title={i.title}
                          dataIndex={i.data}
                          key={i.data}
                          render={i.render && i.render}
                        />
                      ))}
                      <Column
                        align="center"
                        title="Tải về"
                        dataIndex=""
                        key="action"
                        render={record => (
                          <DownloadOutlined
                            onClick={() => console.log(record)}
                          />
                        )}
                      />
                    </Table>
                  </div>
                }
              />
            </div>
          }
          mCategories={props.homeReducer.categories}
          mSubCategories={props.homeReducer.subCategories}
          mContacts={props.homeReducer.contacts}
        />
      </div>
    </div>
  );
}

Documents.propTypes = {
  homeReducer: PropTypes.any,
  documentsReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  documentsReducer: makeSelect(),
  homeReducer: makeSelectHome(),
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Documents);
