import axios from 'axios';

export const AddAddress = async address => {
  const response = await axios({
    url: 'api/user/address',
    method: 'POST',
    data: { address }
  });
  return response;
};

export const buyCart = async cart => {
  const response = await axios({
    url: 'api/order/buycart',
    method: 'POST',
    data: { cart }
  });
  return response;
};

export const signIn = async user => {
  const response = await axios({
    url: 'api/user/signin',
    method: 'POST',
    data: user
  });
  return response;
};

export const signUp = async user => {
  const response = await axios({
    url: 'api/user/signup',
    method: 'POST',
    data: user
  });
  return response;
};

export const logOut = async () => {
  const response = await axios({
    url: 'api/session/logout',
    method: 'DELETE'
  });
  return response;
};

export const checkLoggedIn = async () => {
  const response = await axios({
    url: 'api/session/checklogin',
    method: 'GET'
  });
  const { user } = await response.data;
  let preloadedState = {};
  if (user) {
    preloadedState = {
      session: user
    };
  }
  return preloadedState;
};
