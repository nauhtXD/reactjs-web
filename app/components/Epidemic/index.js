/**
 *
 * Epidemic
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Card, Row, Col } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const gridStyle = {
  textAlign: 'center',
  borderRadius: '50%',
  backgroundColor: '#ED1D27',
};

const gridStyle1 = {
  width: '160px',
  backgroundColor: 'gray',
  color: 'white',
};

function Epidemic() {
  return (
    <div>
      <Card style={gridStyle1} size="small" title="dia chi, 23/12/2020">
        <div>
          <Row>
            <Col span={12}>icon</Col>
            <Col span={12}>
              <p style={gridStyle}>3</p>
            </Col>
          </Row>
        </div>
        <br />
        <div>
          <Row>
            <Col span={12}>icon</Col>
            <Col style={gridStyle} span={5}>
              3
            </Col>
          </Row>
        </div>
        {/* <Card.Grid style={gridStyle}>a</Card.Grid>
        <Card.Grid style={gridStyle}>3</Card.Grid> */}
      </Card>
    </div>
  );
}

Epidemic.propTypes = {};

export default memo(Epidemic);
