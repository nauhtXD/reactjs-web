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
  margin-bottom: 0.76vw !important;
  .ant-card-head {
    color: ${fgColor} !important;
    background-color: ${bgColor} !important;
    font-size: 1.213vw;
    min-height: 3.62vw;
  }
  .ant-card-head-title {
    padding: 1.213vw 0;
  }
  .ant-card-body {
    line-height: 0.22vw;
    padding: 1.81956vw !important;
  }
`;

const OSDivNoPadding = styled(Card)`
  .ant-card-head,
  .ant-card-head a {
    color: ${fgColor} !important;
    background-color: ${bgColor} !important;
    font-size: 1.213vw;
    min-height: 3.62vw;
  }
  .ant-card-head a {
    text-decoration: underline !important;
  }
  .ant-card-body {
    padding: 0.76vw 0 0 0 !important;
    line-height: 0.22vw;
  }
  .ant-card-head-title {
    padding: 1.213vw 0;
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
