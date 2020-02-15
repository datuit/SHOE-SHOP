import * as Types from '../../constants/actionTypes'
import { signIn, signUp, logOut } from '../../utils/session'
import { actReceiveError } from '../Error'

export const actSignIn = user => async dispatch => {
  const response = await signIn(user)
  if (response.data.userId) {
    dispatch({ type: Types.SIGNIN_SESSION, user: response.data })
  } else {
    dispatch(actReceiveError('signin', response.data))
  }
}

export const actSignUp = user => async dispatch => {
  const response = await signUp(user)
  if (response.data.userId) {
    dispatch({ type: Types.SIGNUP_SESSION, user: response.data })
  } else {
    dispatch(actReceiveError('signup', response.data))
  }
}

export const actLogOut = () => async dispatch => {
  const data = await logOut()
  if (data.status === 200) {
    dispatch({ type: Types.LOGOUT_SESSION })
  }
}

const _nullSession = {
  userId: null,
  username: null
}
export default (state = _nullSession, { type, user }) => {
  Object.freeze(state)
  switch (type) {
    case Types.SIGNIN_SESSION:
      return user
    case Types.SIGNUP_SESSION:
      return user
    case Types.LOGOUT_SESSION:
      return _nullSession
    default:
      return state
  }
}
