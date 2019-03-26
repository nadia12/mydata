import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import User from './user';

const StylePage = ({
  user
}) => (
  <Fragment>
    {user && <User />}
  </Fragment>
);

StylePage.propTypes = {
  user: PropTypes.bool
};

StylePage.defaultProps = {
  user: false
};

export default StylePage;
