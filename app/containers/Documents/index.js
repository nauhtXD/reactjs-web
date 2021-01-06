import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Input, Table, Modal, Form } from 'antd';
import moment from 'moment';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as action from './actions';
import * as hAction from '../Home/actions';
import makeSelectHome from '../Home/selectors';

// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';
import { CenterDiv, layout, DownloadIcon } from '../../components/Style/index';

const { Column } = Table;
const { Search } = Input;

const dateFormat = 'DD/MM/YYYY';

export function Documents(props) {
  useInjectReducer({ key: 'documents', reducer });
  useInjectSaga({ key: 'documents', saga });

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [defValue, setDefValue] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    props.getContacts();
    props.getCategories();
    props.getSubCategories();
    props.getDocuments();
  }, []);

  useEffect(() => {
    setDataSource(props.documentsReducer.documents);
  }, [props.documentsReducer.documents]);

  useEffect(() => {
    form.setFieldsValue(defValue);
  }, [form, defValue]);

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleDownload = () => {};

  const handleClick = record => {
    const data = record;
    data.publishAt = moment(record.publishAt).format(dateFormat);
    setDefValue(data);
  };

  const propertyNames = [
    {
      title: 'STT',
      data: 'id',
    },
    {
      title: 'Số ký hiệu',
      data: 'code',
    },
    {
      title: 'Ngày ban hành',
      data: 'publishAt',
    },
    {
      title: 'Cơ quan ban hành',
      data: ['organization', 'name'],
    },
    {
      title: 'Trích yếu',
      data: 'summary',
    },
  ];

  const handleSearch = (entry, currValue) =>
    entry.id.toString().includes(currValue) ||
    entry.code.toLowerCase().includes(currValue) ||
    entry.organization.name.toLowerCase().includes(currValue) ||
    entry.summary.toLowerCase().includes(currValue);

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
                    <CenterDiv>
                      <Search
                        placeholder="Nhập kí tự cần tìm"
                        style={{ width: '70%' }}
                        value={searchValue}
                        onChange={e => {
                          const currValue = e.target.value;
                          setSearchValue(currValue);
                          const filteredData = props.documentsReducer.documents.filter(
                            entry =>
                              handleSearch(entry, currValue.toLowerCase()),
                          );
                          setDataSource(filteredData);
                        }}
                      />
                    </CenterDiv>
                    <Table rowKey="id" dataSource={dataSource}>
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
                          <DownloadIcon onClick={() => handleClick(record)} />
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
        <Modal
          title="Chi tiết"
          centered
          visible={isVisible}
          onCancel={showModal}
          onOk={handleDownload}
          okText="Tải về"
          cancelText="Đóng"
        >
          <Form form={form} {...layout}>
            <Form.Item label="Số kí hiệu" name="code">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Ngày ban hành" name="publishAt">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Trích yếu" name="summary">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Loại" name="documentType.name">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Cơ quan ban hành" name="organization.name">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Lĩnh vực" name="field.name">
              <Input readOnly />
            </Form.Item>
          </Form>
        </Modal>
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
  getDocuments: PropTypes.func,
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
  getDocuments: data => {
    dispatch(action.getDocuments(data));
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
