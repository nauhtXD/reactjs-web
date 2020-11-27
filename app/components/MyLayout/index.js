/**
 *
 * MyLayout
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Layout } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Header from '../Header/Loadable';
import Footer from '../Footer/Loadable';
import Sidebar from '../Sidebar/Loadable';

const { Content, Sider } = Layout;

function MyLayout(props) {
  return (
    <div>
      <Header mCategories={props.mCategories} />
      <div style={{ width: '90%', margin: 'auto' }}>
        <Layout style={{ backgroundColor: '#fff' }}>
          <Content style={{ marginRight: '10px' }}>{props.mCont}</Content>
          <Sider style={{ backgroundColor: '#fff' }}>
            <Sidebar />
          </Sider>
        </Layout>
      </div>
      <Footer />
    </div>
  );
}

MyLayout.propTypes = {
  mCont: PropTypes.any,
  mCategories: PropTypes.any,
};

export default memo(MyLayout);
