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
  const items = [];
  return (
    <FMenu mode="horizontal">
      <NavItem key="home">
        <MLink href="/">Trang chủ</MLink>
      </NavItem>
      {props.mCategories &&
        props.mCategories.length > 0 &&
        props.mCategories.map(i => {
          {
            items.push(
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
            );
          }
        })}
      {items}
      <NavItem key="login" icon={<UIcon />} style={{ float: 'right' }}>
        ĐĂNG NHẬP
      </NavItem>
    </FMenu>
  );
}

MyMenu.propTypes = {
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
};

export default memo(MyMenu);
