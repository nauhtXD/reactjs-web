/**
 *
 * MyMenu
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Form, Input } from 'antd';
import ThreadList from '../ThreadList/index';
import { layout, UIcon, MyAntdForm, MyAntdModal } from '../Style/index';

const { SubMenu } = Menu;
const mColor = '#000';
const menuColor = '#77b81e';

// #region styled
const FMenu = styled(Menu)`
  background-color: ${menuColor} !important;
  position: fixed;
  z-index: 2;
  overflow: hidden;
  top: 0;
  width: 100%;
  line-height: 3.48749vw;
  font-size: 1.06141vw;
`;
const NavItem = styled(Menu.Item)`
  color: #fff;
  margin-top: -0.076vw !important;
  margin-bottom: 0 !important;
  margin-left: 1.5163vw !important;
  margin-right: 1.5163vw !important;
  :hover,
  :focus,
  &.ant-menu-item-selected {
    color: ${mColor} !important;
    border-bottom: 0.076vw solid ${mColor} !important;
  }
`;
const SubItem = styled(Menu.Item)`
  color: ${mColor};
  font-size: 1.06141vw;
  height: 3.0326vw !important;
  line-height: 3.0326vw !important;
  :hover,
  :focus,
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
  &.ant-menu-submenu-active,
  &.ant-menu-submenu-selected {
    color: ${mColor} !important;
    border-bottom: 0.076vw solid ${mColor} !important;
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
  const [usrForm] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [threadVisible, setThreadVisible] = useState(false);

  const showModal = key => {
    if (key === 0) setIsVisible(!isVisible);
    else if (key === 1) {
      usrForm.setFieldsValue(JSON.parse(localStorage.getItem('usr')));
      setProfileVisible(!profileVisible);
    } else if (key === 2) {
      setThreadVisible(!threadVisible);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleLogin = () => {
    form.validateFields().then(values => {
      props.mLogin(values);
    });
  };

  const handleUpdate = () => {
    usrForm.validateFields().then(values => {
      const data = {
        ...values,
        id: JSON.parse(localStorage.getItem('usr')).id,
      };
      props.mUpdate(data);
      MyAntdModal.info({
        title: 'Cập nhật thành công',
        content: (
          <div>
            <p>Vui lòng đăng nhập lại để tiếp tục</p>
          </div>
        ),
        onOk() {
          localStorage.clear();
          window.location.reload();
        },
      });
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
          <SubNav
            key="user"
            // icon={}
            style={{ float: 'right' }}
            title={JSON.parse(localStorage.getItem('usr')).username}
          >
            <SubItem key="profile">
              <MSubLink onClick={() => showModal(1)}>Tài khoản</MSubLink>
            </SubItem>
            <SubItem key="thread">
              <MSubLink onClick={() => showModal(2)}>Bài viết</MSubLink>
            </SubItem>
            {JSON.parse(localStorage.getItem('usr')).userType.name.includes(
              'User',
            ) && (
              <SubItem key="epidemic">
                <MSubLink
                  href={`/garden/${JSON.parse(localStorage.getItem('usr')).id}`}
                >
                  Vườn cây
                </MSubLink>
              </SubItem>
            )}
            <SubItem key="logout">
              <MSubLink onClick={handleLogout}>Đăng xuất</MSubLink>
            </SubItem>
          </SubNav>
        ) : (
          <NavItem
            key="login"
            icon={<UIcon />}
            style={{ float: 'right' }}
            onClick={() => showModal(0)}
          >
            Đăng nhập
          </NavItem>
        )}
      </FMenu>
      <MyAntdModal
        title="Đăng nhập"
        centered
        visible={isVisible}
        onCancel={() => showModal(0)}
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
      <MyAntdModal
        title="Thông tin tài khoản"
        centered
        visible={profileVisible}
        onCancel={() => showModal(1)}
        onOk={handleUpdate}
        okText="Chỉnh sửa"
        cancelText="Đóng"
      >
        <MyAntdForm form={usrForm} {...layout}>
          <Form.Item label="Tên đăng nhập" name="username">
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Vui lòng nhập đúng định dạng email!',
              },
              {
                required: true,
                message: 'Vui lòng nhập email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
        </MyAntdForm>
      </MyAntdModal>
      <MyAntdModal
        title="Bài viết của tôi"
        centered
        visible={threadVisible}
        onCancel={() => showModal(2)}
        footer={null}
        width={800}
      >
        <ThreadList mData={props.mThread} />
      </MyAntdModal>
    </div>
  );
}

MyMenu.propTypes = {
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
  mLogin: PropTypes.func,
  mUpdate: PropTypes.func,
  mThread: PropTypes.any,
};

export default memo(MyMenu);
