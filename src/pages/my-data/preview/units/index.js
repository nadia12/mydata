import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import LayoutPreview from 'PageLayouts/layout-preview'
import { NoDataBoxStyle } from './style'

// component
import method from './lifecycle'
import TabularPreview from './tabular-preview'
import InfoDrawer from './info-drawer'

const Preview = ({
  previewData: { result },
  errorPreview,
  infoData,
  setIcon,
  show,
  toogleShowInfo,
}) => (
  <>

    <LayoutPreview
      title={infoData.name}
      icon={setIcon(infoData.uiEntityType)}
      totalRows={result.length}
      isShowAction={!errorPreview.response}
      infoAction={{
        show: show.info,
        action: () => toogleShowInfo(),
      }}
    >
      <div className="table-preview-ds">
        {!!show.info && <InfoDrawer />}
        {!errorPreview.response && (
        <TabularPreview />
        )}
        {!!errorPreview.response && <NoDataBoxStyle> Oops, something went wrong...</NoDataBoxStyle>}
      </div>

    </LayoutPreview>
  </>
)

Preview.propTypes = {
  previewData: PropTypes.object,
  infoData: PropTypes.object,
  setIcon: PropTypes.func,
  errorPreview: PropTypes.object,
  show: PropTypes.object,
  toogleShowInfo: PropTypes.func,
}

Preview.defaultProps = {
  previewData: { result: [] },
  infoData: { name: '' },
  setIcon: () => {},
  errorPreview: {},
  show: {},
  toogleShowInfo: () => {},
}

export default lifecycle(method)(Preview)
