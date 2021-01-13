/**
 *
 * ImgCom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Image, Row, Col } from 'antd';

import { MyLink, ContentDiv } from '../Style/index';

function ImgCom(props) {
  const myStyle = props.mStyle;
  const myImg = [
    <Image
      width={props.mWidth}
      src={props.mSrc}
      style={{ display: 'block', margin: '0.2vw auto', width: '90%' }}
    />,
  ];
  const imgCol = [<Col span={10}>{myImg}</Col>];
  const contentCol = [
    <Col span={14}>
      <MyLink href={props.mLink} style={{ fontSize: '1.3vw' }}>
        <b>{props.mTitle}</b>
      </MyLink>
      <p style={{ fontSize: '1vw', opacity: 0.6 }}>{props.mDay}</p>
      {props.mContent && (
        <ContentDiv
          style={{
            WebkitLineClamp: 4,
            fontSize: '1.14vw',
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: props.mContent,
          }}
        />
      )}
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
