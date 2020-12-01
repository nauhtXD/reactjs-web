/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Carousel, Breadcrumb, Row, Col } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import MyMenu from '../MyMenu/Loadable';

const ContentStyle = styled.h3`
  height: 160px;
  color: #fff;
  lineheight: 160px;
  textalign: center;
  background: #364d79;
`;

function Header(props) {
  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <MyMenu mCategories={props.mCategories} mSubCategories={props.mSubCategories} />
      <div style={{ marginTop: '50px ' }}>
        <Carousel autoplay effect="fade">
          <div>
            <ContentStyle>1</ContentStyle>
          </div>
          <div>
            <ContentStyle>2</ContentStyle>
          </div>
          <div>
            <ContentStyle>3</ContentStyle>
          </div>
          <div>
            <ContentStyle>4</ContentStyle>
          </div>
        </Carousel>
        <Row>
          <Col span={20}>
            <Breadcrumb>
              <Breadcrumb.Item href="">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
              <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={4} style={{ textAlign: 'center' }}>
            <p
              style={{
                color: '#fff',
                backgroundColor: '#009000',
                fontSize: '14px',
                marginBottom: '5px',
              }}
            >
              Thứ sáu, 20/11/2020 (GMT+7)
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

Header.propTypes = {
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
};

export default memo(Header);
