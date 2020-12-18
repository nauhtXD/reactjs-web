/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { Map, TileLayer, Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const mZoom = 15;
function Footer(props) {
  return (
    <div style={{ marginTop: '20px', backgroundColor: '#036921' }}>
      <Row>
        <Col span={12}>
          <Row>
            <Map
              style={{
                height: '300px',
                width: '80%',
                float: 'right',
                margin: '10px auto',
              }}
              center={
                props.mContacts.province && [
                  props.mContacts.province.latitude,
                  props.mContacts.province.longitude,
                ]
              }
              zoom={mZoom}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {props.mMarks &&
                props.mMarks.length > 0 &&
                props.mMarks.map(i => (
                  <Marker key={i.id} position={[i.latitude, i.longitude]} />
                ))}
            </Map>
          </Row>
        </Col>
        <Col
          span={12}
          style={{
            textAlign: 'left',
            margin: '10px auto',
            color: '#fff',
          }}
        >
          <h2 style={{ color: '#ffff00' }}>{props.mContacts.name}</h2>
          <p>Địa chỉ: {props.mContacts.address}</p>
          <p>Điện thoại: {props.mContacts.phone}</p>
          <p>Fax: {props.mContacts.fax}</p>
          <p>Email: {props.mContacts.email}</p>
        </Col>
      </Row>
    </div>
  );
}

Footer.propTypes = {
  mMarks: PropTypes.any,
  mContacts: PropTypes.any,
};

export default memo(Footer);
