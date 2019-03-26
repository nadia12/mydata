import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Breadcrumb from './index/breadcrumb';
import TopAction from './index/top-action';
import InfoDrawer from './index/info-drawer';
import EntityTable from './index/entity-table';
import SelectType from './index/select-type';
import ContentBody from './create/content-body';

const StyleMyData = ({
  breadcrumb,
  topAction,
  infoDrawer,
  entityTable,
  selectType,
  contentBody
}) => (
  <Fragment>
    {breadcrumb && <Breadcrumb />}
    {topAction && <TopAction />}
    {infoDrawer && <InfoDrawer />}
    {entityTable && <EntityTable />}
    {selectType && <SelectType />}
    {contentBody && <ContentBody />}
  </Fragment>
);

StyleMyData.propTypes = {
  breadcrumb: PropTypes.bool,
  topAction: PropTypes.bool,
  infoDrawer: PropTypes.bool,
  entityTable: PropTypes.bool,
  selectType: PropTypes.bool,
  contentBody: PropTypes.bool
};

StyleMyData.defaultProps = {
  breadcrumb: false,
  topAction: false,
  infoDrawer: false,
  entityTable: false,
  selectType: false,
  contentBody: false
};

export default StyleMyData;
