import reduceReducers, { reducer } from '../reducer';

describe('home reducer', () => {
  it('should return the initial state', () => {
    expect(reduceReducers(undefined, {})).toEqual(reducer);
  });
});
