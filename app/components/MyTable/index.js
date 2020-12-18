/**
 *
 * MyTable
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Table, Space } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const { Column } = Table;

function MyTable(props) {
  console.log(props.mData.keys());
  return <div />;
}

MyTable.propTypes = {
  mData: PropTypes.array,
};

export default memo(MyTable);
