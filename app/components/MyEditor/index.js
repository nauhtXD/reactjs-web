/**
 *
 * MyEditor
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Mrq = styled(ReactQuill)`
  .ql-container {
    height: 80% !important;
    cursor: auto !important;
  }
`;
let k = -1;
function MyEditor(props) {
  const [eValue, setEValue] = useState(props.value);

  useEffect(() => {
    setEValue(props.value);
  }, [props.value]);

  const handleChange = e => {
    if (k === -1) k = 0;
    setEValue(e);
  };

  const handlePress = () => {
    props.mChange(eValue);
  };

  return (
    <Mrq
      theme="snow"
      modules={MyEditor.modules}
      formats={MyEditor.formats}
      style={{ height: props.mHeight, width: props.mWidth }}
      value={k === -1 ? props.value : eValue}
      onKeyUp={handlePress}
      onChange={handleChange}
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
  mChange: PropTypes.func,
};

export default memo(MyEditor);
