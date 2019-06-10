import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/es/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import store from './store';
import RouteMap from './routes';
import './index.scss';

import theme from './assets/style/theme';

axios.defaults.headers.common.Authorization = `${process.env.GITHUB_TOKEN}`;

window.addEventListener('error', (event) => {
  if (process.env.errorHandler) {
    const {
      error: { stack },
    } = event;
    axios.post(process.env.errorHandler, { stack });
  }
});

const Root = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <RouteMap />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
