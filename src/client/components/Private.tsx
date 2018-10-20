import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={props => (auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />)} />
);
