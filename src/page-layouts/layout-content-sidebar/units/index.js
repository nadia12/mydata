import React from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb,
  Input,
  Button,
  Row,
  Column,
} from 'volantis-ui'
import {
  SearchIcon,
  AddIcon,
} from 'volantis-icon'
import {
  GlobalStyles,
  Helper,
} from 'Asset/css/main'

import {
  MainContentStyle,
} from 'PageLayouts/layout-content-sidebar/units/style'
import SnackbarUpload from '../../../components/snackbar-upload'

const LayoutContentSidebar = ({
  children,
  hasFooter,
  searchAction,
  addAction,
  trashAction,
  breadcrumbList,
  footerText,
  onOutsideClick,
  isUpload,
  fileInformation,
  closeUpload,
}) => (
  <>
    {/* ==== Styling=== */}
    <GlobalStyles />
    <Helper />
    {/* ==== Styling=== */}
    <MainContentStyle hasFooter={hasFooter} onClick={() => onOutsideClick()}>
      <MainContentStyle.Head>
        <MainContentStyle.HeadBox>
          <Breadcrumb>
            {
              breadcrumbList.map(breadcrumb => (
                <Breadcrumb.List
                  key={breadcrumb.title}
                  title={breadcrumb.title}
                  onClick={breadcrumb.onClick}
                />
              ))
            }
          </Breadcrumb>

          <Row className="mt48px">
            <Column xs={9}>
              <>
                {
                  addAction.isActive && (
                    <Button
                      label="Add New Data"
                      icon={AddIcon}
                      theme="outlined"
                      onClick={addAction.action}
                    />
                  )
                }
              </>
            </Column>
            <Column xs={3}>
              <>
                { searchAction.isActive && (
                  <Input
                    className="input is-standard is-gray-light is-search-top-table"
                    name="search"
                    theme="default"
                    placeholder="Search"
                    onChange={e => searchAction.onChange(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') searchAction.onEnter()
                    }}
                    value={searchAction.value}
                    icon={props => <SearchIcon {...props} />}
                  />
                )}
              </>
            </Column>
          </Row>
        </MainContentStyle.HeadBox>
      </MainContentStyle.Head>

      <MainContentStyle.Body>
        {children}
      </MainContentStyle.Body>

      { isUpload && <SnackbarUpload {...fileInformation} closeUpload={closeUpload} /> }

      { hasFooter && (
        <MainContentStyle.Footer>
          <Row className="m0 main-content-foot">
            {
              trashAction.isActive && (
                <Button
                  className="trash-bin"
                  label={trashAction.title}
                  theme="no-border"
                  onClick={trashAction.action}
                  icon={() => trashAction.icon}
                />
              )
            }
            <Column className="vertical-center"><>{footerText}</></Column>
          </Row>
        </MainContentStyle.Footer>
      )
      }
    </MainContentStyle>
  </>
)

LayoutContentSidebar.defaultProps = {
  fileInformation: {},
  children: null,
  hasFooter: true,
  breadcrumbList: [],
  footerText: '',
  searchAction: {
    isActive: false,
    onChange: () => {},
    onEnter: () => {},
    value: '',
  },
  addAction: {
    isActive: true,
    action: () => {},
    title: 'Add New Data',
  },
  trashAction: {
    isActive: true,
    action: () => {},
    title: 'Trash Bin',
  },
  onOutsideClick: () => {},
  closeUpload: () => {},
  isUpload: false,
}

LayoutContentSidebar.propTypes = {
  fileInformation: PropTypes.object,
  isUpload: PropTypes.bool,
  children: PropTypes.any,
  hasFooter: PropTypes.bool,
  searchAction: PropTypes.object,
  addAction: PropTypes.object,
  trashAction: PropTypes.object,
  breadcrumbList: PropTypes.array,
  footerText: PropTypes.string,
  onOutsideClick: PropTypes.func,
  closeUpload: PropTypes.func,
}

export default LayoutContentSidebar
