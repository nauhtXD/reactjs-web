/**
 *
 * Footer
 *
 */

import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Footer() {
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
          <h2 style={{ color: '#ffff00' }}>HỘI QUÁN NÔNG DÂN</h2>
          <p>Địa chỉ: 140 Lê Trọng Tấn, Phường Tây Thạnh, Quận Tân Phú.</p>
          <p>Điện thoại: 0373185504</p>
          <p>Fax:</p>
          <p>Email: thuylovei113@gmail.com</p>
        </Col>
      </Row>
    </div>
  );
}

Footer.propTypes = {};

export default memo(Footer);
