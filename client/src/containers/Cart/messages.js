import { defineMessages } from 'react-intl';

export const scope = 'containers.cart';

export default defineMessages({
  table: {
    image: {
      id: `${scope}.image`
    },
    name: {
      id: `${scope}.name`
    },
    price: {
      id: `${scope}.price`
    },
    quantity: {
      id: `${scope}.quantity`
    },
    total: {
      id: `${scope}.total`
    },
    remove: {
      id: `${scope}.remove`
    }
  },
  totalcart: {
    id: `${scope}.totalcart`
  },
  total: {
    id: `${scope}.total`
  },
  address: {
    id: `${scope}.address`
  },
  addaddress: {
    id: `${scope}.addaddress`
  },
  onaddaddress: {
    id: `${scope}.onaddaddress`
  },
  empty: {
    id: `${scope}.empty`
  },
  pay: {
    id: `${scope}.pay`
  }
});
