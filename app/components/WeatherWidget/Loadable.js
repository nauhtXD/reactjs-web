/**
 *
 * Asynchronously loads the component for WeatherWidget
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
