/*
 * WeatherWidget Messages
 *
 * This contains all the text for the WeatherWidget component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.WeatherWidget';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the WeatherWidget component!',
  },
});
