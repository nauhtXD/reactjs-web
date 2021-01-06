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
            <Image src="http://localhost:9000/photos/xoai1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuy%2F20210105%2F%2Fs3%2Faws4_request&X-Amz-Date=20210105T100337Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=94edfd96d848f5b2b95ea9cef611608eb9a0609c277701e230fc884eb3d52383" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuy%2F20210105%2F%2Fs3%2Faws4_request&X-Amz-Date=20210105T100404Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=eac437db805f8a54c19a4b90fb8f2a2e60d764132cb19bccc3cef10a001588b7" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuy%2F20210105%2F%2Fs3%2Faws4_request&X-Amz-Date=20210105T101016Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=46b2834d824effbdc2b8bc31df7c0f590529089726742ad6f99511a7e04abc30" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/xoai4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuy%2F20210105%2F%2Fs3%2Faws4_request&X-Amz-Date=20210105T101110Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=463a679cc3684341bab08614ca5400180f276e154a95345ca856183797ab3768" />
          </div>
          <div>
            <Image src="http://localhost:9000/photos/12%20%281%29.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=thuy%2F20210105%2F%2Fs3%2Faws4_request&X-Amz-Date=20210105T085844Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=6d2187a1c0cc3f0ebfca3d867f915959668b4e813733ca1b7636fc1953fa061a" />
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
