import {
  connect,
} from 'react-redux'
import TabularPreview from './units'
import {
  postPreviewData,
  setTableHeaders,
} from './function'

const mapStateToProps = ({ volantisMyData: { _mydataPreview } }) => ({
  tableHeaders: _mydataPreview.preview.tableHeaders,
  previewData: _mydataPreview.preview.data,
  isLoadingPreview: _mydataPreview.preview.isLoading,
})

const mapDispatchToProps = dispatch => ({
  setTableHeaders: () => dispatch(setTableHeaders()),
  postPreviewData: id => dispatch(postPreviewData(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TabularPreview)
