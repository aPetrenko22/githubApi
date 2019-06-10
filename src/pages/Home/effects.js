import {
  takeEvery, call, select, put, all,
} from 'redux-saga/effects';
import {
  getRepositories,
  getRepositoriesSuccess,
  errorHandler,
  popapErrorChange,
  bounceChange,
} from './actions';

import { getUserInfo, getUserRepos } from './api';

export const HANDLERS = {
  * [getRepositories]() {
    const searchValue = yield select(state => state.home.searchValue);
    try {
      const [response, rep] = yield all([
        call(getUserInfo, searchValue),
        call(getUserRepos, searchValue),
      ]);

      yield put(getRepositoriesSuccess({ repositories: rep.data, info: response.data }));
      yield put(bounceChange());
    } catch (err) {
      yield put(errorHandler(err.response.data.message));
      yield put(popapErrorChange(true));
    }
  },
};
export function* sagaWatcher({ type, payload }) {
  const handler = HANDLERS[type];
  if (handler != null) yield handler(payload);
}

export default function* sagaReducerAuth() {
  yield takeEvery('*', sagaWatcher);
}
