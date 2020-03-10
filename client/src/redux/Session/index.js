import { LOGOUT_SESSION, REFRESH_SESSION } from './constants';

const _nullSession = {
  userId: null,
  username: null
};
export default (state = _nullSession, { type, user }) => {
  Object.freeze(state);
  switch (type) {
    case REFRESH_SESSION:
      return user;
    case LOGOUT_SESSION:
      return _nullSession;
    default:
      return state;
  }
};
