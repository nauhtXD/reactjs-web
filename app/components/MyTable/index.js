/**
 *
 * MyTable
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, Space, Button, Modal, Form, Input, Select } from 'antd';
import { CheckSquareTwoTone, CloseSquareTwoTone } from '@ant-design/icons';

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

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const green = '#52c41a';
const red = '#ff4c4c';

function MyTable(props) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [form] = Form.useForm();

  const handleClick = (record, key) => {
    if (key === 0) setIsUpdate(true);
    else props.mDelete(record.id);
  };

  const handleCancle = () => {
    setIsUpdate(false);
  };

  const handleUpdate = record => {
    form.validateFields.then(values => {
      values.push({ id: record.id });
      console.log(values);
      // props.mUpdate(values);
    });
  };

  return (
    <div>
      <Table dataSource={props.mData} rowKey="id">
        {props.mPropertyNames.map(i =>
          i.data !== 'isActive' ? (
            <Column
              align="center"
              title={i.title}
              dataIndex={i.data}
              key={i.data}
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
        title="Chỉnh sửa thành viên"
        centered
        visible={isUpdate}
        onCancel={handleCancle}
        footer={null}
      >
        <Form form={form} {...layout}>
          {props.mPropertyNames.map(i => (
            <Form.Item label={i.title} name={i.data}>
              <Input />
            </Form.Item>
          ))}
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" onClick={handleUpdate}>
                Cập nhật
              </Button>
              <Button onClick={handleCancle}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

MyTable.propTypes = {
  mData: PropTypes.array,
  mPropertyNames: PropTypes.array,
  mUpdate: PropTypes.func,
  mDelete: PropTypes.func,
};

export default memo(MyTable);
