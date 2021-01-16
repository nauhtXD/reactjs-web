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
import moment from 'moment';

import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';

import AdminTable from '../../../components/AdminTable/Loadable';
import MyPdfUpload from '../../../components/MyPdfUpload/index';

const { Option } = Select;
const dateFormat = 'L';
let k = -1;
const init = {
  publishAt: moment(),
  documentTypeId: 1,
  contactId: 1,
  fieldId: 1,
};
export function Document(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  const [isRerender, setIsRerender] = useState(false);
  const [defValue, setDefValue] = useState(init);

  useEffect(() => {
    props.getDocuments();
    props.getFields();
    props.getDocumentTypes();
    props.getContacts();
  }, [isRerender]);

  useEffect(() => {
    props.getDocuments();
    if (k === -1) k = 0;
  }, [isRerender]);

  useEffect(() => {
    props.getDocuments();
  }, [isRerender]);

  useEffect(() => {
    setDefValue({ ...defValue, file: props.adminReducer.url });
  }, [props.adminReducer.url]);

  const setNullPreview = () => {
    setDefValue({ ...defValue, file: null });
  };

  const propertyNames = [
    {
      title: 'Số ký hiệu',
      data: 'code',
    },
    {
      title: 'Trích yếu',
      data: 'summary',
    },
    {
      title: 'Ngày ban hành',
      data: 'publishAt',
      render: record => moment(record).format(dateFormat),
    },
    {
      title: 'Loại văn bản',
      data: ['documentType', 'name'],
    },

    {
      title: 'Hội ban hành',
      data: ['contact', 'name'],
    },
    {
      title: 'Lĩnh vực',
      data: ['field', 'name'],
    },
  ];

  const handleClick = (record, key) => {
    if (key === 0) props.updateDocument(record);
    else props.deleteDocument(record);
    setIsRerender(!isRerender);
  };

  const handleCreate = record => {
    props.createDocument(record);
    setIsRerender(!isRerender);
    return 0;
  };

  const handleSearch = (entry, currValue) =>
    entry.field.name.toLowerCase().includes(currValue) ||
    entry.code.toLowerCase().includes(currValue) ||
    entry.summary.toLowerCase().includes(currValue) ||
    entry.documentType.name.toLowerCase().includes(currValue) ||
    entry.contact.name.toLowerCase().includes(currValue);

  const mModal = [
    <div>
      <Form.Item
        name="code"
        label="Số ký hiệu"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập số ký hiệu!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="summary"
        label="Trích yếu"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập trích yếu!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="publishAt" label="Ngày ban hành">
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item name="documentTypeId" label="Loại văn bản">
        <Select>
          {props.adminReducer.documentTypes.length > 0 &&
            props.adminReducer.documentTypes.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="contactId" label="Hội quán ban hành">
        <Select>
          {props.adminReducer.contacts.length > 0 &&
            props.adminReducer.contacts.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="fieldId" label="Lĩnh vực">
        <Select>
          {props.adminReducer.fields.length > 0 &&
            props.adminReducer.fields.map(i => (
              <Option key={i.id} value={i.id}>
                {i.name}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="file"
        label="File pdf"
        rules={[
          {
            required: true,
            message: 'Vui lòng upload file pdf!',
          },
        ]}
      >
        <MyPdfUpload mUpload={props.uploadPdf} mSetNull={setNullPreview} />
      </Form.Item>
    </div>,
  ];

  return (
    <div>
      <Helmet>
        <title>Document</title>
        <meta name="description" content="Description of Document" />
      </Helmet>
      <AdminTable
        mTitle="Danh sách văn bản hội"
        mData={props.adminReducer.documents}
        mPropertyNames={propertyNames}
        mDelete={handleClick}
        mUpdate={handleClick}
        mCreate={handleCreate}
        mSearch={handleSearch}
        mInitialValues={defValue}
        mCheckFile
        mModal={mModal}
        mTableModal={mModal}
      />
    </div>
  );
}

Document.propTypes = {
  adminReducer: PropTypes.any,
  getDocuments: PropTypes.func,
  createDocument: PropTypes.func,
  updateDocument: PropTypes.func,
  deleteDocument: PropTypes.func,
  getFields: PropTypes.func,
  getContacts: PropTypes.func,
  getDocumentTypes: PropTypes.func,
  uploadPdf: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getDocuments: data => {
    dispatch(action.getDocuments(data));
  },
  createDocument: data => {
    dispatch(action.createDocument(data));
  },
  updateDocument: data => {
    dispatch(action.updateDocument(data));
  },
  deleteDocument: data => {
    dispatch(action.deleteDocument(data));
  },
  getFields: data => {
    dispatch(action.getFields(data));
  },
  getContacts: data => {
    dispatch(action.getContacts(data));
  },
  getDocumentTypes: data => {
    dispatch(action.getDocumentTypes(data));
  },
  uploadPdf: data => {
    dispatch(action.uploadPdf(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Document);
