import { connect } from 'react-redux'
import Create from './units'
import { 
  handleCreateSensor,
  handleAddDatasource,
  handleNextStep,
  handleBackStepTypeFile,
  handleBackStep,
  handleChangeInput,
  handleFileChange,
  renderContent,
  renderModalError,
  getRules,
  toggleShow,
  getSampleData,
  getSampleDataSql,
  getSampleTable,
  getSensorProperties,
  handleMapTableMapping,
  handleChangeTypeTableMapping,
  handleDeleteTableMapping,
  handleChangeProps,
  handleDeleteProps,
  handleAddProps
} from './function'
import { TITLE, CREATE_TYPE } from './constant'


const mapStateToProps = state => ({
  services: state._mydataCreate.service,
  type: state._mydataCreate.type,
  layout: state._mydataCreate.layout || { allowNext: type === CREATE_TYPE.device, step: 0, isBack: false },
  data: state._mydataCreate.data,
  apiUrl: state._mydataCreate.apiUrl,
  rules: state._mydataCreate.rules,
  title: state._mydataCreate.title || TITLE[type],
  token: state._mydataCreate.token,
  maxStep: state._mydataCreate.maxStep,
  show: state._mydataCreate.show,
  files: state._mydataCreate.files
})
const mapDispatchToProps = dispatch => ({
  handleCreateSensor: () => dispatch(handleCreateSensor()),

  handleAddDatasource: () => dispatch(handleAddDatasource()),
  handleNextStep: () => dispatch(handleNextStep()),
  handleBackStepTypeFile: () => dispatch(handleBackStepTypeFile()),
  handleBackStep: () => dispatch(handleBackStep()),
  handleChangeInput: () => dispatch(handleChangeInput()),
  handleFileChange: () => dispatch(handleFileChange()),

  renderContent: () => dispatch(renderContent()),
  renderModalError: () => dispatch(renderModalError()),
  getRules: () => dispatch(getRules()),
  toggleShow: () => dispatch(toggleShow()),
  getSampleData: () => dispatch(getSampleData()),
  getSampleDataSql: () => dispatch(getSampleDataSql()),
  getSampleTable: () => dispatch(getSampleTable()),
  getSensorProperties: () => dispatch(getSensorProperties()),
  getSensorProperties: () => dispatch(getSensorProperties()),
  handleMapTableMapping: () => dispatch(handleMapTableMapping()),
  handleChangeTypeTableMapping: () => dispatch(handleChangeTypeTableMapping()),
  handleDeleteTableMapping: () => dispatch(handleDeleteTableMapping()),
  handleDeleteProps: () => dispatch(handleDeleteProps()),
  handleChangeProps: () => dispatch(handleChangeProps()),
  handleAddProps: () => dispatch(handleAddProps())
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)