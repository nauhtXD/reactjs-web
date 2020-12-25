/**
 *
 * Sidebar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Modal, Button, Form, Input, Carousel } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import TitleCom from '../TitleCom/Loadable';
import WeatherWidget from '../WeatherWidget/Loadable';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { TextArea } = Input;

function Sidebar(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsVisible(!isVisible);
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
      <TitleCom
        mCategory="Văn bản hội"
        mCont={
          <div>
            <ul>
              <li>
                <a href=".">Văn bản 1</a>
              </li>
              <li>
                <a href=".">Văn bản 2</a>
              </li>
              <li>
                <a href=".">Văn bản 3</a>
              </li>
            </ul>
          </div>
        }
      />
      <TitleCom
        mCategory="Báo cáo sự cố"
        mCont={
          <div>
            <Button type="primary" onClick={showModal}>
              Báo cáo
            </Button>
          </div>
        }
      />
      <Modal
        title="Báo cáo"
        centered
        visible={isVisible}
        onCancel={showModal}
        onOk={props.mCreateReport}
        okText="Gửi"
        cancelText="Hủy"
      >
        <Form form={form} {...layout}>
          <Form.Item label="Tiêu đề" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

Sidebar.propTypes = {
  mCreateReport: PropTypes.func,
  mWeathers: PropTypes.any,
};

export default memo(Sidebar);
