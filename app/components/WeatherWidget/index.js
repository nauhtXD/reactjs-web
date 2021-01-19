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

const fgColor = '#000';
const primaryColor = 'linear-gradient(to bottom, #feb020, #ffd05c)';

const OSDiv = styled(Card)`
  .ant-card-head {
    color: ${fgColor} !important;
    background-image: ${primaryColor} !important;
    text-align: center !important;
    height: 2.27vw;
    font-size: 1.213vw;
  }
  color: ${fgColor} !important;
  background-image: ${primaryColor} !important;
  .ant-card-head-title {
    padding: 1.213vw 0;
  }
  .ant-card-body {
    padding: 1.81956vw !important;
    font-size: 1.14vw;
  }
`;

const handleClick = () => {
  window.location.href = '/weathermap';
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function WeatherWidget(props) {
  return (
    <div style={{ marginBottom: '0.76vw' }}>
      <OSDiv title={props.mName} size="small" onClick={handleClick}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '1.14vw',
          }}
        >
          <img
            alt="ex"
            src={`http://openweathermap.org/img/wn/${props.mIcon}.png`}
          />
          {props.mTemp && kToC(props.mTemp)}
          °C
        </div>
        <div style={{ textAlign: 'center', fontSize: '1.14vw' }}>
          {capitalizeFirstLetter(props.mDescription)}
        </div>
      </OSDiv>
      <div style={{ backgroundImage: `${primaryColor}`, height: '2.27vw' }} />
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
