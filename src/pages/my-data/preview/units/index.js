import React from 'react'
import PropTypes from 'prop-types'
import lifecycle from 'react-pure-lifecycle'
import LayoutPreview from 'PageLayouts/layout-preview'
import { NoDataBoxStyle } from './style'

// component
import method from './lifecycle'
import InfoDrawer from './info-drawer'
import { TABULAR_TYPES } from '../constant'

const Preview = ({
  previewData: { result },
  isErrorPreview,
  infoData,
  setIcon,
  show,
  toogleShowInfo,
  linkToMyDataRoot,
  renderPreview,
  selectAction,
  handleSelectAction,
}) => (
  <>

    <LayoutPreview
      title={infoData.name}
      icon={setIcon(infoData.uiEntityType)}
      totalRows={result.length}
      isShowAction={!!infoData.id}
      isShowFooterText={!!infoData.uiEntityType && TABULAR_TYPES.includes(infoData.uiEntityType)}
      infoAction={{
        show: show.info,
        action: () => toogleShowInfo(),
      }}
      selectAction={{
        value: selectAction.value,
        action: val => handleSelectAction(val),
        options: selectAction.options,
      }}
      linkToList={() => linkToMyDataRoot()}
    >
      <div className="table-preview-ds">
        {!!show.info && <InfoDrawer />}
        {
          !isErrorPreview
            ? renderPreview(infoData.uiEntityType)
            : (
              <NoDataBoxStyle>
                { infoData.uiEntityType === 'CSV File' ? 'Unsupported delimiter. Please update your file to use comma as it\'s delimiter.' : 'No Data' }
              </NoDataBoxStyle>
            )
        }
      </div>

    </LayoutPreview>
  </>
)

Preview.propTypes = {
  previewData: PropTypes.object,
  infoData: PropTypes.object,
  setIcon: PropTypes.func,
  isErrorPreview: PropTypes.bool,
  show: PropTypes.object,
  toogleShowInfo: PropTypes.func,
  linkToMyDataRoot: PropTypes.func,
  renderPreview: PropTypes.func,
  selectAction: PropTypes.object,
  handleSelectAction: PropTypes.func,
}

Preview.defaultProps = {
  previewData: { result: [] },
  infoData: { name: '' },
  setIcon: () => {},
  isErrorPreview: false,
  show: {},
  toogleShowInfo: () => {},
  linkToMyDataRoot: () => {},
  renderPreview: () => {},
  selectAction: {},
  handleSelectAction: () => {},
}

export default lifecycle(method)(Preview)
