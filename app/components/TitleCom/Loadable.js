/**
 *
 * Asynchronously loads the component for TitleCom
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
