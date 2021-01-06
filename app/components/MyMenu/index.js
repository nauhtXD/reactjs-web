/**
 *
 * MyMenu
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Modal, Form, Input, Button } from 'antd';
import { layout, tailLayout, UIcon } from '../Style/index';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const { SubMenu } = Menu;
const mColor = '#fff000';
// #region styled
const FMenu = styled(Menu)`
  background-color: #009000 !important;
  position: fixed;
  z-index: 1024;
  overflow: hidden;
  top: 0;
  width: 90%;
  left: 5%;
`;
const NavItem = styled(Menu.Item)`
  color: #fff;
  :hover,
  &.ant-menu-item-selected {
    color: ${mColor} !important;
    border-bottom: 1px solid ${mColor} !important;
  }
`;
const SubItem = styled(Menu.Item)`
  color: #009000;
  :hover,
  &.ant-menu-item-selected {
    color: ${mColor} !important;
    background-color: #009000;
  }
`;
const SubNav = styled(SubMenu)`
  color: #fff;
  .ant-menu-submenu-title {
    :hover {
      color: ${mColor} !important;
    }
  }
  &.ant-menu-submenu-active {
    color: ${mColor} !important;
    border-bottom: 1px solid ${mColor} !important;
  }
`;
const MLink = styled.a`
  color: #fff !important;
  :hover {
    color: ${mColor} !important;
  }
`;
const MSubLink = styled.a`
  color: #009000 !important;
  :hover {
    color: ${mColor} !important;
  }
`;
// #endregion

function MyMenu(props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <FMenu mode="horizontal">
        <NavItem key="home">
          <MLink href="/">Trang chủ</MLink>
        </NavItem>
        {props.mCategories &&
          props.mCategories.length > 0 &&
          props.mCategories.map(i =>
            props.mSubCategories.some(j => j.categoryId === i.id) ? (
              <SubNav key={i.key} title={i.name}>
                {props.mSubCategories.map(
                  j =>
                    j.categoryId === i.id && (
                      <SubItem key={j.key}>
                        <MSubLink href={`/${j.key}`}>{j.name}</MSubLink>
                      </SubItem>
                    ),
                )}
              </SubNav>
            ) : (
              <NavItem key={i.key}>
                <MLink href={`/${i.key}`}>{i.name}</MLink>
              </NavItem>
            ),
          )}
        <NavItem
          key="login"
          icon={<UIcon />}
          style={{ float: 'right' }}
          onClick={() => setIsVisible(true)}
        >
          Đăng nhập
        </NavItem>
      </FMenu>
      <Modal
        title="Đăng nhập"
        centered
        visible={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Form {...layout} name="basic">
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setIsVisible(false)}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

MyMenu.propTypes = {
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
  mUsers: PropTypes.any,
};

export default memo(MyMenu);
