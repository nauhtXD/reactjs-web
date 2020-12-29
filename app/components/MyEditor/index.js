/**
 *
 * MyEditor
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Mrq = styled(ReactQuill)`
  .ql-container {
    height: 90% !important;
  }
`;

function MyEditor(props) {
  return (
    <Mrq
      theme="snow"
      modules={MyEditor.modules}
      formats={MyEditor.formats}
      bounds=".app"
      style={{ height: props.mHeight, width: props.mWidth }}
      value={props.value}
    />
  );
}

MyEditor.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

MyEditor.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

MyEditor.propTypes = {
  mHeight: PropTypes.string,
  mWidth: PropTypes.string,
  value: PropTypes.any,
};

export default memo(MyEditor);
