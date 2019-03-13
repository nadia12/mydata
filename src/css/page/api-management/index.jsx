import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TabOverview from './index/tab-overview';

const StyleApiManagement = ({
  tabOverview
}) => (
  <Fragment>
    {tabOverview && <TabOverview />}
  </Fragment>
);

StyleApiManagement.propTypes = {
  tabOverview: PropTypes.bool
};

StyleApiManagement.defaultProps = {
  tabOverview: false
};
export default StyleApiManagement;
