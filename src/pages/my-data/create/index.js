import {
  connect,
} from 'react-redux'

import {
  setType,
  setInput,
  setModalErrorCreate,
  postDatasource,
  setBackStep,
  setNextStep,
  setBackStepTypeFile,
  setFiles,
  postUpload,
} from 'Pages/my-data/create/function'
import Create from './units'

const mapStateToProps = ({ volantisMyData: { _mydataCreate }, volantisConstant }) => {
  const {
    layout,
    title,
    maxStep,
    filePath,
    fileSize,
    type,
    data,
    rules,
    loadingText,
    isLoading,
    showModalConfirmation,
    modalData,
    files,
    filesData,
  } = _mydataCreate

  const {
    cookie: { auth: authCookie },
    service: { host },
  } = volantisConstant
  console.log('volantisConstant ===>', volantisConstant)

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
      textLoading: loadingText,
    },
    showModalConfirmation,
    modalData,
    filePath,
    fileSize,
    files: {
      status: '',
      file: files[0],
    },
    filesData,
    authCookie,
    uploadUrl: `${host}/file/`
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  setType: ({ type }) => dispatch(setType({ type })),
  handleChangeInput: ({
    key = '', value = '', replacer = '', valueReplacer = '',
  }) => dispatch(setInput({
    key, value, replacer, valueReplacer,
  })),
  handleAddDatasource: () => dispatch(postDatasource((res, err) => {
    if (err) {
      return dispatch(setModalErrorCreate())
    }
    if (!err) {
      // success redirect my-data
      props.linkTo('/my-data')
    }
  })),
  handleToggleModalError: () => dispatch(setModalErrorCreate()),
  handleNextStep: () => dispatch(setNextStep()),
  handleBackStepTypeFile: ({ step = 0 }) => {
    if (step === 0) {
      props.linkTo('/my-data')
    } else if (!!window && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStepTypeFile())
  },
  handleChangeFileInput: accepted => dispatch(setFiles({ accepted })),
  handleBackStep: ({ step = 0 }) => {
    if (step === 0) {
      props.linkTo('/my-data')
    } else if (!!window && window.document.getElementById('child-scroll')) {
      window.document.getElementById('child-scroll').scrollTop = 0
    }

    return dispatch(setBackStep())
  },
  handleOnUpload: ({ files, authCookie }) => (dispatch, props) => {
    console.log('handleOnUpload: ', files)
    if (files[0] && files[0].name) {
      return dispatch(postUpload({ files, authCookie, uploadUrl: props.uploadUrl }))
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
