/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import moment from 'moment';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';

import TitleCom from '../../../components/TitleCom';

function WikiNews(props) {
  // eslint-disable-next-line react/prop-types
  const { match } = props;
  let mD = '';
  useInjectReducer({ key: 'mangoWiki', reducer });
  useInjectSaga({ key: 'mangoWiki', saga });
  useEffect(() => {
    if (match.params.genusFeatureId) {
      mD = `/genusFeatures/${match.params.genusFeatureId}`;
    } else if (match.params.genusId) {
      mD = `/genera/${match.params.genusId}`;
    } else {
      mD = `/families/${match.params.familyId}`;
    }
    props.getNew(mD);
  }, []);
  console.log(props.mangoWikiReducer.new);
  return (
    <div>
      <Helmet>
        <title>WikiNews</title>
        <meta name="description" content="News of MangoWiki" />
      </Helmet>
      <div>
        <TitleCom
          mCategory={
            props.mangoWikiReducer.new && props.mangoWikiReducer.new.name
          }
          // mCont={
          //   <div>
          //     <p style={{ textAlign: 'right' }}>
          //       Ngày đăng:{' '}
          //       {moment(props.newsReducer.post.publishAt).format('DD-MM-YYYY')}
          //     </p>
          //     <h2>{props.newsReducer.post.title}</h2>
          //     <div
          //       // eslint-disable-next-line react/no-danger
          //       dangerouslySetInnerHTML={{
          //         __html: props.newsReducer.post.content,
          //       }}
          //     />
          //     <p style={{ textAlign: 'right' }}>
          //       Nguồn:{' '}
          //       <a href={props.newsReducer.post.source}>
          //         {props.newsReducer.post.source}
          //       </a>
          //     </p>
          //   </div>
          // }
        />
      </div>
      <div />
    </div>
  );
}

WikiNews.propTypes = {
  mangoWikiReducer: PropTypes.any,
  getNew: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  mangoWikiReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getNew: data => {
    dispatch(action.getNew(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WikiNews);
