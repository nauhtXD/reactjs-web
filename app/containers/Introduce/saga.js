import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as api from 'api/Introduce';
import { notification } from 'antd';
import * as types from './constants';

// export function* getIntroduceSaga({ data }) {
//   try {
//     const response = yield call(api.getIntroducePage, data);
//     if (response && response.status === 200 && response.data.code === 200) {
//       yield put({
//         type: types.DEFAULT_ACTION_SUCCESS,
//         data: response.data.data,
//       });
//     } else {
//       yield put({
//         type: types.DEFAULT_ACTION_FAIL,
//         error: response && response.data ? response.data.messages : 'API Error',
//       });
//       notification.error({
//         message: 'Error',
//         description:
//           response && response.data ? response.data.messages : 'API Error',
//       });
//     }
//   } catch (err) {
//     yield put({
//       type: types.DEFAULT_ACTION_FAIL,
//       error: err,
//     });
//     notification.error({
//       message: 'Error',
//       description: err,
//     });
//   }
// }

export default function* rootSaga() {
  // yield all([takeLatest(types.DEFAULT_ACTION, getIntroduceSaga)]);
}
