/**
 *
 * Sidebar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Input, Carousel } from 'antd';

import TitleCom from '../TitleCom/Loadable';
import WeatherWidget from '../WeatherWidget/Loadable';
import {
  layout,
  MyLink,
  MyText,
  MyAntdModal,
  MyAntdForm,
} from '../Style/index';

const { TextArea } = Input;
const NewDiv = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
`;

function Sidebar(props) {
  const [isVisible, setIsVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCreate = () => {
    form.validateFields().then(values => {
      const data = {
        ...values,
        userId: JSON.parse(localStorage.getItem('usr')).id,
      };
      props.mCreateReport(data);
      showModal();
    });
  };

  return (
    <div>
      <Carousel autoplay>
        {props.mWeathers &&
          props.mWeathers.map(i => (
            <WeatherWidget
              key={i.weather[0].id}
              mName={i.name}
              mDescription={i.weather[0].description}
              mIcon={i.weather[0].icon}
              mTemp={i.main.temp}
            />
          ))}
      </Carousel>
      {props.mDocuments && (
        <TitleCom
          mCategory="Văn bản hội"
          mCont={
            <div style={{ height: '8.72vw', margin: 'auto 0.76vw' }}>
              {props.mDocuments.map(i => (
                <NewDiv key={i.id}>
                  <MyText>
                    {`•  `}
                    <MyLink href={i.file}>{i.summary}</MyLink>
                  </MyText>
                </NewDiv>
              ))}
            </div>
          }
          mCheck
        />
      )}
      <div style={{ height: '0.30326vw' }} />
      {localStorage.getItem('authToken') && (
        <TitleCom
          mCategory="Báo cáo sự cố"
          mCont={
            <div>
              <MyText>Bạn gặp sự cố?</MyText>
              <div style={{ height: '1.2vw' }} />
              <MyLink
                onClick={showModal}
                style={{ textDecoration: 'underline' }}
              >
                Báo cáo ngay
              </MyLink>
            </div>
          }
        />
      )}
      <MyAntdModal
        title="Báo cáo"
        centered
        visible={isVisible}
        onCancel={showModal}
        onOk={handleCreate}
        okText="Gửi"
        cancelText="Hủy"
        destroyOnClose
      >
        <MyAntdForm preserve={false} form={form} {...layout}>
          <Form.Item label="Tiêu đề" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <TextArea rows={4} />
          </Form.Item>
        </MyAntdForm>
      </MyAntdModal>
    </div>
  );
}

Sidebar.propTypes = {
  mCreateReport: PropTypes.func,
  mWeathers: PropTypes.any,
  mDocuments: PropTypes.any,
};

export default memo(Sidebar);
