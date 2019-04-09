import {
  connect
} from 'react-redux'

import {
  setUserInfo,
  setAuthCookie,
  setType,
  setInput,
  setModalErrorCreate,
  //   handleCreateSensor,
  postDatasource,
  setBackStep,
  setNextStep
//   handleBackStepTypeFile,
//   handleFileChange,
//   renderContent,
//   renderModalError,
//   getRules,
//   toggleShow,
//   getSampleData,
//   getSampleDataSql,
//   getSampleTable,
//   getSensorProperties,
//   handleMapTableMapping,
//   handleChangeTypeTableMapping,
//   handleDeleteTableMapping,
//   handleChangeProps,
//   handleDeleteProps,
//   handleAddProps,
//   createSensor,
} from 'Pages/my-data/create/function'
import Create from './units'

// import {
//   TITLE,
//   CREATE_TYPE,
// } from 'Pages/my-data/create/constant'

const mapStateToProps = state => {
  const {
    layout,
    title,
    maxStep,
    type,
    data,
    rules,
    loadingText,
    isLoading,
    showModalConfirmation,
    modalData
  } = state._mydataCreate

  return {
    layout,
    allowNext: !!layout && !!layout.allowNext && layout.allowNext,
    title,
    maxStep,
    type,
    rules: rules[layout.step] || {},
    fields: data[`step${layout.step || 0}`] || [],
    data,
    loadingProps: {
      showLoading: isLoading,
      textLoading: loadingText
    },
    showModalConfirmation,
    modalData
  }
}
// //   const {
// //     type,
// //   } = state._mydataCreate
// //   const defaultLayout = {
// //     allowNext: type === CREATE_TYPE.device,
// //     step: 0,
// //     isBack: false,
// //   }
//    ({
// //     services: state._mydataCreate.service,
// //     type: type || '',
// //     layout: state._mydataCreate.layout || defaultLayout,
// //     data: state._mydataCreate.data,
// //     apiUrl: state._mydataCreate.apiUrl,
// //     rules: state._mydataCreate.rules,
// //     // title: state._mydataCreate.title || TITLE[type],
// //     token: state._mydataCreate.token,
// //     maxStep: state._mydataCreate.maxStep,
// //     show: state._mydataCreate.show,
// //     files: state._mydataCreate.files,
// //     name: state._mydataCreate.name
//   })

const mapDispatchToProps = dispatch => ({
  setUserInfo: ({ userInfo }) => dispatch(setUserInfo({ userInfo })),
  setAuthCookie: ({ authCookie }) => dispatch(setAuthCookie({ authCookie })),
  setType: ({ type }) => dispatch(setType({ type })),
  handleChangeInput: ({
    key = '', value = '', replacer = '', valueReplacer = ''
  }) => dispatch(setInput({
    key, value, replacer, valueReplacer
  })),
  //   createSensor: ({ reqSensorData }) => dispatch(createSensor({ reqSensorData }, (res, err) => {

  //   })),
  //   handleCreateSensor: () => dispatch(handleCreateSensor((res, err) => {
  //     dispatch(createSensor())
  //     })
  //   ),
  handleAddDatasource: () => dispatch(postDatasource((res, err) => {
    if (err) {
      return dispatch(setModalErrorCreate())
    }
    if (!err) {
      // success redirect my-data
      window.location.href = '/my-data'
    }
  })),
  handleToggleModalError: () => dispatch(setModalErrorCreate()),
  handleNextStep: () => dispatch(setNextStep()),
  //   handleBackStepTypeFile: () => dispatch(handleBackStepTypeFile()),
  handleBackStep: ({ step = 0 }) => {
    if (step === 0) {
      window.location.href = '/my-data'
    } else if (window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStep())
  }
//   handleFileChange: () => dispatch(handleFileChange()),
//   renderContent: (type, step) => dispatch(renderContent(type, step)),
//   renderModalError: () => dispatch(renderModalError()),
//   getRules: () => dispatch(getRules()),
//   toggleShow: (name) => dispatch(toggleShow(name)),
//   getSampleData: () => dispatch(getSampleData()),
//   getSampleDataSql: () => dispatch(getSampleDataSql()),
//   getSampleTable: () => dispatch(getSampleTable()),
//   getSensorProperties: () => dispatch(getSensorProperties()),
//   getSensorProperties: () => dispatch(getSensorProperties()),
//   handleMapTableMapping: () => dispatch(handleMapTableMapping()),
//   handleChangeTypeTableMapping: () => dispatch(handleChangeTypeTableMapping()),
//   handleDeleteTableMapping: () => dispatch(handleDeleteTableMapping()),
//   handleDeleteProps: () => dispatch(handleDeleteProps()),
//   handleChangeProps: () => dispatch(handleChangeProps()),
//   handleAddProps: () => dispatch(handleAddProps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
