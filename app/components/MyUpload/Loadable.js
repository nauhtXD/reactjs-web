/**
 *
 * Asynchronously loads the component for MyUpload
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
