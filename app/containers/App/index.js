/* eslint-disable no-unused-vars */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Home from '../Home/Loadable';
import News from '../News/Loadable';
// import Crops from '../Crops/Loadable';
import Documents from '../Documents/Loadable';
import WeatherMap from '../WeatherMap/Loadable';
import Admin from '../Admin/Loadable';
import Dashboard from '../Admin/pages/dashboard';
import User from '../Admin/pages/user';
import Post from '../Admin/pages/post';
import Report from '../Admin/pages/report';

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
          <Route exact path="/" component={Home} />
          <Route exact path="/News" component={News} />
          {/* <Route exact path="/Crops" component={Crops} /> */}
          <Route exact path="/Documents" component={Documents} />
          <Route exact path="/WeatherMap" component={WeatherMap} />
          <Route path="/Admin" component={Admin} />
          <Route exact path="/Admin/Dashboard" component={Dashboard} />
          <Route exact path="/Admin/User" component={User} />
          <Route exact path="/Admin/Post" component={Post} />
          <Route exact path="/Admin/Report" component={Report} />
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
