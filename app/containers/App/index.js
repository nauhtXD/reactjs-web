/* eslint-disable no-unused-vars */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Home from 'containers/Home/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

function App(props) {
  return (
    <>
      <Helmet
        titleTemplate="%s - Hội quán nông dân"
        defaultTitle="Hội quán nông dân"
      >
        <meta name="description" content="Hội quán nông dân" />
      </Helmet>
      <div>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      <GlobalStyle />
    </>
  );
}
App.propTypes = {};
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(App);
