/**
 *
 * MyUpload
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'antd';
import { CloseSquareTwoTone } from '@ant-design/icons';
import Upload from 'react-file-reader';
import { PlusIcon } from '../Style/index';

const UploadDiv = styled.div`
  width: 50%;
  height: 100%;
  border: 2px dashed silver;
  text-align: center;
  padding: 18px 0 8px 0;
  :hover {
    border-color: #1890ff;
    cursor: pointer;
  }
`;

const CloseSpan = styled.span`
  position: absolute;
  top: -5px;
  right: 15px;
  z-index: 100;
  width: 50%;
  :hover {
    cursor: pointer;
  }
`;

function MyUpload(props) {
  const handleClick = () => {
    props.mSetNull();
  };
  const handleFiles = files => {
    if (files.fileList[0].name) {
      const data = { base64: files.base64, name: files.fileList[0].name };
      props.mUpload(data);
    }
  };
  return (
    <div>
      {props.value && props.value[0] ? (
        <div style={{ position: 'relative' }}>
          <CloseSpan onClick={handleClick}>
            <CloseSquareTwoTone twoToneColor="#ff6666" />
          </CloseSpan>
          <Image src={props.value} width="50%" />
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

MyUpload.propTypes = {
  value: PropTypes.any,
  mUpload: PropTypes.func,
  mSetNull: PropTypes.func,
};

export default memo(MyUpload);
