import React from 'react'
import PropTypes from 'prop-types'
import { ChildrenStyle, H2Style, BoxLayoutStyle, ColumnLeftStyle, ColumnFullStyle, ColumnRightStyle, InlineStyle, BoxFooterButtonStyle, BoxFooterStyle, BoxHeaderStyle, WrapperStyle, OverlayStyle } from './style'
import { Button /*, Navbar  */ } from 'volantis-ui'
import ProgressIndicator from './progress-indicator/units'
import LayoutWithoutSidebar from '../../../../page-layouts/layout-without-sidebar'
import Upload from './upload/units'

const Create = (props) => {
  console.log("Create props ===>", props)
  const {
    type,
    step,
    maxStep,
    handleBackStep,
    handleAdd,
    handleNextStep,
    allowNext,
    children,
    isLoading,
    hideStep,
    loadingState, 
  } = props
  const { showLoading, textLoading } = props.getLoadingData({ loadingState, isLoading })
  const { title, buttonDesc } = props.getText(type)
  return (
    <>
      <LayoutWithoutSidebar>
        {/* <Navbar>
          <Navbar.Left>
            <div>
              <VolantisTextIcon width="112px" height="48px" color="#ffd77b"/>
            </div>
          </Navbar.Left>
        </Navbar> */}
        <WrapperStyle showLoading={showLoading}>
          <OverlayStyle showLoading={showLoading}>
            <BoxLayoutStyle>
              <BoxHeaderStyle>
                <H2Style>{title}</H2Style>
              </BoxHeaderStyle>
              <ChildrenStyle>
                {
                  !hideStep && (
                    <ColumnLeftStyle>
                      <ProgressIndicator currentStep={step} type={type} />
                    </ColumnLeftStyle>
                  )
                }
                {
                  hideStep ? <ColumnFullStyle>{children}</ColumnFullStyle> : <ColumnRightStyle>{children}</ColumnRightStyle>
                }
                {/* <Upload
                  handleChangeFileInput={() => {}}
                  fileInput={React.createRef()}
                  accept=""
                /> */}
              </ChildrenStyle>
              <BoxFooterStyle>
                <InlineStyle>
                  <BoxFooterButtonStyle>
                    <Button
                      name={step === 0 ? 'Cancel' : 'Back'}
                      type="no-border"
                      onClick={() => handleBackStep()}
                    />
                  </BoxFooterButtonStyle>
                  {
                    step < maxStep && (<BoxFooterButtonStyle><Button name="Next" isDisabled={!allowNext} onClick={() => allowNext ? handleNextStep() : null } /></BoxFooterButtonStyle>)
                  }
                  {
                    step === maxStep && (<BoxFooterButtonStyle><Button name={buttonDesc} isDisabled={!allowNext} onClick={() => allowNext ? handleAdd() : null } /></BoxFooterButtonStyle>)
                  }
                </InlineStyle>
              </BoxFooterStyle>
            </BoxLayoutStyle>
          </OverlayStyle>
        </WrapperStyle>
      </LayoutWithoutSidebar>
    </>
  )
}

Create.propTypes = {
  getText: PropTypes.func.isRequired,
  getLoadingData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  maxStep: PropTypes.number.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  allowNext: PropTypes.bool.isRequired,
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  hideStep: PropTypes.bool,
  loadingState: PropTypes.string,
}

Create.defaultProps = {
  children: null,
  isLoading: false,
  hideStep: false,
  loadingState: '',
}

export default Create