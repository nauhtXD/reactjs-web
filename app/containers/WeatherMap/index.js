import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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

const mData = [
  {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [105.0883255, 10.76043224],
              [105.09790039, 10.76532078],
              [105.10116577, 10.74414539],
              [105.11474609, 10.71973896],
              [105.12457275, 10.70978546],
              [105.12782288, 10.72404003],
              [105.13466644, 10.74418354],
              [105.13716125, 10.75536728],
              [105.13541412, 10.76647568],
              [105.13954926, 10.77124882],
              [105.16007233, 10.7814436],
              [105.15827942, 10.8093214],
              [105.15106201, 10.89872456],
              [105.12864685, 10.90541458],
              [105.13304138, 10.91682816],
              [105.13226318, 10.92151546],
              [105.10920715, 10.9176178],
              [105.10006714, 10.9216032],
              [105.11470032, 10.94008255],
              [105.11812592, 10.94891644],
              [105.11765289, 10.96028233],
              [105.1131897, 10.9620676],
              [105.1036911, 10.95687008],
              [105.09247589, 10.95463848],
              [105.08377838, 10.9560957],
              [105.08013916, 10.95305061],
              [105.07835388, 10.93482494],
              [105.06811523, 10.937397],
              [105.05272675, 10.92765522],
              [105.05577087, 10.9158535],
              [105.04315948, 10.9105978],
              [105.04736328, 10.90187263],
              [105.04132843, 10.8968277],
              [105.02843475, 10.89156055],
              [105.03429413, 10.8696146],
              [105.05445862, 10.82912254],
              [105.05817413, 10.82019138],
              [105.05581665, 10.80400276],
              [105.06224823, 10.79805946],
              [105.06388092, 10.78098106],
              [105.07551575, 10.77719688],
              [105.0883255, 10.76043224],
            ],
          ],
        },
        properties: {
          GID_0: 'VNM',
          NAME_0: 'Vietnam',
          GID_1: 'VNM.1_1',
          NAME_1: 'An Giang',
          NL_NAME_1: '',
          GID_2: 'VNM.1.1_1',
          NAME_2: 'An Phú',
          VARNAME_2: 'An Phu',
          NL_NAME_2: '',
          TYPE_2: 'Huyện',
          ENGTYPE_2: 'District',
          CC_2: '',
          HASC_2: 'VN.TT.AL',
        },
      },
    ],
  },
];

const cityList = [];
const dB = [];

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
  useEffect(() => {
    props.getCategories();
    props.getSubCategories();
    props.getContacts();
    props.getMarks();
  }, []);
  if (props.homeReducer.contacts && props.homeReducer.contacts.province) {
    props.homeReducer.contacts.map(i =>
      cityList.push([
        i.province.weatherId,
        i.province.latitude,
        i.province.longitude,
      ]),
    );
    const { weatherId } = cityList;
    console.log(weatherId);
    // const wD = {
    //   weatherId,
    //   key: API_KEY,
    // };
    // props.getWeather(wD);
  }
  // if (props.homeReducer.marks && props.homeReducer.marks.length > 0) {
  //   props.homeReducer.marks.map(i =>
  //     dB.push(
  //       <Marker
  //         key={i.id}
  //         icon={
  //           <EnhancedMarker
  //             mName={i.contact && i.contact.name}
  //             mDescription={i.description}
  //             mIcon={i.icon}
  //             mTemp={i.temp}
  //           />
  //         }
  //         position={[i.latitude, i.longitude]}
  //       />,
  //     ),
  //   );
  // }

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
                <LayerGroup>{dB}</LayerGroup>
              </LayersControl.BaseLayer>
              <TempCom />
              <GeoJSON data={mData} />
            </LayersControl>
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
