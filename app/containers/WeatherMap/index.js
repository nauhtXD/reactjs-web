import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';
// import { Row, Col } from 'antd';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as action from './actions';

import makeSelectHome from '../Home/selectors';
import hReducer from '../Home/reducer';
import hSaga from '../Home/saga';
import * as hAction from '../Home/actions';

// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TempCom from '../../components/TempCom/Loadable';

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
  useInjectReducer({ key: 'home', reducer: hReducer });
  useInjectSaga({ key: 'home', saga: hSaga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
  }, []);
  return (
    <div>
      <Helmet>
        <title>WeatherMap</title>
        <meta name="description" content="Description of WeatherMap" />
      </Helmet>
      <MyLayout
        mCont={
          <Map
            style={{
              height: '600px',
              width: '100%',
            }}
            center={[10.806812, 106.628666]}
            zoom={10}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=96dd3ad792ad0bba90c7443339de8e34" />
            {props.homeReducer.marks &&
              props.homeReducer.marks.length > 0 &&
              props.homeReducer.marks.map(i => (
                <Marker key={i.id} position={[i.latitude, i.longitude]}>
                  <Popup>
                    <div
                      style={{
                        width: '220px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage:
                          'linear-gradient(to bottom,#feb020,#ffd05c)',
                      }}
                    >
                      <div>
                        <p>London, GB</p>
                        <p>fog</p>
                      </div>
                      <img
                        src="http://openweathermap.org/img/wn/10d@2x.png"
                        alt="example"
                      />
                      <div>
                        <p>min|max</p>
                      </div>
                    </div>
                    <p>dich benh</p>
                  </Popup>
                </Marker>
              ))}
            <TempCom />
          </Map>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mMarks={props.homeReducer.marks}
        mContacts={props.homeReducer.contacts}
      />
    </div>
  );
}

WeatherMap.propTypes = {
  homeReducer: PropTypes.any,
  weatherMapReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getMarks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  weatherMapReducer: makeSelect(),
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WeatherMap);
