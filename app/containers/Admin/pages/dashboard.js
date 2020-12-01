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
import { BookOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const { Meta } = Card;

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
