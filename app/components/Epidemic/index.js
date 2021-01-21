/**
 *
 * Epidemic
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Card } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { dateFormat } from '../Style/index';

const cardStyle = {
  minWidth: '16.6793vw',
  backgroundImage: 'linear-gradient(to bottom, #feb020, #ffd05c)',
};

const MyP = styled.p`
  font-size: 0.76vw;
  margin: 0;
  padding: 0;
`;

function Epidemic(props) {
  return (
    <div>
      <Card
        style={cardStyle}
        size="small"
        title={
          <MyP>{`${props.mData[0] &&
            props.mData[0].province}, ${moment().format(dateFormat)}`}</MyP>
        }
      >
        {props.mData[0] &&
          props.mData.map((i, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MyP key={index}>{`${i.name}: ${i.count}`}</MyP>
          ))}
      </Card>
    </div>
  );
}

Epidemic.propTypes = {
  mData: PropTypes.any,
};

export default memo(Epidemic);
