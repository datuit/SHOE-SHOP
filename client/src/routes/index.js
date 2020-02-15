import React from 'react'
import Shop from '../containers/Shop'
import Home from '../containers/Home'
import Cart from '../containers/Cart'
import SuccesBuyCart from '../components/SuccesBuyCart'

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/shoes-man',
    exact: false,
    main: props => <Shop filterCategory="Giày Nam" {...props} />
  },
  {
    path: '/shoes-woman',
    exact: false,
    main: props => <Shop filterCategory="Giày Nữ" {...props} />
  },
  {
    path: '/shoes-couple',
    exact: false,
    main: props => <Shop filterCategory="Giày Đôi" {...props} />
  },
  {
    path: '/cart',
    exact: true,
    main: props => <Cart {...props} />
  },
  {
    path: '/cart/succes-buy',
    exact: false,
    main: () => <SuccesBuyCart />
  }
]

export default routes
