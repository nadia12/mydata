import {
  connect,
} from 'react-redux'
import Preview from './units'
import {
  postPreviewData,
  getInfoEntity,
  handleColumnChangeInput,
  handleColumnEnter,
  setTableHeaders,
} from './function'
import { SET_ICON } from './constant'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  tableHeaders: _mydataPreview.preview.tableHeaders,
  previewData: _mydataPreview.preview.data,
  isLoadingPreview: _mydataPreview.preview.isLoading,
  infoData: _mydataPreview.info.data,
  setIcon: SET_ICON,
  searchColumns: _mydataPreview.searchColumns,
})

const mapDispatchToProps = dispatch => ({
  setTableHeaders: () => dispatch(setTableHeaders()),
  postPreviewData: id => dispatch(postPreviewData(id)),
  getInfoEntity: id => dispatch(getInfoEntity(id)),
  handleColumnChangeInput: value => dispatch(handleColumnChangeInput(value)),
  handleColumnEnter: () => dispatch(handleColumnEnter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
