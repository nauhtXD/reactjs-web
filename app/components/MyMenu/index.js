/**
 *
 * MyMenu
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const { SubMenu } = Menu;
const mColor = '#fff000';
// #region styled
const FMenu = styled(Menu)`
  background-color: #009000 !important;
  position: fixed;
  z-index: 1;
  overflow: hidden;
  top: 0;
  width: 90%;
  left: 5%;
`;
const NavItem = styled(Menu.Item)`
  color: #fff;
  font-weight: bold;
  :hover,
  &.ant-menu-item-selected {
    color: ${mColor} !important;
    border-bottom: 1px solid ${mColor} !important;
  }
`;
const SubItem = styled(Menu.Item)`
  color: #009000;
  font-weight: bold;
  :hover,
  &.ant-menu-item-selected {
    color: ${mColor} !important;
    background-color: #009000;
  }
`;
const SubNav = styled(SubMenu)`
  color: #fff;
  font-weight: bold;
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
const UIcon = styled(UserOutlined)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;
const MLink = styled.a`
  color: #fff !important;
  font-weight: bold;
  :hover {
    color: ${mColor} !important;
  }
`;
const MSubLink = styled.a`
  color: #009000 !important;
  font-weight: bold;
  :hover {
    color: ${mColor} !important;
  }
`;
// #endregion

function MyMenu(props) {
  return (
    <FMenu mode="horizontal">
      {props.mCategories &&
        props.mCategories.length > 0 &&
        props.mCategories.map(i => (
          <NavItem key="home">
            <MLink href="/">{i.name}</MLink>
          </NavItem>
        ))}
      {/* <NavItem>
        <MLink>GIỚI THIỆU</MLink>
      </NavItem>
      <SubNav key="" title="TIN TỨC - SỰ KIỆN">
        <SubItem href=".">Khuyến nông</SubItem>
        <SubItem>
          <MSubLink href="/Crops">Trồng trọt</MSubLink>
        </SubItem>
        <SubItem href=".">Chăn nuôi</SubItem>
      </SubNav>
      <NavItem>HOẠT ĐỘNG CỦA HỘI</NavItem>
      <NavItem>
        <MLink href="/Documents">VĂN BẢN HỘI</MLink>
      </NavItem>
      <NavItem>NHÀ NÔNG CẦN BIẾT</NavItem> */}
      <NavItem key="login" icon={<UIcon />} style={{ float: 'right' }}>
        ĐĂNG NHẬP
      </NavItem>
    </FMenu>
  );
}

MyMenu.propTypes = {
  mCategories: PropTypes.any,
};

export default memo(MyMenu);
