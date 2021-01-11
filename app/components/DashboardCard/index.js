/**
 *
 * DashboardCard
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Space } from 'antd';
import { UpIcon, primaryColor } from '../Style/index';

function DashboardCard(props) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const data = parseInt((props.mIncreaseNum / props.mTotal) * 100, 10);
    setPercent(data);
  }, [props.mIncreaseNum, props.mTotal]);

  return (
    <div>
      <p style={{ fontSize: '20px' }}>
        <b>{`${props.mIncreaseNum} / tuần`}</b>
      </p>
      <p>
        Tổng: {props.mTotal}
        <span>
          <p style={{ float: 'right' }}>
            <Space>
              <UpIcon twoToneColor={`${primaryColor}`} />
              {`${percent}%`}
            </Space>
          </p>
        </span>
      </p>
    </div>
  );
}

DashboardCard.propTypes = {
  mTotal: PropTypes.number,
  mIncreaseNum: PropTypes.number,
};

export default memo(DashboardCard);
