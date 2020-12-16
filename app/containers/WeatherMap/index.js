import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
// import styled from 'styled-components';

import {
  Map,
  TileLayer,
  LayerGroup,
  GeoJSON,
  LayersControl,
} from 'react-leaflet';

import Marker from 'react-leaflet-enhanced-marker';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as endpoint from 'utils/endPoint';

import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as action from './actions';

import makeSelectHome from '../Home/selectors';
import * as hAction from '../Home/actions';

// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TempCom from '../../components/TempCom/Loadable';
import EnhancedMarker from '../../components/EnhancedMarker/index';

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

let cityList = [];
let llCityList = [];
let geoCityList = [];
const dB = [];

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getHeadquarters();
    props.getMarks();
    axios
      .get(`http://localhost:8080/api/${endpoint.API_ENDPOINT_GET_CITY_LIST}`)
      .then(res => {
        const wData = res.data.data;
        cityList = [];
        llCityList = [];
        geoCityList = [];
        wData.map(
          i =>
            cityList.indexOf(i.province.weatherId) === -1 &&
            cityList.push(i.province.weatherId) &&
            llCityList.push({
              latitude: i.province.latitude,
              longitude: i.province.longitude,
            }) &&
            geoCityList.push(i.province.geo),
        );
        props.getWeathers({
          data: cityList,
          key: API_KEY,
        });
      });
  }, []);
  console.log(geoCityList);
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
            <LayersControl position="topright">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* {props.homeReducer.marks &&
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
                ))} */}
              <LayersControl.BaseLayer checked name="Thời tiết">
                <TileLayer
                  url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Dịch bệnh">
                <LayerGroup>
                  {props.weatherMapReducer.weathers[0] &&
                    props.weatherMapReducer.weathers.map((i, index) => (
                      <Marker
                        key={i.id}
                        icon={
                          <EnhancedMarker
                            mDescription={i.weather[0].description}
                            mIcon={i.weather[0].icon}
                            mTemp={i.main.temp}
                          />
                        }
                        position={[
                          llCityList[index].latitude,
                          llCityList[index].longitude,
                        ]}
                      />
                    ))}
                </LayerGroup>
              </LayersControl.BaseLayer>
              {geoCityList.length > 0 && <GeoJSON data={geoCityList} />}
            </LayersControl>
          </Map>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mMarks={props.homeReducer.marks}
        mContacts={props.homeReducer.headquarters}
        mBreadcrumbs={bcrData}
      />
    </div>
  );
}

WeatherMap.propTypes = {
  homeReducer: PropTypes.any,
  weatherMapReducer: PropTypes.any,
  getWeathers: PropTypes.func,
  getContacts: PropTypes.func,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getHeadquarters: PropTypes.func,
  getMarks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  weatherMapReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getWeathers: data => {
    dispatch(action.getWeathers(data));
  },
  getContacts: data => {
    dispatch(action.getContacts(data));
  },
  getCategories: data => {
    dispatch(hAction.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(hAction.getSubCategories(data));
  },
  getHeadquarters: data => {
    dispatch(hAction.getHeadquarters(data));
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
