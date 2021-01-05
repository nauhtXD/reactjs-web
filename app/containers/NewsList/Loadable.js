/**
 *
 * Asynchronously loads the component for NewsList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
