/* eslint-disable no-unused-vars */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
// import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import PrivateRoute from 'utils/privateRoute';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

// import * as action from '../Home/actions';
// import makeSelect from '../Home/selectors';

import reducer from '../Home/reducer';
import saga from '../Home/saga';

import Home from '../Home/Loadable';
import News from '../News/Loadable';
import Login from '../Login/Loadable';
import Documents from '../Documents/Loadable';
import WeatherMap from '../WeatherMap/Loadable';
import NewsList from '../NewsList/Loadable';
import Introduce from '../Introduce/Loadable';
import Forum from '../Forum/Loadable';
import ForumPost from '../ForumPost/Loadable';
import Garden from '../Garden/Loadable';

import MangoWiki from '../MangoWiki/Loadable';
import WikiList from '../MangoWiki/pages/list';
import WikiNews from '../MangoWiki/pages/news';

import Admin from '../Admin/Loadable';
import Dashboard from '../Admin/pages/dashboard';
import User from '../Admin/pages/user';
import Post from '../Admin/pages/post';
import Report from '../Admin/pages/report';
import Contact from '../Admin/pages/contact';
import Household from '../Admin/pages/household';
import Plant from '../Admin/pages/plant';
import Document from '../Admin/pages/document';
import Banner from '../Admin/pages/banner';

import GlobalStyle from '../../global-styles';
function App(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

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
          <Route exact path="/news/:id" component={News} />
          <Route exact path="/documents" component={Documents} />
          <Route exact path="/weathermap" component={WeatherMap} />
          <Route exact path="/list/:subId" component={NewsList} />
          <Route exact path="/introduce" component={Introduce} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forumPost/:id" component={ForumPost} />
          <Route exact path="/garden/:id" component={Garden} />

          <Route path="/mangowiki" component={MangoWiki} />
          <Route exact path="/mangowiki/news/new/:id" component={WikiNews} />
          <Route exact path="/mangowiki/news/:familyId" component={WikiNews} />
          <Route
            exact
            path="/mangowiki/news/:familyId/:genusId"
            component={WikiNews}
          />
          <Route
            exact
            path="/mangowiki/news/:familyId/:genusId/:genusFeatureId"
            component={WikiNews}
          />
          <Route exact path="/mangowiki/list/" component={WikiList} />

          <Route exact path="/login" component={Login} />

          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute exact path="/admin/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/admin/user" component={User} />
          <PrivateRoute exact path="/admin/post" component={Post} />
          <PrivateRoute exact path="/admin/report" component={Report} />
          <PrivateRoute exact path="/admin/contact" component={Contact} />
          <PrivateRoute exact path="/admin/household" component={Household} />
          <PrivateRoute exact path="/admin/plant" component={Plant} />
          <PrivateRoute exact path="/admin/document" component={Document} />
          <PrivateRoute exact path="/admin/banner" component={Banner} />

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
