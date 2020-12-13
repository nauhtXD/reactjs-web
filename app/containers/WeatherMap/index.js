import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-components';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import kToC from 'kelvin-to-celsius';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as action from './actions';

import makeSelectHome from '../Home/selectors';
import * as hAction from '../Home/actions';

// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TempCom from '../../components/TempCom/Loadable';

const API_KEY = 'f9b8a21d57e020513b5c7e50113dd4ea';
const bcrData = [
  {
    name: 'Nhà nông cần biết',
    menu: [
      {
        link: '/Crops',
        name: 'Kỹ thuật trồng trọt',
      },
      {
        link: '/Crops',
        name: 'Phòng trừ sâu bệnh',
      },
    ],
  },
  {
    name: 'Thông tin thời tiết',
  },
];

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
  }, []);
  const handleClick = (lat, lon) => {
    const mData = { lat, lon, key: API_KEY };
    props.getWeather(mData);
  };
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
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />
            {props.homeReducer.marks &&
              props.homeReducer.marks.length > 0 &&
              props.homeReducer.marks.map(i => (
                <Marker
                  key={i.id}
                  position={[i.latitude, i.longitude]}
                  onclick={() => handleClick(i.latitude, i.longitude)}
                >
                  <Popup>
                    {props.weatherMapReducer.weather && (
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
                          <p>{props.weatherMapReducer.weather.description}</p>
                        </div>
                        <img
                          src={`http://openweathermap.org/img/wn/${
                            props.weatherMapReducer.weather.icon
                          }@2x.png`}
                          alt="example"
                        />
                        <div>
                          <p>
                            {props.weatherMapReducer.weather.temp &&
                              kToC(props.weatherMapReducer.weather.temp)}
                            °C
                          </p>
                        </div>
                      </div>
                    )}
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
        mBreadcrumbs={bcrData}
      />
    </div>
  );
}

WeatherMap.propTypes = {
  homeReducer: PropTypes.any,
  weatherMapReducer: PropTypes.any,
  getWeather: PropTypes.func,
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
  getWeather: data => {
    dispatch(action.getWeather(data));
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
