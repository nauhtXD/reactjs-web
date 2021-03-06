/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ListImgCom from '../../../components/ListImgCom';

function WikiList() {
  return (
    <div>
      <Helmet>
        <title>List</title>
        <meta name="description" content="List of MangoWiki" />
      </Helmet>
      <div>
        <ListImgCom
          mWidth="180px"
          mSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          mLink="/news/1"
          mTitle="Title2"
          mDay="dd/MM/yyyy"
          mContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a eleifend lacus. Duis condimentum molestie leo, a scelerisque neque"
        />
      </div>
      <div />
    </div>
  );
}

WikiList.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WikiList);
