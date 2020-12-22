import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Menu, Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import Dashboard from './pages/dashboard';
import User from './pages/user';
import Post from './pages/post';
import Report from './pages/report';

const { SubMenu } = Menu;
const { Sider, Content } = Layout;

const UIcon = styled(UserOutlined)`
  &.anticon svg {
    vertical-align: baseline !important;
  }
`;

export function Admin() {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  return (
    <div>
      <Helmet>
        <title>Admin</title>
        <meta name="description" content="Description of Admin" />
      </Helmet>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ backgroundColor: '#fff' }}
        >
          <Menu defaultSelectedKeys={['dashboard']} mode="inline">
            <Menu.Item key="user" icon={<Avatar icon={<UIcon />} />}>
              <a href=".">Tên</a>
              <a href="/">Đăng xuất</a>
            </Menu.Item>
            <Menu.Item key="dashboard">
              <Link to="/Admin/Dashboard">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="households" title="Hộ dân">
              <Menu.Item key="hh1">
                <Link to="/Admin/User">Tài khoản</Link>
              </Menu.Item>
              <Menu.Item key="hh2">
                <Link to="/Admin/Households">Thông tin hộ</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="report" title="Báo cáo">
              <Menu.Item key="reportlist">
                <Link to="/Admin/Report">Danh sách sự cố</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="post" title="Bài viết">
              <Menu.Item key="newpost">
                <Link to="/Admin/Post">Bài viết mới</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="news" title="Quản lý tin tức">
              <Menu.Item key="newslist">
                <Link to="/">Danh sách tin tức</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              backgroundColor: '#fff',
            }}
          >
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/user" component={User} />
            <Route path="/admin/post" component={Post} />
            <Route path="/admin/report" component={Report} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

Admin.propTypes = {};

const mapStateToProps = createStructuredSelector({
  admin: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Admin);