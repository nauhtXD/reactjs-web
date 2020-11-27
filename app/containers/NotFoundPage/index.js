/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

import messages from './messages';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle={<FormattedMessage {...messages.pageNotFound} />}
      extra={
        <Link to="/">
          <Button type="primary">
            <FormattedMessage {...messages.backHome} />
          </Button>
        </Link>
      }
    />
  );
}
