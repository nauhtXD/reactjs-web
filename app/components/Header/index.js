/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Carousel, Breadcrumb, Row, Col, Menu, Image } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import MyMenu from '../MyMenu/Loadable';

const MyBreadcrumb = styled(Breadcrumb)`
  .anticon svg {
    vertical-align: baseline !important;
  }
`;

moment().locale('vi');
function Header(props) {
  return (
    <div>
      <MyMenu
        mCategories={props.mCategories}
        mSubCategories={props.mSubCategories}
      />
      <div style={{ margin: '50px auto auto auto', width: '90%' }}>
        <Carousel autoplay effect="fade">
          <div>
            <Image src="http://localhost:9000/photos/xoai1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuanvt%2F20210106%2F%2Fs3%2Faws4_request&X-Amz-Date=20210106T151826Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=9f45fa806fc03902a00645d468c372e56a8f6b0f879d1301a97d162aa0dd7ceb" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuanvt%2F20210106%2F%2Fs3%2Faws4_request&X-Amz-Date=20210106T151905Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=f40c33af418673043075f66ad6d88d4a04fe5b4df61c65ef834ad666c8ee891d" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuanvt%2F20210106%2F%2Fs3%2Faws4_request&X-Amz-Date=20210106T151925Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=d8c6ec992a18cd3ca291c5012e7b24fabd8d3f4574983ff42db705a9f198efc3" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuanvt%2F20210106%2F%2Fs3%2Faws4_request&X-Amz-Date=20210106T151933Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=4d3204fd19080c6790c99133c94981ec261e751d961897d7459d3f266b31425f" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai5.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuanvt%2F20210106%2F%2Fs3%2Faws4_request&X-Amz-Date=20210106T151947Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=cc96b939a5b4ab0757057898bb86958750ccb676716e26da7a1749557cd84785" />
          </div>
        </Carousel>
        <Row>
          <Col span={20}>
            <MyBreadcrumb separator=">">
              <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
              {props.mBreadcrumbs &&
                props.mBreadcrumbs.map(i => [
                  i.menu && (
                    <Breadcrumb.Item
                      overlay={
                        <Menu>
                          {i.menu.map(j => (
                            <Menu.Item key={i.name}>
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
                    <Breadcrumb.Item key={i.name}>{i.name}</Breadcrumb.Item>
                  ),
                  !i.menu && i.link && (
                    <Breadcrumb.Item key={i.name}>
                      <a href={i.link}>{i.name}</a>
                    </Breadcrumb.Item>
                  ),
                ])}
            </MyBreadcrumb>
          </Col>
          <Col span={4} style={{ textAlign: 'center' }}>
            <p
              style={{
                color: '#325700',
                fontSize: '14px',
                lineHeight: 1.5715,
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
