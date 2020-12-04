import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import styled from 'styled-component';
// import { Layout } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelect from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import MyLayout from '../../components/MyLayout/Loadable';
import * as action from './actions';

export function WeatherMap(props) {
  useInjectReducer({ key: 'weatherMap', reducer });
  useInjectSaga({ key: 'weatherMap', saga });
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
          <MapContainer
            style={{
              height: '600px',
              width: '100%',
            }}
            center={[10.806812, 106.628666]}
            zoom={12}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=96dd3ad792ad0bba90c7443339de8e34" />
            <Marker position={[10.807033, 106.62596]}>
              <Popup>Trụ sở chính</Popup>
            </Marker>
          </MapContainer>
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
