/**
 *
 * Asynchronously loads the component for MyStorage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
