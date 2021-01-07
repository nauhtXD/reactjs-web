/**
 *
 * ImgCom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Image, Row, Col } from 'antd';

import { MyLink } from '../Style/index';

function ImgCom(props) {
  const myStyle = props.mStyle;
  const myImg = [
    <Image
      width={props.mWidth}
      src={props.mSrc}
      style={{ display: 'block', margin: '2px auto', width: '50%' }}
    />,
  ];
  const imgCol = [<Col span={10}>{myImg}</Col>];
  const contentCol = [
    <Col span={14}>
      <MyLink href={props.mLink} style={{ fontSize: '17px' }}>
        <b>{props.mTitle}</b>
      </MyLink>
      <p style={{ fontSize: '13px', opacity: 0.6 }}>{props.mDay}</p>
      {props.mContent && <p style={{ fontSize: '15px' }}>{props.mContent}</p>}
    </Col>,
  ];

  return (
    <div>
      {myStyle === 'center' ? (
        <div style={{ textAlign: 'center' }}>
          {myImg}
          <MyLink href={props.mLink}>{props.mTitle}</MyLink>
          {props.mDay && <p style={{ opacity: 0.6 }}>{props.mDay}</p>}
          {props.mContent && <p>{props.mContent}</p>}
        </div>
      ) : (
        <div>
          {myStyle === 'left' ? (
            <Row>
              {imgCol}
              {contentCol}
            </Row>
          ) : (
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
