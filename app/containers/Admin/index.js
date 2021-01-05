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
import Contact from './pages/contact';
import Household from './pages/household';
import Plant from './pages/plant';

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
              <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
            <SubMenu key="households" title="Hộ dân">
              <Menu.Item key="hh1">
                <Link to="/admin/user">Tài khoản</Link>
              </Menu.Item>
              <Menu.Item key="hh2">
                <Link to="/admin/household">Thông tin hộ</Link>
              </Menu.Item>
              <Menu.Item key="hh3">
                <Link to="/admin/plant">Thông tin cây</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="reports">
              <Link to="/admin/report">Sự cố</Link>
            </Menu.Item>
            <Menu.Item key="posts">
              <Link to="/admin/post">Bài viết</Link>
            </Menu.Item>
            <Menu.Item key="contacts">
              <Link to="/admin/contact">Liên hệ</Link>
            </Menu.Item>
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
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/user" component={User} />
            <Route exact path="/admin/post" component={Post} />
            <Route exact path="/admin/report" component={Report} />
            <Route exact path="/admin/contact" component={Contact} />
            <Route exact path="/admin/household" component={Household} />
            <Route exact path="/admin/plant" component={Plant} />
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
