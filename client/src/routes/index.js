import React from 'react';
import Shop from 'Containers/Shop';
import Home from 'Containers/Home';
import Cart from 'Containers/Cart';
import SuccesBuyCart from 'Containers/SuccessBuy';
import Order from 'Containers/Order';

const routes = [
  {
    path: '/',
    exact: true,
    main: Home
  },
  {
    path: '/shoes-man',
    exact: false,
    main: () => <Shop category="Giày Nam" />
  },
  {
    path: '/shoes-woman',
    exact: false,
    main: () => <Shop category="Giày Nữ" />
  },
  {
    path: '/shoes-couple',
    exact: false,
    main: () => <Shop category="Giày Đôi" />
  },
  {
    path: '/cart',
    exact: true,
    main: Cart
  },
  {
    path: '/cart/succes-buy',
    protected: true,
    exact: false,
    main: SuccesBuyCart
  },
  {
    path: '/order',
    protected: true,
    exact: true,
    main: Order
  }
];

export default routes;
