import { combineReducers } from 'redux';
import cartProviderReducer from 'Redux/Cart';
import sessionProviderReducer from 'Redux/Session';
import errorProviderReducer from 'Redux/Error';
import languageProviderReducer from 'Redux/Language';
import history from 'Util/history';
import { connectRouter } from 'connected-react-router';

export default combineReducers({
  language: languageProviderReducer,
  cart: cartProviderReducer,
  session: sessionProviderReducer,
  error: errorProviderReducer,
  router: connectRouter(history)
});
