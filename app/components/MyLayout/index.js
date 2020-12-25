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
      <Header
        mCategories={props.mCategories}
        mSubCategories={props.mSubCategories}
        mBreadcrumbs={props.mBreadcrumbs}
      />
      <div style={{ width: '90%', margin: 'auto' }}>
        <Layout style={{ backgroundColor: '#fff' }}>
          <Content style={{ marginRight: '10px' }}>{props.mCont}</Content>
          {!props.mCheck && (
            <Sider style={{ backgroundColor: '#fff' }}>
              <Sidebar mWeathers={props.mWeathers} />
            </Sider>
          )}
        </Layout>
      </div>
      <Footer mMarks={props.mMarks} mContacts={props.mContacts} />
    </div>
  );
}

MyLayout.propTypes = {
  mCont: PropTypes.any,
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
  mMarks: PropTypes.any,
  mContacts: PropTypes.any,
  mCheck: PropTypes.bool,
  mBreadcrumbs: PropTypes.any,
  mWeathers: PropTypes.any,
};

export default memo(MyLayout);
