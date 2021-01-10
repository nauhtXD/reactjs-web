import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
import { Input, Table, Form } from 'antd';
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
import {
  CenterDiv,
  layout,
  DownloadIcon,
  MyLink,
  MyAntdTable,
  MyAntdModal,
  MyAntdSearch,
  MyAntdForm,
  API_KEY,
} from '../../components/Style/index';

const { Column } = Table;

const dateFormat = 'DD/MM/YYYY';

export function Documents(props) {
  useInjectReducer({ key: 'documents', reducer });
  useInjectSaga({ key: 'documents', saga });

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [defValue, setDefValue] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [usrName, setUsrName] = useState(null);

  useEffect(() => {
    props.getContacts();
    props.getCategories();
    props.getSubCategories();
    props.getDocuments();
    props.getCityList();
    props.getLastestDocuments(4);
  }, []);

  useEffect(() => {
    const dataList = props.homeReducer.cityList.map(i => i.province.weatherId);
    if (dataList.length > 0)
      props.getWeathers({
        data: [...new Set(dataList)],
        key: API_KEY,
      });
  }, [props.homeReducer.cityList]);

  useEffect(() => {
    setDataSource(props.documentsReducer.documents);
  }, [props.documentsReducer.documents]);

  useEffect(() => {
    form.setFieldsValue(defValue);
  }, [form, defValue]);

  useEffect(() => {
    if (props.homeReducer.loginToken.token) {
      localStorage.setItem('authToken', props.homeReducer.loginToken.token);
      localStorage.setItem('usrId', props.homeReducer.loginToken.uid);
      localStorage.setItem('usrName', usrName);
      window.location.reload();
    }
  }, [props.homeReducer.loginToken]);

  const handleLogin = values => {
    setUsrName(values.username);
    props.getLoginToken(values);
  };

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleDownload = () => {
    window.location.href = defValue.file;
  };

  const handleClick = record => {
    const data = {
      ...record,
      contactName: record.contact.name,
      documentTypeName: record.documentType.name,
      fieldName: record.field.name,
      publishAt: moment(record.publishAt).format(dateFormat),
    };
    setDefValue(data);
    showModal();
  };

  const propertyNames = [
    {
      title: 'STT',
      data: 'id',
    },
    {
      title: 'Ngày ban hành',
      data: 'publishAt',
      render: record => moment(record).format(dateFormat),
    },
    {
      title: 'Cơ quan ban hành',
      data: ['contact', 'name'],
    },
    {
      title: 'Trích yếu',
      data: 'summary',
      render: (record, rowData) => (
        <MyLink onClick={() => handleClick(rowData)}>{record}</MyLink>
      ),
    },
  ];

  const handleSearch = (entry, currValue) =>
    entry.id.toString().includes(currValue) ||
    entry.code.toLowerCase().includes(currValue) ||
    entry.contact.name.toLowerCase().includes(currValue) ||
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
                      <MyAntdSearch
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
                    <MyAntdTable
                      rowKey="id"
                      dataSource={dataSource}
                      pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20'],
                      }}
                    >
                      {propertyNames.map(i => (
                        <Column
                          align="left"
                          title={i.title}
                          dataIndex={i.data}
                          key={i.data}
                          render={i.render && i.render}
                        />
                      ))}
                    </MyAntdTable>
                  </div>
                }
              />
            </div>
          }
          mCategories={props.homeReducer.categories}
          mSubCategories={props.homeReducer.subCategories}
          mContacts={props.homeReducer.contacts}
          mCreateReport={props.createProblem}
          mDocuments={props.homeReducer.lastestDocuments}
          mWeathers={props.homeReducer.weathers}
          mLogin={handleLogin}
        />
        <MyAntdModal
          title="Chi tiết"
          centered
          visible={isVisible}
          onCancel={showModal}
          footer={null}
        >
          <MyAntdForm form={form} {...layout}>
            <Form.Item label="Số kí hiệu" name="code">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Ngày ban hành" name="publishAt">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Trích yếu" name="summary">
              <Input.TextArea readOnly />
            </Form.Item>
            <Form.Item label="Loại" name="documentTypeName">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Cơ quan ban hành" name="contactName">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Lĩnh vực" name="fieldName">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Tải về" name="file">
              <DownloadIcon onClick={handleDownload} />
            </Form.Item>
          </MyAntdForm>
        </MyAntdModal>
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
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getWeathers: PropTypes.func,
  getCityList: PropTypes.func,
  getLoginToken: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  documentsReducer: makeSelect(),
  homeReducer: makeSelectHome(),
});

const mapDispatchToProps = dispatch => ({
  getLoginToken: data => {
    dispatch(hAction.getLoginToken(data));
  },
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
  },
  getCityList: data => {
    dispatch(hAction.getCityList(data));
  },
  getWeathers: data => {
    dispatch(hAction.getWeathers(data));
  },
  createProblem: data => {
    dispatch(hAction.createProblem(data));
  },
  getLastestDocuments: data => {
    dispatch(hAction.getLastestDocuments(data));
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
