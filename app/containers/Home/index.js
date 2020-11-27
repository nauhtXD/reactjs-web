/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import Header from 'components/Header';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Home() {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <div>
        <h1>hello 1</h1>
      </div>
    </div>
  );
}

Home.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Home);
