/**
 *
 * Footer
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Map, TileLayer, Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const mZoom = 10;
function Footer(props) {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    props.mContacts.map(
      i =>
        i.isHeadquarters === true &&
        setCenter({
          latitude: i.province.latitude,
          longitude: i.province.longitude,
          name: i.name,
          address: i.address,
          fax: i.fax,
          email: i.email,
          phone: i.phone,
        }),
    );
  }, [props.mContacts]);

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
              center={center && [center.latitude, center.longitude]}
              zoom={mZoom}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {props.mContacts &&
                props.mContacts.map(i => (
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
          {center && (
            <div>
              <h2 style={{ color: '#ffff00' }}>{center.name}</h2>
              <p>Địa chỉ: {center.address}</p>
              <p>Điện thoại: {center.phone}</p>
              <p>Fax: {center.fax}</p>
              <p>Email: {center.email}</p>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

Footer.propTypes = {
  mContacts: PropTypes.any,
};

export default memo(Footer);
