import * as Types from '../../constants/actionTypes';
import { signIn, signUp, logOut, AddAddress } from '../../utils/session';
import { actReceiveError } from '../Error';

export const actAddAddress = (address, callback) => async dispatch => {
  const response = await AddAddress(address);
  if (response.status === 200) {
    await dispatch(actRefreshSesion(response.data));
  }
  return Promise.resolve(response.status);
};

export const actSignIn = user => async dispatch => {
  const response = await signIn(user);
  if (response.data.userId) {
    dispatch(actRefreshSesion(response.data));
  } else {
    dispatch(actReceiveError('signin', response.data));
  }
};

export const actSignUp = user => async dispatch => {
  const response = await signUp(user);
  if (response.data.userId) {
    dispatch(actRefreshSesion(response.data));
  } else {
    dispatch(actReceiveError('signup', response.data));
  }
};

export const actLogOut = () => async dispatch => {
  const data = await logOut();
  if (data.status === 200) {
    dispatch({ type: Types.LOGOUT_SESSION });
  }
};

//Recieve session and refresh
const actRefreshSesion = user => ({
  type: Types.REFRESH_SESSION,
  user
});

const _nullSession = {
  userId: null,
  username: null
};
export default (state = _nullSession, { type, user }) => {
  Object.freeze(state);
  switch (type) {
    case Types.REFRESH_SESSION:
      return user;
    case Types.LOGOUT_SESSION:
      return _nullSession;
    default:
      return state;
  }
};
