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
import { CenterDiv } from '../../../components/Style/index';

const { Meta } = Card;

export function Dashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <div>
        <CenterDiv>
          <Card
            hoverable
            style={{ border: '1px solid silver', margin: 'auto 10px' }}
            cover={<BookOutlined style={{ margin: '10px auto auto auto' }} />}
          >
            <Meta title="Hình ảnh" description="86" />
          </Card>
          <Card
            hoverable
            style={{ border: '1px solid silver', margin: 'auto 10px' }}
            cover={<BookOutlined />}
          >
            <Meta title="Hình ảnh" description="86" />
          </Card>
          <Card
            hoverable
            style={{ border: '1px solid silver', margin: 'auto 10px' }}
            cover={<BookOutlined />}
          >
            <Meta title="Hình ảnh" description="86" />
          </Card>
          <Card
            hoverable
            style={{ border: '1px solid silver', margin: 'auto 10px' }}
            cover={<BookOutlined />}
          >
            <Meta title="Hình ảnh" description="86" />
          </Card>
        </CenterDiv>
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
