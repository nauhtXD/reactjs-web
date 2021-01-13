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
        mLogin={props.mLogin}
        mBanner={props.mBanner}
      />
      <div style={{ width: '90%', margin: 'auto' }}>
        <Layout style={{ backgroundColor: '#fff' }}>
          <Content>{props.mCont}</Content>
          {!props.mCheck && (
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              trigger={null}
              style={{ backgroundColor: '#fff', marginLeft: '0.76vw' }}
            >
              <Sidebar
                mWeathers={props.mWeathers}
                mCreateReport={props.mCreateReport}
                mDocuments={props.mDocuments}
              />
            </Sider>
          )}
        </Layout>
        {props.mCont2}
      </div>
      <Footer mContacts={props.mContacts} />
    </div>
  );
}

MyLayout.propTypes = {
  mCont: PropTypes.any,
  mCont2: PropTypes.any,
  mCategories: PropTypes.any,
  mSubCategories: PropTypes.any,
  mContacts: PropTypes.any,
  mCheck: PropTypes.bool,
  mBreadcrumbs: PropTypes.any,
  mWeathers: PropTypes.any,
  mCreateReport: PropTypes.func,
  mDocuments: PropTypes.any,
  mLogin: PropTypes.func,
  mBanner: PropTypes.array,
};

export default memo(MyLayout);
