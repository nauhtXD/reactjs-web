/**
 *
 * Asynchronously loads the component for Documents
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
