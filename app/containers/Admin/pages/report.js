import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

export function Report() {
  return (
    <div>
      <Helmet>
        <title>Report</title>
        <meta name="description" content="Description of Report" />
      </Helmet>
      <div>
        <p>List of reports</p>
      </div>
    </div>
  );
}

Report.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Report);
