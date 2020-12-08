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
// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import TempCom from '../../components/TempCom/Loadable';
import * as action from './actions';

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
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
            {props.weatherMapReducer.marks &&
              props.weatherMapReducer.marks.length > 0 &&
              props.weatherMapReducer.marks.map(i => (
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
        mCategories={props.weatherMapReducer.categories}
        mSubCategories={props.weatherMapReducer.subCategories}
        mMarks={props.weatherMapReducer.marks}
        mContacts={props.weatherMapReducer.contacts}
      />
    </div>
  );
}

WeatherMap.propTypes = {
  weatherMapReducer: PropTypes.any,
  getCategories: PropTypes.func,
  getSubCategories: PropTypes.func,
  getContacts: PropTypes.func,
  getMarks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  weatherMapReducer: makeSelect(),
});

const mapDispatchToProps = dispatch => ({
  getCategories: data => {
    dispatch(action.getCategories(data));
  },
  getSubCategories: data => {
    dispatch(action.getSubCategories(data));
  },
  getContacts: data => {
    dispatch(action.getContacts(data));
  },
  getMarks: data => {
    dispatch(action.getMarks(data));
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
