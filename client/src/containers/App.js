import React from 'react'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import { Switch } from 'react-router-dom'
import Routes from '../routes'
import { RouteWithSubRoutes } from '../utils'

const MainApp = () => {
  return (
    <>
      <Header />
      <main>
        <Switch>
          {Routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </main>
      <Footer />
    </>
  )
}

export default MainApp
