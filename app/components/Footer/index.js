/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { MapContainer, TileLayer, Marker, Form } from 'react-leaflet';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Footer(props) {
  return (
    <div style={{ marginTop: '20px', backgroundColor: '#036921' }}>
      <Row>
        <Col span={12}>
          <Row>
            <MapContainer
              style={{
                height: '300px',
                width: '80%',
                float: 'right',
                margin: '10px auto',
              }}
              center={[10.806812, 106.628666]}
              zoom={15}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[10.806812, 106.628666]} />
              <Marker position={[10.807033, 106.62596]} />
            </MapContainer>
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
          <h2 style={{ color: '#ffff00' }}>{props.mTitle}</h2>
          <p>Địa chỉ: {props.mAddress}</p>
          <p>Điện thoại: {props.mPhone}</p>
          <p>Fax: {props.mFax}</p>
          <p>Email: {props.mEmail}</p>
        </Col>
      </Row>
    </div>
  );
}

Footer.propTypes = {
  mLeft: PropTypes.number,
  mRight: PropTypes.number,
  mTitle: PropTypes.string,
  mAddress: PropTypes.string,
  mPhone: PropTypes.string,
  mFax: PropTypes.string,
  mEmail: PropTypes.string,
};

export default memo(Footer);
