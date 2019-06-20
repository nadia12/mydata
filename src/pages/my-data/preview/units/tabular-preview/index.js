import {
  connect,
} from 'react-redux'
import TabularPreview from './units'
import {
  postPreviewData,
  handleColumnChangeInput,
  handleColumnEnter,
  setTableHeaders,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  tableHeaders: _mydataPreview.preview.tableHeaders,
  previewData: _mydataPreview.preview.data,
  isLoadingPreview: _mydataPreview.preview.isLoading,
  searchColumns: _mydataPreview.searchColumns,
})

const mapDispatchToProps = dispatch => ({
  setTableHeaders: () => dispatch(setTableHeaders()),
  postPreviewData: id => dispatch(postPreviewData(id)),
  handleColumnChangeInput: value => dispatch(handleColumnChangeInput(value)),
  handleColumnEnter: () => dispatch(handleColumnEnter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabularPreview)
