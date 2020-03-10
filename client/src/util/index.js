import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ session: { userId } }) => ({
  isLogin: Boolean(userId)
});

const Protected = route => {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      component={() =>
        route.isLogin ? <route.main {...route} /> : <Redirect to="/" />
      }
    />
  );
};

const RouteWithSubRoute = route => {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      component={() => <route.main {...route} />}
    />
  );
};

export const RouteWithSubRoutes = withRouter(
  connect(mapStateToProps)(RouteWithSubRoute)
);
export const ProtectedRouter = withRouter(connect(mapStateToProps)(Protected));
