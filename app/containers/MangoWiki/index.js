import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route, Link } from 'react-router-dom';
// import styled from 'styled-component';
import { Layout } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import makeSelectHome from '../Home/selectors';
import * as action from './actions';
import * as hAction from '../Home/actions';

import MyList from './pages/list';
import News from '../News/Loadable';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';

const { Sider, Content } = Layout;

export function MangoWiki(props) {
  useInjectReducer({ key: 'mangoWiki', reducer });
  useInjectSaga({ key: 'mangoWiki', saga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
  }, []);
  return (
    <div>
      <Helmet>
        <title>MangoWiki</title>
        <meta name="description" content="Description of MangoWiki" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <Layout>
              <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{ backgroundColor: '#fff' }}
              >
                <TitleCom
                  mCont={
                    <div>
                      <ul>
                        <li>
                          <Link to="/mangowiki/news/1">Xoài cát Hòa Lộc</Link>
                        </li>
                      </ul>
                    </div>
                  }
                  mCategory="Test"
                />
              </Sider>
              <Content
                style={{
                  paddingLeft: 12,
                  minHeight: 280,
                  backgroundColor: '#fff',
                }}
              >
                <Route path="/mangowiki/news" component={News} />
                <Route path="/mangowiki/list" component={MyList} />
              </Content>
            </Layout>
          </div>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mMarks={props.homeReducer.marks}
        mContacts={props.homeReducer.contacts}
        mCheck
      />
    </div>
  );
}

MangoWiki.propTypes = {
  homeReducer: PropTypes.any,
  mangoWikiReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getMarks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  mangoWikiReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
  },
  getMarks: data => {
    dispatch(hAction.getMarks(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MangoWiki);
