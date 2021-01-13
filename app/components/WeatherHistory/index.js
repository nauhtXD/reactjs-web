/**
 *
 * WeatherHistory
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import kToC from 'kelvin-to-celsius';
import moment from 'moment';
import { Card } from 'antd';

import TitleCom from '../TitleCom/index';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const MyCard = styled(Card.Grid)`
  width: 20%;
  text-align: center;
  background-image: linear-gradient(to bottom, #feb020, #ffd05c);
  font-size: 1.14vw;
`;

function WeatherHistory(props) {
  const sortArr = props.mHistory.sort((a, b) => (a.dt > b.dt ? 1 : -1));
  return (
    <TitleCom
      mCategory="Thời tiết 5 ngày vừa qua"
      mCont={
        <div>
          {sortArr &&
            sortArr.map(i => (
              <MyCard key={i.dt}>
                <p>{moment.unix(i.dt).format('DD/MM')}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${
                    i.weather[0].icon
                  }.png`}
                  alt="example"
                />
                <p>
                  {i.temp && kToC(i.temp)}
                  °C
                </p>
                <p>{i.weather[0].description}</p>
              </MyCard>
            ))}
        </div>
      }
    />
  );
}

WeatherHistory.propTypes = {
  mHistory: PropTypes.array,
};

export default memo(WeatherHistory);
