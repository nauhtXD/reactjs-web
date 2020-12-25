/**
 *
 * MyTable
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, Space, Button, Modal, Form } from 'antd';
import { CheckSquareTwoTone, CloseSquareTwoTone } from '@ant-design/icons';
import moment from 'moment';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const { Column } = Table;

const CheckIcon = styled(CheckSquareTwoTone)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

const CloseIcon = styled(CloseSquareTwoTone)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const green = '#52c41a';
const red = '#ff4c4c';

function MyTable(props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [defValue, setDefValue] = useState([]);
  const [recordValue, setRecordValue] = useState([]);

  useEffect(() => {
    form.setFieldsValue(defValue);
  }, [form, defValue]);

  const [form] = Form.useForm();

  const confirm = id => {
    Modal.confirm({
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
      <Table dataSource={props.mData} rowKey="id">
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
        <Column
          key="action"
          render={record => (
            <Space>
              <Button type="primary" onClick={() => handleClick(record, 0)}>
                Chỉnh sửa
              </Button>
              <Button type="danger" onClick={() => handleClick(record, 1)}>
                Xóa
              </Button>
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Chỉnh sửa"
        centered
        visible={isUpdate}
        onCancel={handleCancle}
        onOk={handleUpdate}
        okText="Cập nhật"
        cancelText="Hủy"
        width={props.mWidth}
      >
        <Form form={form} {...layout}>
          {props.mModal}
        </Form>
      </Modal>
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
};

export default memo(MyTable);
