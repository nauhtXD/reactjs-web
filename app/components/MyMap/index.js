/**
 *
 * MyMap
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Map, TileLayer, Marker } from 'react-leaflet';

const mZoom = 10;
let k = -1;

function MyMap(props) {
  const [currCenter, setCurrCenter] = useState([10.83333, 106.666672]);
  const [currPos, setCurrPos] = useState(null);

  useEffect(() => {
    if (k !== -1)
      setCurrCenter([props.mCenter.latitude, props.mCenter.longitude]);
    k = 0;
  }, [props.mCenter]);

  useEffect(() => {
    if (props.value && props.value.lat) {
      setCurrPos(props.value);
      setCurrCenter(props.value.center);
    }
  }, [props.value]);

  const handleClick = e => {
    setCurrPos(e.latlng);
    props.mPos(e.latlng);
  };

  return (
    <div>
      <Map
        style={{
          height: '26.54vw',
          width: '150%',
        }}
        zoom={mZoom}
        center={currCenter}
        onclick={handleClick}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currPos && <Marker position={currPos} />}
      </Map>
    </div>
  );
}

MyMap.propTypes = {
  mCenter: PropTypes.any,
  mPos: PropTypes.func,
  value: PropTypes.any,
};

export default memo(MyMap);
