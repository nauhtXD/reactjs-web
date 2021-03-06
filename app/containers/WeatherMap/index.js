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
import _ from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as action from './actions';

import makeSelectHome from '../Home/selectors';
import * as hAction from '../Home/actions';

import MyLayout from '../../components/MyLayout/Loadable';
import EnhancedMarker from '../../components/EnhancedMarker/index';
import WeatherHistory from '../../components/WeatherHistory/index';
import Epidemic from '../../components/Epidemic/index';
import { API_KEY } from '../../components/Style/index';

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

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });

  const [history5D, setHis] = useState([]);
  const [center, setCenter] = useState(null);
  const [geo, setGeo] = useState({
    lat: [],
    lon: [],
    geo: [],
  });
  const [epidemic, setEpidemic] = useState(null);

  useEffect(() => {
    props.getCityList();
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getLastestDocuments(4);
    props.getBanners();
    props.countEpidemics();
  }, []);

  useEffect(() => {
    props.homeReducer.contacts.map(
      i =>
        i.isHeadquarters === true &&
        setCenter({
          latitude: i.province.latitude,
          longitude: i.province.longitude,
        }),
    );
  }, [props.homeReducer.contacts]);

  useEffect(() => {
    const dataList = props.homeReducer.cityList.map(i => i.province.weatherId);
    if (dataList.length > 0)
      props.getWeathers({
        data: [...new Set(dataList)],
        key: API_KEY,
      });
    const geoData = props.homeReducer.cityList.map(i => i.province.geo);
    if (geoData.length > 0) setGeo([...new Set(geoData)]);
  }, [props.homeReducer.cityList]);

  useEffect(() => {
    if (props.weatherMapReducer.countEpidemics.length > 0) {
      const t = _.partition(
        _.groupBy(props.weatherMapReducer.countEpidemics, 'province'),
        (value, i) => i % 2 === 0,
      );
      setEpidemic(t);
    }
  }, [props.weatherMapReducer.countEpidemics]);

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
          window.location.href = '#weatherHistory';
        });
    }
  };

  const handleEpidemic = (lat, lon) => {
    console.log(lat, lon);
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
                height: '40vw',
                width: '100%',
                zIndex: 1,
              }}
              center={center && [center.latitude, center.longitude]}
              zoom={mZoom}
            >
              <LayersControl position="topright">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.homeReducer.contacts &&
                  props.homeReducer.contacts.map(i => (
                    <Marker key={i.id} position={[i.latitude, i.longitude]}>
                      <Popup>{i.name}</Popup>
                    </Marker>
                  ))}
                <LayersControl.BaseLayer checked name="Thời tiết">
                  <LayerGroup>
                    <TileLayer
                      url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    />
                    {props.homeReducer.weathers.length > 0 &&
                      props.homeReducer.weathers.map(i => (
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
                          position={[i.coord.lat, i.coord.lon]}
                          onClick={() => handleClick(i.coord.lat, i.coord.lon)}
                        />
                      ))}
                  </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Dịch bệnh">
                  <LayerGroup>
                    {epidemic &&
                      epidemic[1].map((i, index) => (
                        <EMarker
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          icon={<Epidemic mData={i} />}
                          position={[i[0].lat, i[0].lon]}
                          onClick={() => handleEpidemic(i[0].lat, i[0].lon)}
                        />
                      ))}
                  </LayerGroup>
                </LayersControl.BaseLayer>
                {geo.length > 0 && <GeoJSON data={geo} />}
              </LayersControl>
            </Map>
            <div id="weatherHistory" />
            {history5D.length > 0 && <WeatherHistory mHistory={history5D} />}
          </div>
        }
        mCategories={props.homeReducer.categories}
        mSubCategories={props.homeReducer.subCategories}
        mContacts={props.homeReducer.contacts}
        mBreadcrumbs={bcrData}
        mCreateReport={props.createProblem}
        mDocuments={props.homeReducer.lastestDocuments}
        mWeathers={props.homeReducer.weathers}
        mLogin={handleLogin}
        mBanner={props.homeReducer.banners}
        mUpdate={props.updateUser}
        mThread={props.homeReducer.forumPosts}
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
  getCityList: PropTypes.func,
  createProblem: PropTypes.func,
  getLastestDocuments: PropTypes.func,
  getLoginToken: PropTypes.func,
  getBanners: PropTypes.func,
  countEpidemics: PropTypes.func,
  updateUser: PropTypes.func,
  getForumPostsByUID: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homeReducer: makeSelectHome(),
  weatherMapReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getForumPostsByUID: data => {
    dispatch(hAction.getForumPostsByUID(data));
  },
  updateUser: data => {
    dispatch(hAction.updateUser(data));
  },
  countEpidemics: data => {
    dispatch(action.countEpidemics(data));
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
  getCityList: data => {
    dispatch(hAction.getCityList(data));
  },
  getWeathers: data => {
    dispatch(hAction.getWeathers(data));
  },
  createProblem: data => {
    dispatch(hAction.createProblem(data));
  },
  getLastestDocuments: data => {
    dispatch(hAction.getLastestDocuments(data));
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
