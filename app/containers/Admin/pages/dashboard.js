/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import * as action from '../actions';

import TitleCom from '../../../components/TitleCom/index';
import DashboardCard from '../../../components/DashboardCard/index';

export function Dashboard(props) {
  useInjectReducer({ key: 'admin', reducer });
  useInjectSaga({ key: 'admin', saga });

  useEffect(() => {
    props.countPosts();
    props.countProblems();
    props.countHouseholds();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <div>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              {props.adminReducer.countPosts.all && (
                <TitleCom
                  mCategory="Bài viết"
                  mCont={
                    <div>
                      <DashboardCard
                        mIncreaseNum={
                          props.adminReducer.countPosts.lastWeek[0].count
                        }
                        mTotal={props.adminReducer.countPosts.all[0].count}
                      />
                    </div>
                  }
                />
              )}
            </Col>
            <Col span={8}>
              {props.adminReducer.countHouseholds.all && (
                <TitleCom
                  mCategory="Hộ dân"
                  mCont={
                    <div>
                      <DashboardCard
                        mIncreaseNum={
                          props.adminReducer.countHouseholds.lastWeek[0].count
                        }
                        mTotal={props.adminReducer.countHouseholds.all[0].count}
                      />
                    </div>
                  }
                />
              )}
            </Col>
            <Col span={8}>
              {props.adminReducer.countProblems.all && (
                <TitleCom
                  mCategory="Báo cáo"
                  mCont={
                    <div>
                      <DashboardCard
                        mIncreaseNum={
                          props.adminReducer.countProblems.lastWeek[0].count
                        }
                        mTotal={props.adminReducer.countProblems.all[0].count}
                      />
                    </div>
                  }
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  adminReducer: PropTypes.any,
  countPosts: PropTypes.func,
  countProblems: PropTypes.func,
  countHouseholds: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  countPosts: data => {
    dispatch(action.countPosts(data));
  },
  countProblems: data => {
    dispatch(action.countProblems(data));
  },
  countHouseholds: data => {
    dispatch(action.countHouseholds(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
