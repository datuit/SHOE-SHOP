import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import './assets/css/sass/_style.scss'
import 'aos/dist/aos.css'
import 'swiper/swiper.scss'
import { checkLoggedIn } from './utils/session'

import configureStore from './redux/store'
import { Provider } from 'react-redux'

import { BrowserRouter as Router } from 'react-router-dom'

const rootElm = document.getElementById('root')

const renderApp = preloadedState => {
  const store = configureStore(preloadedState)
  window.state = store.getState

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    rootElm
  )
}

;(async () => renderApp(await checkLoggedIn()))()
