/**
 *
 * WeatherWidget
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kToC from 'kelvin-to-celsius';
import { Card } from 'antd';
import { primaryColor } from '../Style/index';

const fgColor = '#fff';
const bgColor = '#e4f1d2';

const OSDiv = styled(Card)`
  .ant-card-head {
    color: ${fgColor} !important;
    background-color: ${primaryColor} !important;
    text-align: center !important;
    height: 30px;
  }
  color: ${fgColor} !important;
  background-color: ${primaryColor} !important;
`;

const handleClick = () => {
  window.location.href = '/weathermap';
};

function WeatherWidget(props) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <OSDiv title={props.mName} size="small" onClick={handleClick}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            alt="ex"
            src={`http://openweathermap.org/img/wn/${props.mIcon}.png`}
          />
          {props.mTemp && kToC(props.mTemp)}
          °C
        </div>
        <div style={{ textAlign: 'center' }}>{props.mDescription}</div>
      </OSDiv>
      <div style={{ backgroundColor: `${primaryColor}`, height: '30px' }} />
    </div>
  );
}

WeatherWidget.propTypes = {
  mName: PropTypes.string,
  mIcon: PropTypes.string,
  mTemp: PropTypes.number,
  mDescription: PropTypes.string,
};

export default memo(WeatherWidget);
