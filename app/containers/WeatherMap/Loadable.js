/**
 *
 * Asynchronously loads the component for WeatherMap
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
