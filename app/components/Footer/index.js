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
import { primaryColor } from '../Style/index';

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
    <div style={{ marginTop: '1.5163vw', backgroundColor: `${primaryColor}` }}>
      <Row>
        <Col span={12}>
          <Row>
            <Map
              style={{
                height: '22.7445vw',
                width: '95%',
                float: 'right',
                margin: '1.14vw auto',
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
            margin: '1.14vw auto',
            color: '#fff',
          }}
        >
          {center && (
            <div>
              <p style={{ color: '#ffff00', fontSize: '1.213vw' }}>
                <b>{center.name}</b>
              </p>
              <div style={{ fontSize: '1.06141vw' }}>
                <p>Địa chỉ: {center.address}</p>
                <p>Điện thoại: {center.phone}</p>
                <p>Fax: {center.fax}</p>
                <p>Email: {center.email}</p>
              </div>
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
