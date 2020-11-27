/**
 *
 * Dashboard
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Card, Row, Col } from 'antd';
import { Line } from '@ant-design/charts';
import { BookOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const { Meta } = Card;

const data = [
  { year: '1991', value1: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const config = {
  data,
  height: 400,
  xField: 'year',
  yField: 'value',
  point: {
    size: 5,
    shape: 'diamond',
  },
  label: {
    style: {
      fill: '#aaa',
    },
  },
};

export function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              hoverable
              style={{ border: '1px solid silver' }}
              cover={<BookOutlined />}
            >
              <Meta title="Hình ảnh" description="86" />
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Card title" bordered={false}>
              Content
            </Card>
          </Col>
        </Row>
        <Line {...config} />
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
