/**
 *
 * TempCom
 *
 */

import React, { memo } from 'react';
import Control from 'react-leaflet-control';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const ScaleDetails = styled.div`
  width: 360px;
  height: 20pt;
  background-color: #fff;
  color: #48484a;
  padding: 2pt 4pt;
  border-radius: 4pt;
  align-items: center;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
`;
const ScaleGradient = styled.div`
  flex-direction: column;
`;
const ScaleDividers = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
`;
const HorizontalGradientLine = styled.div`
  border-radius: 4pt;
  height: 4px;
  opacity: 0.9;
  width: 260px;
  border-left: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`;

function TempCom() {
  return (
    <div>
      <Control position="bottomright">
        <ScaleDetails>
          <div>Nhiệt độ, °C</div>
          <ScaleGradient>
            <ScaleDividers>
              <div>-40</div>
              <div>-20</div>
              <div>0</div>
              <div>20</div>
              <div>40</div>
            </ScaleDividers>
            <HorizontalGradientLine
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgb(159, 85, 181) 0%, rgb(44, 106, 187) 8.75%, rgb(82, 139, 213) 12.5%, rgb(103, 163, 222) 18.75%, rgb(142, 202, 240) 25%, rgb(155, 213, 244) 31.25%, rgb(172, 225, 253) 37.5%, rgb(194, 234, 255) 43.75%, rgb(255, 255, 208) 50%, rgb(254, 248, 174) 56.25%, rgb(254, 232, 146) 62.5%, rgb(254, 226, 112) 68.75%, rgb(253, 212, 97) 75%, rgb(244, 168, 94) 82.5%, rgb(244, 129, 89) 87.5%, rgb(244, 104, 89) 93.75%, rgb(244, 76, 73) 100%)',
              }}
            />
          </ScaleGradient>
        </ScaleDetails>
      </Control>
    </div>
  );
}

TempCom.propTypes = {};

export default memo(TempCom);
