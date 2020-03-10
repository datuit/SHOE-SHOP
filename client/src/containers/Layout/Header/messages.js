import { defineMessages } from 'react-intl';

export const scope = 'containers.layout.header';

export default defineMessages({
  navbar: {
    men: {
      id: `${scope}.navbar.men`,
      defaultMessage: 'giày nam'
    },
    women: {
      id: `${scope}.navbar.women`,
      defaultMessage: 'giày nữ'
    },
    couple: {
      id: `${scope}.navbar.couple`,
      defaultMessage: 'giày đôi'
    }
  },
  menu: {
    guest: {
      id: `${scope}.menu.guest`,
      defaultMessage: 'Chào khách'
    },
    login: {
      id: `${scope}.menu.login`,
      defaultMessage: 'Login'
    },
    logout: {
      id: `${scope}.menu.logout`,
      defaultMessage: 'Logout'
    },
    order: {
      id: `${scope}.menu.order`,
      defaultMessage: 'Order'
    }
  },
  logo: {
    id: `${scope}.logo`,
    defaultMessage: 'Thành Đạt'
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Tìm kiếm'
  }
});
