/**
 *
 * MyTable
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Table, Space, Button, Form } from 'antd';
import moment from 'moment';
import {
  CheckIcon,
  CloseIcon,
  layout,
  MyButton,
  MyAntdModal,
  MyAntdTable,
  MyAntdForm,
  primaryColor,
} from '../Style/index';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const { Column } = Table;

const green = primaryColor;
const red = '#ff4c4c';

function MyTable(props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [defValue, setDefValue] = useState([]);
  const [recordValue, setRecordValue] = useState([]);

  useEffect(() => {
    let data = defValue;
    if (data.province) {
      data = {
        ...defValue,
        map: {
          lat: defValue.latitude,
          lng: defValue.longitude,
          center: [defValue.province.latitude, defValue.province.longitude],
        },
      };
    }
    form.setFieldsValue(data);
  }, [form, defValue]);

  useEffect(() => {
    setDefValue({ ...defValue, img: props.mPreview });
  }, [props.mPreview]);

  useEffect(() => {
    setDefValue({ ...defValue, file: props.mPreviewFile });
  }, [props.mPreviewFile]);

  useEffect(() => {
    if (props.mMap && props.mMap.lat)
      setDefValue({
        ...defValue,
        latitude: props.mMap.lat,
        longitude: props.mMap.lng,
        map: props.mMap,
      });
  }, [props.mMap]);

  const [form] = Form.useForm();

  const confirm = id => {
    MyAntdModal.confirm({
      title: 'Xóa',
      content: 'Bạn vẫn chắc chắn muốn xóa?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk() {
        props.mDelete(id, 1);
      },
    });
  };

  const handleClick = (record, key) => {
    const input = record;
    if (record.publishAt) {
      input.publishAt = moment(record.publishAt);
    }
    setRecordValue(input);
    if (key === 0) {
      setDefValue(input);
      setIsUpdate(!isUpdate);
    } else {
      confirm(input.id);
    }
  };

  const handleCancle = () => {
    setIsUpdate(!isUpdate);
  };

  const handleUpdate = () => {
    form.validateFields().then(values => {
      const input = { ...values, id: recordValue.id };
      props.mUpdate(input, 0);
      handleCancle();
    });
  };

  return (
    <div>
      <MyAntdTable
        dataSource={props.mData}
        rowKey="id"
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
        }}
      >
        {props.mPropertyNames.map(i =>
          i.data !== 'status' ? (
            <Column
              align="center"
              title={i.title}
              dataIndex={i.data}
              key={i.data}
              render={i.render && i.render}
            />
          ) : (
            <Column
              align="center"
              title={i.title}
              dataIndex={i.data}
              key={i.data}
              render={record =>
                record ? (
                  <CheckIcon twoToneColor={green} />
                ) : (
                  <CloseIcon twoToneColor={red} />
                )
              }
            />
          ),
        )}
        {(props.mUpdate || props.mDelete) && (
          <Column
            key="action"
            render={record => (
              <Space>
                {props.mUpdate && (
                  <MyButton onClick={() => handleClick(record, 0)}>
                    Chỉnh sửa
                  </MyButton>
                )}
                {props.mDelete && (
                  <Button type="danger" onClick={() => handleClick(record, 1)}>
                    Xóa
                  </Button>
                )}
              </Space>
            )}
          />
        )}
      </MyAntdTable>
      <MyAntdModal
        title="Chỉnh sửa"
        centered
        visible={isUpdate}
        onCancel={handleCancle}
        onOk={handleUpdate}
        okText="Cập nhật"
        cancelText="Hủy"
        width={props.mWidth}
      >
        <MyAntdForm form={form} {...layout}>
          {props.mModal}
        </MyAntdForm>
      </MyAntdModal>
    </div>
  );
}

MyTable.propTypes = {
  mData: PropTypes.array,
  mPropertyNames: PropTypes.array,
  mModal: PropTypes.any,
  mUpdate: PropTypes.func,
  mDelete: PropTypes.func,
  mWidth: PropTypes.number,
  mPreview: PropTypes.any,
  mPreviewFile: PropTypes.any,
  mMap: PropTypes.any,
};

export default memo(MyTable);
