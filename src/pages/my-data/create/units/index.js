import React from 'react';
import PropTypes from 'prop-types';
import CreateLayout from 'PageLayouts/layout-create/units';
import { TITLE, CREATE_TYPE } from '../constant'

const Create = ({ 
  type , services, data, title, name, layout, apiUrl, rules, token, maxStep, show, files, hideStep,
  handleAddDatasource, handleNextStep, handleBackStep, headers,
  getSampleData, getSampleDataSql, getSampleTable, getSensorProperties, 
}) => {
  return (
    <>
      <CreateLayout
        title={title}
        type={type}
        hideStep={hideStep}
        maxStep={maxStep}
        {...layout}
        handleAdd={handleAddDatasource}
        handleNextStep={handleNextStep}
        handleBackStep={handleBackStep}
      >
        <div className="column content-body">
          {/*this.state.show.errorModal && this.props.createConnector.errorMsg !== '' && this.renderModalError() */}
          {/* type !== '' && this.renderContent(type, layout.step) */}
        </div>
      </CreateLayout>
    </>
  )
}

Create.propTypes = {
  type: PropTypes.string,
  getSampleData: PropTypes.func,
  getSampleDataSql: PropTypes.func,
  getSampleTable: PropTypes.func,
  getSensorProperties: PropTypes.func,
  createSensor: PropTypes.func,
  resetConnector: PropTypes.func,
  getFilePath: PropTypes.func,
  addDataSource: PropTypes.func,
  addDataSourceItem: PropTypes.func,
  createConnector: PropTypes.object,
  services: PropTypes.object,
  layout: PropTypes.object,
  data: PropTypes.object,
  apiUrl: PropTypes.string,
  rules: PropTypes.array,
  title: PropTypes.string,
  token: PropTypes.string,
  maxStep: PropTypes.number,
  show: PropTypes.object,
  files: PropTypes.object,
  hideStep: PropTypes.string,
  name: PropTypes.string,
  headers: PropTypes.object
}

Create.defaultProps = {
  getSampleData: () => {},
  getSampleDataSql: () => {},
  getSampleTable: () => {},
  getSensorProperties: () => {},
  createSensor: () => {},
  resetConnector: () => {},
  getFilePath: () => {},
  addDataSource: () => {},
  addDataSourceItem: () => {},
  createConnector: () => {},
  services: {},
  type: '',
  layout: {},
  data: {},
  apiUrl: '',
  rules: [],
  title: '',
  token: '',
  maxStep: 0,
  show: {},
  files: {},
  hideStep: '',
  name: '',
  headers: {}
}

export default Create