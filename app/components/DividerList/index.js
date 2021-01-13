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
      <Divider
        orientation="left"
        style={{ fontSize: '1.213vw', margin: '1.213vw auto' }}
      >
        {props.mTitle}
      </Divider>
      <div style={{ lineHeight: '0.114vw' }}>{props.mCont}</div>
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
