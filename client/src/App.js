import React, { Fragment } from 'react';

import MainApp from 'Containers/App';
import { BackTop } from 'antd';

const App = () => {
  return (
    <Fragment>
      <MainApp />
      <BackTop />
    </Fragment>
  );
};

export default App;
