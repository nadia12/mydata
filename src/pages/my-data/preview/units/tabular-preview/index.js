import {
  connect,
} from 'react-redux'
import TabularPreview from './units'
import {
  postPreviewData,
  postTableHeaders,
  setTableHeaders,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  tableHeaders: _mydataPreview.tableHeaders.data,
  thError: _mydataPreview.tableHeaders.errorMessage,
  previewData: _mydataPreview.preview.data,
  previewStatus: _mydataPreview.preview.status,
  infoData: _mydataPreview.info.data,
  isLoadingPreview: _mydataPreview.preview.isLoading,
})

const mapDispatchToProps = dispatch => ({
  postTableHeaders: params => dispatch(postTableHeaders(params)),
  setTableHeaders: params => dispatch(setTableHeaders(params)),
  postPreviewData: id => dispatch(postPreviewData(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabularPreview)
