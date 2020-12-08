/**
 *
 * TitleCom
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const OSDiv = styled(Card)`
  margin-bottom: 10px !important;
  .ant-card-head {
    color: #22b14c !important;
    background-color: #deffc0 !important;
  }
`;

function TitleCom(props) {
  return (
    <OSDiv title={props.mCategory}>
      {props.mCont}
      {props.mLink && (
        <div style={{ textAlign: 'right' }}>
          <a href={props.mLink}>Xem thêm</a>
        </div>
      )}
    </OSDiv>
  );
}

TitleCom.propTypes = {
  mCategory: PropTypes.string,
  mCont: PropTypes.any,
  mLink: PropTypes.string,
};

export default memo(TitleCom);
