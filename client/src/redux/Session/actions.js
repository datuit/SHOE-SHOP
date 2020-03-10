import { LOGOUT_SESSION, REFRESH_SESSION } from './constants';
import { signIn, signUp, logOut, AddAddress } from 'Util/session';
import { actReceiveError } from 'Redux/Error';

export const actAddAddress = address => async dispatch => {
  const response = await AddAddress(address);
  if (response.status === 200) {
    await dispatch(refreshSesion(response.data));
  }
  return Promise.resolve(response.status);
};

export const actSignIn = user => async dispatch => {
  const response = await signIn(user);
  if (response.data.userId) {
    dispatch(refreshSesion(response.data));
  } else {
    dispatch(actReceiveError('signin', response.data));
  }
};

export const actSignUp = user => async dispatch => {
  const response = await signUp(user);
  if (response.data.userId) {
    dispatch(refreshSesion(response.data));
  } else {
    dispatch(actReceiveError('signup', response.data));
  }
};

export const actLogOut = () => async dispatch => {
  const data = await logOut();
  if (data.status === 200) {
    dispatch(logoutSession);
  }
};

const logoutSession = {
  type: LOGOUT_SESSION
};

//Recieve session and refresh
const refreshSesion = user => ({
  type: REFRESH_SESSION,
  user
});
