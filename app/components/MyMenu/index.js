/**
 *
 * MyMenu
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Form, Input } from 'antd';
import { layout, UIcon, MyAntdForm, MyAntdModal } from '../Style/index';

const { SubMenu } = Menu;
const mColor = '#000';
const menuColor = '#77b81e';

// #region styled
const FMenu = styled(Menu)`
  background-color: ${menuColor} !important;
  position: fixed;
  z-index: 1024;
  overflow: hidden;
  top: 0;
  width: 100%;
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
  color: ${mColor};
  :hover,
  &.ant-menu-item-selected {
    color: ${menuColor} !important;
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
  color: ${mColor} !important;
  :hover {
    color: ${menuColor} !important;
  }
`;
// #endregion

function MyMenu(props) {
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleLogin = () => {
    form.validateFields().then(values => {
      props.mLogin(values);
    });
  };

  return (
    <div>
      <FMenu mode="horizontal">
        <NavItem key="home">
          <MLink href="/">Trang chủ</MLink>
        </NavItem>
        {props.mCategories.length > 0 &&
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

        {localStorage.getItem('authToken') ? (
          <NavItem
            key="logout"
            // icon={}
            style={{ float: 'right' }}
            onClick={handleLogout}
          >
            Đăng xuất
          </NavItem>
        ) : (
          <NavItem
            key="login"
            icon={<UIcon />}
            style={{ float: 'right' }}
            onClick={showModal}
          >
            Đăng nhập
          </NavItem>
        )}
      </FMenu>
      <MyAntdModal
        title="Đăng nhập"
        centered
        visible={isVisible}
        onCancel={showModal}
        onOk={handleLogin}
        okText="Đăng nhập"
        cancelText="Hủy"
      >
        <MyAntdForm form={form} {...layout}>
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
        </MyAntdForm>
      </MyAntdModal>
    </div>
  );
}

MyMenu.propTypes = {
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
  mLogin: PropTypes.func,
};

export default memo(MyMenu);
