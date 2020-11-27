/**
 *
 * Asynchronously loads the component for Crops
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
