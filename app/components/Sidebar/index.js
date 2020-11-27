/**
 *
 * Sidebar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import TitleCom from '../TitleCom/Loadable';

function Sidebar() {
  return (
    <div>
      <TitleCom
        mCategory="Văn bản hội"
        mCont={
          <div>
            <ul>
              <li>
                <a href=".">Văn bản 1</a>
              </li>
              <li>
                <a href=".">Văn bản 2</a>
              </li>
              <li>
                <a href=".">Văn bản 3</a>
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
}

Sidebar.propTypes = {};

export default memo(Sidebar);
