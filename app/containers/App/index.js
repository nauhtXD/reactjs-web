/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
// import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import reducer from '../Home/reducer';
import saga from '../Home/saga';

import Home from '../Home/Loadable';
import News from '../News/Loadable';
// import Crops from '../Crops/Loadable';
import Documents from '../Documents/Loadable';
import WeatherMap from '../WeatherMap/Loadable';

import MangoWiki from '../MangoWiki/Loadable';
import WikiList from '../MangoWiki/pages/list';
import WikiNews from '../MangoWiki/pages/news';

import Admin from '../Admin/Loadable';
import Dashboard from '../Admin/pages/dashboard';
import User from '../Admin/pages/user';
import Post from '../Admin/pages/post';
import Report from '../Admin/pages/report';

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
          <Route exact path="/reactjs-web/app/" component={Home} />
          <Route exact path="/news/:id" component={News} />
          {/* <Route exact path="/Crops" component={Crops} /> */}
          <Route exact path="/documents" component={Documents} />
          <Route exact path="/weathermap" component={WeatherMap} />

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

          <Route path="/admin" component={Admin} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/user" component={User} />
          <Route exact path="/admin/post" component={Post} />
          <Route exact path="/admin/report" component={Report} />

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
