import React from 'react';
import Shop from '../containers/Shop';
import Home from '../containers/Home';
import Cart from '../containers/Cart';
import SuccesBuyCart from '../containers/SuccessBuy';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/shoes-man',
    exact: false,
    main: props => <Shop category="Giày Nam" {...props} />
  },
  {
    path: '/shoes-woman',
    exact: false,
    main: props => <Shop category="Giày Nữ" {...props} />
  },
  {
    path: '/shoes-couple',
    exact: false,
    main: props => <Shop category="Giày Đôi" {...props} />
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
];

export default routes;
