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

const cardStyle = {
  minWidth: '220px',
  backgroundImage: 'linear-gradient(to bottom, #feb020, #ffd05c)',
};

const MyP = styled.p`
  font-size: 10px;
  margin: 0;
  padding: 0;
`;

const MyCardGrid = styled(Card.Grid)`
  text-align: center;
  border-radius: 50%;
  width: 33.33%;
`;

function Epidemic(props) {
  return (
    <div>
      <Card
        style={cardStyle}
        size="small"
        title={
          <MyP>{`${props.mData && props.mData.province}, ${moment().format(
            'DD/MM/YYYY',
          )}`}</MyP>
        }
      >
        {props.mData &&
          props.mData.name.map((i, index) => (
            <MyP key={index}>{`${i.name}: ${i.count[0]}`}</MyP>
          ))}
      </Card>
    </div>
  );
}

Epidemic.propTypes = {
  mData: PropTypes.any,
};

export default memo(Epidemic);
