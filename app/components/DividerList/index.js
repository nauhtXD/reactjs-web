/**
 *
 * DividerList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Divider, List } from 'antd';

function DividerList(props) {
  return (
    <div>
      <Divider orientation="left">{props.mTitle}</Divider>
      <div style={{ lineHeight: 1.5 }}>{props.mCont}</div>
      {props.mListItem && (
        <List dataSource={props.mSource} renderItem={props.mListItem} />
      )}
    </div>
  );
}

DividerList.propTypes = {
  mCont: PropTypes.any,
  mTitle: PropTypes.string,
  mSource: PropTypes.array,
  mListItem: PropTypes.any,
};

export default memo(DividerList);
