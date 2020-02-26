import * as Types from '../../constants/actionTypes';
import { buyCart } from '../../utils/session';

export const actBUY_CART = cart => async dispatch => {
  const response = await buyCart(cart);
  if (response.status === 200) {
    await dispatch({
      type: Types.BUY_CART
    });
  }
  return Promise.resolve(true);
};

export const actADD_TO_CART = item => dispatch =>
  dispatch({
    type: Types.ADD_TO_CART,
    item
  });

export const actDEL_CART = item => dispatch =>
  dispatch({
    type: Types.DEL_CART,
    item
  });

const initialState = [];
export default (state = initialState, { type, item }) => {
  let newState;
  let checkIndex;
  let data;
  switch (type) {
    case Types.BUY_CART:
      localStorage.removeItem('cart');
      return initialState;
    case Types.ADD_TO_CART:
      checkIndex = state.map(e => e._id).indexOf(item._id);
      if (checkIndex === -1) {
        newState = state.slice();
        newState.push(item);
      } else {
        newState = state.map(e => {
          if (e._id === item._id) {
            e.quantity += item.quantity;
          }
          return e;
        });
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case Types.DEL_CART:
      checkIndex = state.map(e => e._id).indexOf(item._id);
      if (checkIndex !== -1) {
        newState = state.slice();
        newState.splice(checkIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    default:
      data = JSON.parse(localStorage.getItem('cart'));
      if (data) {
        return data;
      }
      return initialState;
  }
};
