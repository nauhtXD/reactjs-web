/**
 *
 * ThreadList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import { List } from 'antd';

import { MyAntdList, MyLink, MyP } from '../Style/index';

function ThreadList(props) {
  return (
    <div>
      <MyAntdList
        itemLayout="vertical"
        size="large"
        bordered
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
        }}
        dataSource={props.mData}
        renderItem={item => (
          <List.Item
            key={item.id}
            extra={
              <div>
                <MyP>Lượt trả lời: {item.replies}</MyP>
                <MyP>Lượt xem: {item.views}</MyP>
                <MyP>Cập nhật: {moment(item.updatedAt).format('llll')}</MyP>
              </div>
            }
          >
            <MyLink href={`/forumPost/${item.id}`}>
              <b style={{ fontSize: '1.3vw' }}>{item.title}</b>
            </MyLink>
            <MyP style={{ opacity: 0.6 }}>
              {`${item.user.username} - 
                          ${moment(item.createdAt).format('llll')}`}
            </MyP>
          </List.Item>
        )}
      />
    </div>
  );
}

ThreadList.propTypes = {
  mData: PropTypes.any,
};

export default memo(ThreadList);
