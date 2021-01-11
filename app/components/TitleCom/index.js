/**
 *
 * TitleCom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';

import { MyLink } from '../Style/index';

const fgColor = '#325700';
const bgColor = '#e4f1d2';

const OSDiv = styled(Card)`
  margin-bottom: 10px !important;
  line-height: 1;
  .ant-card-head {
    color: ${fgColor} !important;
    background-color: ${bgColor} !important;
  }
`;

const OSDivNoPadding = styled(Card)`
  line-height: 1;
  .ant-card-head,
  .ant-card-head a {
    color: ${fgColor} !important;
    background-color: ${bgColor} !important;
  }
  .ant-card-head a {
    text-decoration: underline !important;
  }
  .ant-card-body {
    padding: 10px 0 0 0 !important;
  }
`;

function TitleCom(props) {
  return (
    <div>
      {!props.mCheck ? (
        <OSDiv
          title={props.mCategory}
          extra={props.mLink && <MyLink href={props.mLink}>Xem thêm</MyLink>}
        >
          {props.mCont}
        </OSDiv>
      ) : (
        <OSDivNoPadding
          title={props.mCategory}
          extra={props.mLink && <MyLink href={props.mLink}>Xem thêm</MyLink>}
        >
          {props.mCont}
        </OSDivNoPadding>
      )}
    </div>
  );
}

TitleCom.propTypes = {
  mCategory: PropTypes.string,
  mCont: PropTypes.any,
  mLink: PropTypes.string,
  mCheck: PropTypes.bool,
};

export default memo(TitleCom);
