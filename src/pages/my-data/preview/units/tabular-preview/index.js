import {
  connect,
} from 'react-redux'
import TabularPreview from './units'
import {
  postPreviewData,
  postTableHeaders,
  setTableHeaders,
} from './function'
import {
  resetState,
} from '../../reducer'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  tableHeaders: _mydataPreview.tableHeaders.data,
  thStatus: _mydataPreview.tableHeaders.status,
  previewData: _mydataPreview.preview.data,
  previewStatus: _mydataPreview.preview.status,
  infoData: _mydataPreview.info.data,
  isLoadingPreview: _mydataPreview.preview.isLoading,
})

const mapDispatchToProps = dispatch => ({
  postTableHeaders: params => dispatch(postTableHeaders(params)),
  setTableHeaders: params => dispatch(setTableHeaders(params)),
  postPreviewData: id => dispatch(postPreviewData(id)),
  resetState: () => dispatch(resetState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabularPreview)
