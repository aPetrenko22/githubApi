import { runSaga } from 'redux-saga';
import { HANDLERS } from '../effects';
import {
  getRepositoriesSuccess, errorHandler, getRepositories, bounceChange,
} from '../actions';
import * as api from '../api';

test('should load and get repositories in case of success', async () => {
  const dispatchedActions = [];
  const getRepositoriesSaga = HANDLERS[getRepositories];

  api.getUserInfo = jest.fn(() => Promise.resolve({ data: 'success' }));
  api.getUserRepos = jest.fn(() => Promise.resolve({ data: 'success' }));

  const fakeStore = {
    getState: () => ({ home: { searchValue: 'gaearon' } }),
    dispatch: action => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, getRepositoriesSaga).done;

  expect(api.getUserInfo.mock.calls).toHaveLength(1);
  expect(api.getUserRepos.mock.calls).toHaveLength(1);
  expect(dispatchedActions).toContainEqual(
    getRepositoriesSuccess({ info: 'success', repositories: 'success' }),
    bounceChange(),
  );
});

test('should repositoriest load errors', async () => {
  const dispatchedActions = [];
  const getRepositoriesSaga = HANDLERS[getRepositories];

  const error = { response: { data: { message: 'API server is down' } } };
  api.getUserInfo = jest.fn(() => Promise.reject(error));
  api.getUserRepos = jest.fn(() => Promise.reject(error));

  const fakeStore = {
    dispatch: action => dispatchedActions.push(action),
    getState: () => ({ home: { searchValue: 'gaearon' } }),
  };

  await runSaga(fakeStore, getRepositoriesSaga).done;

  expect(api.getUserInfo.mock.calls).toHaveLength(1);
  expect(api.getUserRepos.mock.calls).toHaveLength(1);
  expect(dispatchedActions).toContainEqual(errorHandler(error.response.data.message));
});
