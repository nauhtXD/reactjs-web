/**
 *
 * ImgCom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Image, Row, Col } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ImgCom(props) {
  const myStyle = props.mStyle;
  const myImg = [
    <Image
      width={props.mWidth}
      src={props.mSrc}
      style={{ display: 'block', margin: '2px auto', width: '50%' }}
    />,
  ];

  const imgCol = [<Col span={14}>{myImg}</Col>];
  const contentCol = [
    <Col span={10}>
      <a href={props.mLink}>{props.mTitle}</a>
      <p>{props.mDay}</p>
      <p>{props.mContent}</p>
    </Col>,
  ];

  return (
    <div>
      {myStyle === 'center' && (
        <div style={{ textAlign: 'center' }}>
          {myImg}
          <a href={props.mLink}>{props.mTitle}</a>
        </div>
      )}
      {myStyle !== 'center' && (
        <div style={{ marginBottom: '15px' }}>
          {myStyle === 'left' && (
            <Row>
              {imgCol}
              {contentCol}
            </Row>
          )}
          {myStyle === 'right' && (
            <Row>
              {contentCol}
              {imgCol}
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

ImgCom.propTypes = {
  mStyle: PropTypes.string,
  mWidth: PropTypes.string,
  mSrc: PropTypes.string,
  mLink: PropTypes.string,
  mTitle: PropTypes.string,
  mDay: PropTypes.string,
  mContent: PropTypes.string,
};

export default memo(ImgCom);
