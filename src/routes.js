import React from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router';
import HomePage from './pages/Home';

const routes = [
  {
    path: '/Home',
    component: withRouter(HomePage),
    exact: true,
  },
];

const RouteMap = () => (
  <React.Fragment>
    <Switch>
      {routes.map(item => <Route {...item} key={item.path} />)}
      <Redirect exact from="*" to="/home" />
    </Switch>
  </React.Fragment>
);

export default RouteMap;
