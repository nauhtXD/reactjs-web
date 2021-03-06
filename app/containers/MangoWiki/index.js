import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Row, Col } from 'antd';

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
import {
  MyInlineMenu,
  MyRouterLink,
  DownIcon,
} from '../../components/Style/index';

const { SubMenu } = Menu;
const MyMI = styled(Menu.Item)`
  :active {
    background-color: #fff !important;
  }
`;

const bcrData = [
  {
    name: 'Thư viện',
  },
];

export function MangoWiki(props) {
  useInjectReducer({ key: 'mangoWiki', reducer });
  useInjectSaga({ key: 'mangoWiki', saga });

  const [rotate, setRotate] = useState(null);
  const [rotate1, setRotate1] = useState(null);

  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getFamilies();
    props.getGenera();
    props.getGenusFeatures();
    props.getBanners();
  }, []);

  useEffect(() => {
    if (props.homeReducer.loginToken.token) {
      localStorage.setItem('authToken', props.homeReducer.loginToken.token);
      localStorage.setItem(
        'usr',
        JSON.stringify(props.homeReducer.loginToken.user),
      );
      window.location.reload();
    }
  }, [props.homeReducer.loginToken]);

  useEffect(() => {
    if (localStorage.getItem('usr'))
      props.getForumPostsByUID(JSON.parse(localStorage.getItem('usr')).id);
  }, [localStorage.getItem('usr')]);

  const handleLogin = values => {
    props.getLoginToken(values);
  };

  const handleClick = () => {
    setRotate(rotate ? null : 180);
  };

  const handleClick1 = () => {
    setRotate1(rotate1 ? null : 180);
  };

  return (
    <div>
      <Helmet>
        <title>MangoWiki</title>
        <meta name="description" content="Description of MangoWiki" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <Row gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
              <Col span={5}>
                <TitleCom
                  mCont={
                    <div>
                      <MyInlineMenu
                        mode="inline"
                        defaultOpenKeys={['family1', 'genus1']}
                      >
                        {props.mangoWikiReducer.families &&
                          props.mangoWikiReducer.families.map(i => (
                            <SubMenu
                              key={`family${i.id}`}
                              title={
                                <MyRouterLink
                                  onClick={handleClick}
                                  to={`/mangowiki/news/${i.id}`}
                                >
                                  Họ {i.name}
                                </MyRouterLink>
                              }
                              icon={<DownIcon rotate={rotate} />}
                            >
                              {props.mangoWikiReducer.genera &&
                                props.mangoWikiReducer.genera.map(j => (
                                  <SubMenu
                                    key={`genus${j.id}`}
                                    title={
                                      <MyRouterLink
                                        onClick={handleClick1}
                                        to={`/mangowiki/news/${i.id}/${j.id}`}
                                      >
                                        Chi {j.name}
                                      </MyRouterLink>
                                    }
                                    icon={<DownIcon rotate={rotate1} />}
                                  >
                                    {props.mangoWikiReducer.genusFeatures &&
                                      props.mangoWikiReducer.genusFeatures.map(
                                        k => (
                                          <MyMI key={`genusFeature${k.id}`}>
                                            <MyRouterLink
                                              to={`/mangowiki/news/${i.id}/${
                                                j.id
                                              }/${k.id}`}
                                            >
                                              {k.name}
                                            </MyRouterLink>
                                          </MyMI>
                                        ),
                                      )}
                                  </SubMenu>
                                ))}
                            </SubMenu>
                          ))}
                      </MyInlineMenu>
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
        mContacts={props.homeReducer.contacts}
        mCheck
        mLogin={handleLogin}
        mBanner={props.homeReducer.banners}
        mBreadcrumbs={bcrData}
        mUpdate={props.updateUser}
        mThread={props.homeReducer.forumPosts}
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
  getFamilies: PropTypes.func,
  getGenera: PropTypes.func,
  getGenusFeatures: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  updateUser: PropTypes.func,
  getForumPostsByUID: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  mangoWikiReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getForumPostsByUID: data => {
    dispatch(hAction.getForumPostsByUID(data));
  },
  updateUser: data => {
    dispatch(hAction.updateUser(data));
  },
  getBanners: data => {
    dispatch(hAction.getBanners(data));
  },
  getLoginToken: data => {
    dispatch(hAction.getLoginToken(data));
  },
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(hAction.getContacts(data));
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
