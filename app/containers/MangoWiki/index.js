import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Menu, Row, Col } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import makeSelectHome from '../Home/selectors';
import * as action from './actions';
import * as hAction from '../Home/actions';

import WikiList from './pages/list';
import WikiNews from './pages/news';
import MyLayout from '../../components/MyLayout/Loadable';
import TitleCom from '../../components/TitleCom/Loadable';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const MyLink = styled(Link)``;
const MyMI = styled(Menu.Item)`
  :active {
    background-color: #fff !important;
  }
`;

export function MangoWiki(props) {
  useInjectReducer({ key: 'mangoWiki', reducer });
  useInjectSaga({ key: 'mangoWiki', saga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
    props.getFamilies();
    props.getGenera();
    props.getGenusFeatures();
  }, []);
  return (
    <div>
      <Helmet>
        <title>MangoWiki</title>
        <meta name="description" content="Description of MangoWiki" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <Row gutter={16}>
              <Col span={5}>
                <TitleCom
                  mCont={
                    <div>
                      <Menu style={{ width: 230 }} mode="inline">
                        {props.mangoWikiReducer.families &&
                          props.mangoWikiReducer.families.map(i => (
                            <SubMenu
                              key={`family${i.id}`}
                              title={
                                <MyLink to={`/mangowiki/news/${i.id}`}>
                                  {i.name}
                                </MyLink>
                              }
                            >
                              {props.mangoWikiReducer.genera &&
                                props.mangoWikiReducer.genera.map(j => (
                                  <SubMenu
                                    key={`genus${j.id}`}
                                    title={
                                      <MyLink
                                        to={`/mangowiki/news/${i.id}/${j.id}`}
                                      >
                                        {j.name}
                                      </MyLink>
                                    }
                                  >
                                    {props.mangoWikiReducer.genusFeatures &&
                                      props.mangoWikiReducer.genusFeatures.map(
                                        k => (
                                          <MyMI key={`genusFeature${k.id}`}>
                                            <MyLink
                                              to={`/mangowiki/news/${i.id}/${
                                                j.id
                                              }/${k.id}`}
                                            >
                                              {k.name}
                                            </MyLink>
                                          </MyMI>
                                        ),
                                      )}
                                  </SubMenu>
                                ))}
                            </SubMenu>
                          ))}
                      </Menu>
                    </div>
                  }
                  mCategory="Mục lục"
                  mCheck
                />
              </Col>
              <Col span={19}>
                <Route
                  exact
                  path="/mangowiki/news/new/:id"
                  component={WikiNews}
                />
                <Route
                  exact
                  path="/mangowiki/news/:familyId"
                  component={WikiNews}
                />
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
                <Route exact path="/mangowiki/list" component={WikiList} />
              </Col>
            </Row>
          </div>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mMarks={props.homeReducer.marks}
        mContacts={props.homeReducer.contacts}
        mCheck
      />
    </div>
  );
}

MangoWiki.propTypes = {
  homeReducer: PropTypes.any,
  mangoWikiReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getMarks: PropTypes.func,
  getFamilies: PropTypes.func,
  getGenera: PropTypes.func,
  getGenusFeatures: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  mangoWikiReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
  },
  getMarks: data => {
    dispatch(hAction.getMarks(data));
  },
  getFamilies: data => {
    dispatch(action.getFamilies(data));
  },
  getGenera: data => {
    dispatch(action.getGenera(data));
  },
  getGenusFeatures: data => {
    dispatch(action.getGenusFeatures(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MangoWiki);
