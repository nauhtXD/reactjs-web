/**
 *
 * ListImgCom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Row, Col, Image, Button } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ListImgCom(props) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <Row>
        <Col span={14}>
          <Image
            width={props.mWidth}
            src={props.mSrc}
            style={{ display: 'block', margin: '2px auto', width: '50%' }}
          />
        </Col>
        <Col span={10}>
          <a href={props.mLink}>{props.mTitle}</a>
          {props.mContent && <p>{props.mContent}</p>}
          <Button type="primary">Xem chi tiết</Button>
          <p>{props.mDay}</p>
        </Col>
      </Row>
    </div>
  );
}

ListImgCom.propTypes = {
  mWidth: PropTypes.string,
  mSrc: PropTypes.string,
  mLink: PropTypes.string,
  mTitle: PropTypes.string,
  mDay: PropTypes.string,
  mContent: PropTypes.string,
};

export default memo(ListImgCom);
