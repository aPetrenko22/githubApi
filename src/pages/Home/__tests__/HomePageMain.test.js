import React from 'react';
import { mount } from 'enzyme';

import configureStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import EnzymeToJson from 'enzyme-to-json';

import HomePageMain from '../index';

describe('HomePageMain', () => {
  it('HomePageMain should render correctly in "debug" mode', () => {
    const mockStore = configureStore();

    const store = mockStore({
      home: {
        user: 'Kirill',
      },
    });

    const component = mount(
      <Provider store={store}>
        <HomePageMain debug />
      </Provider>,
    );

    expect(EnzymeToJson(component)).toMatchSnapshot();
  });
});
