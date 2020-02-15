import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import myReducers from './reducers'

export default preloadedState =>
  createStore(myReducers, preloadedState, NODE_ENV_CONFIG())

const NODE_ENV_CONFIG = () => {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(applyMiddleware(thunk))
  }
  return applyMiddleware(thunk)
}
