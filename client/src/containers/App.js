import React, { Fragment } from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { Switch } from 'react-router-dom';
import Routes from 'Routes';
import { RouteWithSubRoutes, ProtectedRouter } from '../util';

const MainApp = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          {Routes.map((route, i) => {
            if (route.protected) {
              return <ProtectedRouter key={i} {...route} />;
            } else {
              return <RouteWithSubRoutes key={i} {...route} />;
            }
          })}
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
};

export default MainApp;
