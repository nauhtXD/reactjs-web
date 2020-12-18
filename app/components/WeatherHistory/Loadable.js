/**
 *
 * Asynchronously loads the component for WeatherHistory
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
