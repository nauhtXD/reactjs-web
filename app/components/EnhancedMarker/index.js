/**
 *
 * EnhancedMarker
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kToC from 'kelvin-to-celsius';
import moment from 'moment';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { dateFormat } from '../Style/index';

const MyStyle = styled.div`
  height: 2.27445vw;
  width: 15.163vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, #feb020, #ffd05c);
`;

const MyP = styled.p`
  font-size: 0.76vw;
  margin: 0;
  padding: 0;
`;

function EnhancedMarker(props) {
  return (
    <MyStyle>
      <div>
        <MyP>{props.mName}</MyP>
        <MyP>{props.mDescription}</MyP>
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${props.mIcon}.png`}
        alt="example"
      />
      <div>
        <MyP>
          {props.mTemp && kToC(props.mTemp)}
          °C
        </MyP>
        <MyP>{moment().format(dateFormat)}</MyP>
      </div>
    </MyStyle>
  );
}

EnhancedMarker.propTypes = {
  mName: PropTypes.string,
  mDescription: PropTypes.string,
  mIcon: PropTypes.string,
  mTemp: PropTypes.number,
};

export default memo(EnhancedMarker);
