/**
 *
 * UseScript
 *
 */

import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const UseScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default UseScript;
