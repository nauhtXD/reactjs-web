/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Card } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../reducer';
import saga from '../saga';
import makeSelect from '../selectors';
import * as action from '../actions';

import TitleCom from '../../../components/TitleCom';

const { Meta } = Card;

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

  useEffect(() => {
    if (match.params.genusFeatureId) {
      mD = `/genusFeatures/${match.params.genusFeatureId}`;
      props.getNew(mD);
    }
  }, [match.params.genusFeatureId]);

  return (
    <div>
      <Helmet>
        <title>WikiNews</title>
        <meta name="description" content="News of MangoWiki" />
      </Helmet>
      <div>
        {props.mangoWikiReducer.new && (
          <TitleCom
            mCategory={props.mangoWikiReducer.new.name}
            mCont={
              <div>
                <Row gutter={16}>
                  <Col span={16} style={{ lineHeight: 1.5 }}>
                    {props.mangoWikiReducer.new.define}
                  </Col>
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{ width: '280px' }}
                      cover={
                        <img
                          alt="example"
                          src={props.mangoWikiReducer.new.img}
                        />
                      }
                    >
                      <Meta
                        title={props.mangoWikiReducer.new.scienceName}
                        description={props.mangoWikiReducer.new.name}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            }
          />
        )}
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
