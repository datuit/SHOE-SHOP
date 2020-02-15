import { combineReducers } from 'redux'
import cart from './Cart'
import session from './Session'
import error from './Error'

export default combineReducers({ cart, session, error })
