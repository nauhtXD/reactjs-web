/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Carousel, Breadcrumb, Row, Col, Menu } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import { HomeOutlined } from '@ant-design/icons';
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
const MyBreadcrumb = styled(Breadcrumb)`
  .anticon svg {
    vertical-align: baseline !important;
  }
`;

moment().locale('vi');
function Header(props) {
  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <MyMenu
        mCategories={props.mCategories}
        mSubCategories={props.mSubCategories}
      />
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
            <MyBreadcrumb separator=">">
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              {props.mBreadcrumbs &&
                props.mBreadcrumbs.map(i => [
                  i.menu && (
                    <Breadcrumb.Item
                      overlay={
                        <Menu>
                          {i.menu.map(j => (
                            <Menu.Item>
                              <a href={j.link}>{j.name}</a>
                            </Menu.Item>
                          ))}
                        </Menu>
                      }
                    >
                      {i.name}
                    </Breadcrumb.Item>
                  ),
                  !i.menu && !i.link && (
                    <Breadcrumb.Item>{i.name}</Breadcrumb.Item>
                  ),
                  !i.menu && i.link && (
                    <Breadcrumb.Item>
                      <a href={i.link}>{i.name}</a>
                    </Breadcrumb.Item>
                  ),
                ])}
            </MyBreadcrumb>
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
              {moment().format('llll')}
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
  mBreadcrumbs: PropTypes.any,
};

export default memo(Header);
