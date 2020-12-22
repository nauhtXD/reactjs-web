import React, { memo, useEffect, useState } from 'react';
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
  Marker,
  Popup,
} from 'react-leaflet';

import moment from 'moment';
import EMarker from 'react-leaflet-enhanced-marker';

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
import WeatherHistory from '../../components/WeatherHistory/index';

const API_KEY = 'f9b8a21d57e020513b5c7e50113dd4ea';
const mZoom = 10;

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

const cityList = [];
const llCityList = [];
const geoCityList = [];

const dB = [];

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
  const [history5D, setHis] = useState([]);
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getHeadquarters();
    props.getMarks();
    props.getContacts();
    axios
      .get(`http://localhost:8080/api/${endpoint.API_ENDPOINT_GET_CITY_LIST}`)
      .then(res => {
        const wData = res.data.data;
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

  const handleClick = (lat, lon) => {
    setHis([]);
    for (let i = 5; i > 0; i -= 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${moment()
            .subtract(i, 'days')
            .unix()}&lang=vi&appid=${API_KEY}`,
        )
        .then(res => {
          setHis(j => [...j, res.data.current]);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>WeatherMap</title>
        <meta name="description" content="Description of WeatherMap" />
      </Helmet>
      <MyLayout
        mCont={
          <div>
            <Map
              style={{
                height: '400px',
                width: '100%',
              }}
              center={
                props.homeReducer.headquarters.province && [
                  props.homeReducer.headquarters.province.latitude,
                  props.homeReducer.headquarters.province.longitude,
                ]
              }
              zoom={mZoom}
            >
              <LayersControl position="topright">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.weatherMapReducer.contacts &&
                  props.weatherMapReducer.contacts.map(i => (
                    <Marker
                      key={i.id}
                      position={[i.province.latitude, i.province.longitude]}
                    >
                      <Popup>{i.name}</Popup>
                    </Marker>
                  ))}
                <LayersControl.BaseLayer checked name="Thời tiết">
                  <LayerGroup>
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    />
                    {props.weatherMapReducer.weathers[0] &&
                      props.weatherMapReducer.weathers.map((i, index) => (
                        <EMarker
                          key={i.id}
                          icon={
                            <EnhancedMarker
                              mName={i.name}
                              mDescription={i.weather[0].description}
                              mIcon={i.weather[0].icon}
                              mTemp={i.main.temp}
                            />
                          }
                          position={[
                            llCityList[index].latitude,
                            llCityList[index].longitude,
                          ]}
                          onClick={() =>
                            handleClick(
                              llCityList[index].latitude,
                              llCityList[index].longitude,
                            )
                          }
                        />
                      ))}
                  </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dịch bệnh">
                  <LayerGroup>
                    {llCityList.length > 0 &&
                      llCityList.map(i => (
                        <EMarker
                          key={i.latitude}
                          icon="dich benh"
                          position={[i.latitude, i.longitude]}
                          onClick={() => handleClick(i.latitude, i.longitude)}
                        />
                      ))}
                  </LayerGroup>
                </LayersControl.BaseLayer>
                {geoCityList.length > 0 && <GeoJSON data={geoCityList} />}
              </LayersControl>
            </Map>
            {history5D.length > 0 && <WeatherHistory mHistory={history5D} />}
          </div>
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
