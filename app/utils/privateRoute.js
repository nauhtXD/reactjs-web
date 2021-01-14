/* eslint-disable prettier/prettier */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('authToken') &&
        localStorage.getItem('authToken').includes('QjMeFzYjMZssWfvow5JQ') ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  mCheckToken: PropTypes.func,
};

export default PrivateRoute;
