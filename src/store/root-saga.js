import { fork, all } from 'redux-saga/effects';
import homeEffects from '../pages/Home/effects';

export default function* () {
  yield all([
    fork(homeEffects),
  ]);
}

export {
  homeEffects,
};
