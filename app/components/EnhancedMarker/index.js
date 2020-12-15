/**
 *
 * EnhancedMarker
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kToC from 'kelvin-to-celsius';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const MyStyle = styled.div`
  height: 30px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, #feb020, #ffd05c);
`;

function EnhancedMarker(props) {
  return (
    <MyStyle>
      <div>
        <p>{props.mName}</p>
        <p>{props.mDescription}</p>
      </div>
      <img
        src={`http://openweathermap.org/img/wn/${props.mIcon}@2x.png`}
        alt="example"
      />
      <div>
        <p>
          {props.mTemp && kToC(props.mTemp)}
          °C
        </p>
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
