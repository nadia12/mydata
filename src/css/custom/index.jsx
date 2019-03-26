import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Base from './base';
import Helper from './helper';
import Wizard from './wizard';
import Table from './table';
import Form from './form';
import Button from './button';
import MainContent from './main-content';

const StyleCustom = ({
  base, helper, wizard, table,
  form, button, mainContent
}) => (
  <Fragment>
    {base && <Base />}
    {helper && <Helper />}
    {wizard && <Wizard />}
    {table && <Table />}
    {form && <Form />}
    {button && <Button />}
    {mainContent && <MainContent />}
  </Fragment>
);

StyleCustom.propTypes = {
  base: PropTypes.bool,
  helper: PropTypes.bool,
  wizard: PropTypes.bool,
  table: PropTypes.bool,
  form: PropTypes.bool,
  button: PropTypes.bool,
  mainContent: PropTypes.bool
};

StyleCustom.defaultProps = {
  base: false,
  helper: false,
  wizard: false,
  table: false,
  form: false,
  button: false,
  mainContent: false
};

export default StyleCustom;
