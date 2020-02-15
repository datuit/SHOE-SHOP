import * as Types from '../../constants/actionTypes'

export const actReceiveError = (type, data) => {
  return {
    type: Types.RECEIVE_ERROR,
    message: {
      [type]: data.message
    }
  }
}

export const actDelError = () => dispatch =>
  dispatch({
    type: Types.DEL_ERROR
  })

const initialState = { signin: '', signup: '' }
export default (state = initialState, { type, message }) => {
  Object.freeze(state)
  switch (type) {
    case Types.RECEIVE_ERROR:
      return message
    case Types.DEL_ERROR:
      return initialState
    default:
      return state
  }
}
