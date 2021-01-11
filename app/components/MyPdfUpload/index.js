/**
 *
 * MyPdfUpload
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Space } from 'antd';
import { CheckOutlined, RedoOutlined } from '@ant-design/icons';
import Upload from 'react-file-reader';
import { PlusIcon, primaryColor } from '../Style/index';

const UploadDiv = styled.div`
  width: 50%;
  height: 100%;
  border: 2px dashed silver;
  text-align: center;
  padding: 18px 0 8px 0;
  :hover {
    border-color: ${primaryColor};
    cursor: pointer;
  }
`;

function MyPdfUpload(props) {
  const handleClick = () => {
    props.mSetNull();
  };
  const handleFiles = files => {
    if (files.fileList[0].name) {
      const data = { base64: files.base64, name: files.fileList[0].name };
      props.mUpload(data);
    }
  };
  const handlePreview = () => {
    window.location.href = props.value;
  };
  return (
    <div>
      {props.value && props.value[0] ? (
        <div style={{ position: 'relative' }}>
          <Space>
            <CheckOutlined onClick={handlePreview} />
            <RedoOutlined onClick={handleClick} />
          </Space>

          <Input value={props.value} style={{ display: 'none' }} />
        </div>
      ) : (
        <UploadDiv>
          <Upload handleFiles={handleFiles} base64 multipleFiles={false}>
            <PlusIcon />
            <p>Upload</p>
          </Upload>
        </UploadDiv>
      )}
    </div>
  );
}

MyPdfUpload.propTypes = {
  value: PropTypes.any,
  mUpload: PropTypes.func,
  mSetNull: PropTypes.func,
};

export default memo(MyPdfUpload);
