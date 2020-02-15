import React from 'react'
import { Route } from 'react-router-dom'

export const RouteWithSubRoutes = route => {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => <route.main {...props} route={route} />}
    />
  )
}
