import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import StepTwoFile from './create/file/step2';
import TableFile from './create/file/table-file';
import UploadFile from './create/file/upload-file';

import StepTwoIot from './create/iot/step2';
import StepThreeIot from './create/iot/step3';
import TableProperties from './create/iot/table-properties';

import StepTwoSql from './create/sql/step2';
import StepThreeSql from './create/sql/step3';
import StepFourSql from './create/sql/step4';

import ProgressIndicator from './create/progress-indicator';

import DatasetDetailModal from './list/modal/dataset-detail';
import ModelDetailModal from './list/modal/model-detail';
import NewFolderModal from './list/modal/new-folder';
import SensorModal from './list/modal/sensor';

import ApiEndPoints from './list/api-endpoints';
import ApiToken from './list/api-token';
import DropdownTopAction from './list/dropdown-top-action';
import SearchButton from './list/search-button';
import TryModel from './list/try-model';
import FunctionDoc from './list/function-doc';

const StyleComponent = ({
  stepTwoFile,
  tableFile,
  uploadFile,
  stepTwoIot,
  stepThreeIot,
  tableProperties,
  stepTwoSql,
  stepThreeSql,
  stepFourSql,
  progressIndicator,

  datasetDetailModal,
  modelDetailModal,
  newFolderModal,
  sensorModal,

  apiEndPoints,
  apiToken,
  dropdownTopAction,
  searchButton,
  tryModel,
  functionDoc,
}) => (
  <Fragment>
    {stepTwoFile && <StepTwoFile />}
    {tableFile && <TableFile />}
    {uploadFile && <UploadFile />}

    {stepTwoIot && <StepTwoIot />}
    {stepThreeIot && <StepThreeIot />}
    {tableProperties && <TableProperties />}

    {stepTwoSql && <StepTwoSql />}
    {stepThreeSql && <StepThreeSql />}
    {stepFourSql && <StepFourSql />}

    {progressIndicator && <ProgressIndicator />}

    {datasetDetailModal && <DatasetDetailModal />}
    {modelDetailModal && <ModelDetailModal />}
    {newFolderModal && <NewFolderModal />}
    {sensorModal && <SensorModal />}

    {apiEndPoints && <ApiEndPoints />}
    {apiToken && <ApiToken />}
    {dropdownTopAction && <DropdownTopAction />}
    {searchButton && <SearchButton />}
    {tryModel && <TryModel />}
    {functionDoc && <FunctionDoc />}
  </Fragment>
);

StyleComponent.propTypes = {
  stepTwoFile: PropTypes.bool,
  tableFile: PropTypes.bool,
  uploadFile: PropTypes.bool,
  stepTwoIot: PropTypes.bool,
  stepThreeIot: PropTypes.bool,
  tableProperties: PropTypes.bool,
  stepTwoSql: PropTypes.bool,
  stepThreeSql: PropTypes.bool,
  stepFourSql: PropTypes.bool,
  progressIndicator: PropTypes.bool,
  datasetDetailModal: PropTypes.bool,
  modelDetailModal: PropTypes.bool,
  newFolderModal: PropTypes.bool,
  sensorModal: PropTypes.bool,
  apiEndPoints: PropTypes.bool,
  apiToken: PropTypes.bool,
  dropdownTopAction: PropTypes.bool,
  searchButton: PropTypes.bool,
  tryModel: PropTypes.bool,
  functionDoc: PropTypes.bool
};

StyleComponent.defaultProps = {
  stepTwoFile: false,
  tableFile: false,
  uploadFile: false,
  stepTwoIot: false,
  stepThreeIot: false,
  tableProperties: false,
  stepTwoSql: false,
  stepThreeSql: false,
  stepFourSql: false,
  progressIndicator: false,
  datasetDetailModal: false,
  modelDetailModal: false,
  newFolderModal: false,
  sensorModal: false,
  apiEndPoints: false,
  apiToken: false,
  dropdownTopAction: false,
  searchButton: false,
  tryModel: false,
  functionDoc: false
};

export default StyleComponent;
