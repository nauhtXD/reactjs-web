/**
 *
 * CommentForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Input } from 'antd';
import { MyAntdForm, MyButton } from '../Style/index';

function CommentForm(props) {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(values => {
      props.mCreateComment(values);
      form.setFieldsValue({ content: '' });
    });
  };
  return (
    <MyAntdForm form={form}>
      <Form.Item
        name="content"
        style={{ marginBottom: '0.379vw' }}
        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
      >
        <Input.TextArea
          placeholder="Để lại bình luận"
          style={{ fontSize: '1.14vw' }}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: '0.379vw' }}>
        <MyButton style={{ float: 'right' }} onClick={handleSubmit}>
          Bình luận
        </MyButton>
      </Form.Item>
    </MyAntdForm>
  );
}

CommentForm.propTypes = {
  mCreateComment: PropTypes.func,
};

export default memo(CommentForm);
