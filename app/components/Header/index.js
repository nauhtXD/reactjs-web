/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Carousel, Breadcrumb, Row, Col, Menu, Image } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import MyMenu from '../MyMenu/Loadable';
import { MyBreadcrumb } from '../Style/index';

moment().locale('vi');
function Header(props) {
  return (
    <div>
      <MyMenu
        mCategories={props.mCategories}
        mSubCategories={props.mSubCategories}
        mLogin={props.mLogin}
        mUpdate={props.mUpdate}
        mThread={props.mThread}
      />
      <div style={{ margin: '3.79vw auto auto auto', width: '90%' }}>
        {props.mBanner && (
          <Carousel autoplay effect="fade">
            {props.mBanner.map(i => (
              <div>
                <Image src={i.img} />
              </div>
            ))}
          </Carousel>
        )}
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
          <Col
            span={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                color: '#325700',
                fontSize: '1.06141vw',
                lineHeight: '0.119vw',
                margin: '0.379vw 0',
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
  mLogin: PropTypes.func,
  mBanner: PropTypes.array,
  mUpdate: PropTypes.func,
  mThread: PropTypes.any,
};

export default memo(Header);
