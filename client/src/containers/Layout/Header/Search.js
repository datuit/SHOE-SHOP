import React from 'react';
import { Icon } from 'antd';
import { injectIntl, intlShape } from 'react-intl';

import messages from './messages';

const Search = ({ intl }) => {
  return (
    <form action="" className="site-top-search border">
      <Icon type="search" />
      <input
        type="text"
        placeholder={intl.formatMessage({ ...messages.search })}
      />
    </form>
  );
};

Search.prototype = {
  intl: intlShape.isRequired
};

export default injectIntl(Search);
