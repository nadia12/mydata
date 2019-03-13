import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SidebarContent from './sidebar-content-layout';
import CreateLayout from './create-layout';

const StylePageLayout = ({
  sidebarContentLayout,
  createLayout
}) => (
  <Fragment>
    {sidebarContentLayout && <SidebarContent />}
    {createLayout && <CreateLayout />}
  </Fragment>
);

StylePageLayout.propTypes = {
  sidebarContentLayout: PropTypes.bool,
  createLayout: PropTypes.bool
};

StylePageLayout.defaultProps = {
  sidebarContentLayout: false,
  createLayout: false
};

export default StylePageLayout;
