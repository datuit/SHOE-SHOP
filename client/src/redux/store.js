import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import myReducers from './reducers';

const configureStore = (preloadedState, history) => {
  let composeEnhancers = compose;
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object')
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  //routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [routerMiddleware(history), thunk];
  const enhancers = [applyMiddleware(...middlewares)];
  return createStore(
    myReducers,
    preloadedState,
    composeEnhancers(...enhancers)
  );
};

export default configureStore;
