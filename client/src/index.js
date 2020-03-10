import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { checkLoggedIn } from 'Util/session';
import configureStore from 'Redux/store';
import history from 'Util/history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import LanguageProvider from 'Containers/LanguageProvider';
import { translationMessages } from './i18n';

//CSS third-css
import 'antd/dist/antd.css';
import 'aos/dist/aos.css';
import 'swiper/swiper.scss';

//MyCSS
import 'Assets/css/sass/_style.scss';

const MOUNT_NODE = document.getElementById('root');

const render = async messages => {
  const renderApp = preloadedState => {
    const store = configureStore(preloadedState, history);
    window.state = store.getState;
    ReactDOM.render(
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
      MOUNT_NODE
    );
  };

  (async () => renderApp(await checkLoggedIn()))();
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', './App.js'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
