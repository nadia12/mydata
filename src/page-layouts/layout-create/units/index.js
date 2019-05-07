import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'volantis-ui'
import {
  SpinnerIcon,
} from 'volantis-icon'

import ProgressIndicator from 'Components/progress-indicator'
import LayoutWithoutSidebar from 'PageLayouts/layout-without-sidebar'
import {
  ChildrenStyle,
  H2Style,
  BoxLayoutStyle,
  ColumnLeftStyle,
  ColumnFullStyle,
  ColumnRightStyle,
  InlineStyle,
  BoxFooterButtonStyle,
  BoxFooterStyle,
  BoxHeaderStyle,
  WrapperStyle,
  OverlayStyle,
  LoadingStyle,
} from 'PageLayouts/layout-create/units/style'
import colors from 'Asset/css/colors'

const Create = props => {
  const {
    step,
    maxStep,
    handleBackStep,
    handleAdd,
    handleNextStep,
    allowNext,
    children,
    // isLoading,
    hideStep,
    // loadingState,
    // rules,
    loadingProps: {
      showLoading,
      textLoading,
    },
    buttonText,
    title,
    progressIndicatorText,
  } = props

  console.log('Create ==> ', props)

  return (
    <>
      <LayoutWithoutSidebar>
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
                      <ProgressIndicator currentStep={step} progressIndicatorText={progressIndicatorText} />
                    </ColumnLeftStyle>
                  )
                }
                {
                  hideStep
                    ? <ColumnFullStyle>{children}</ColumnFullStyle>
                    : <ColumnRightStyle>{children}</ColumnRightStyle>
                }
              </ChildrenStyle>
              <BoxFooterStyle showLoading={showLoading}>
                { showLoading && (
                  <InlineStyle>
                    <LoadingStyle>
                      <SpinnerIcon color={colors.gold} />
                    </LoadingStyle>
                    <LoadingStyle>
                      {textLoading}
                    </LoadingStyle>
                  </InlineStyle>
                )
                }
                <InlineStyle>
                  <BoxFooterButtonStyle>
                    <Button
                      label={step === 0 ? 'Cancel' : 'Back'}
                      theme="no-border"
                      onClick={handleBackStep}
                    />
                  </BoxFooterButtonStyle>
                  {
                    step < maxStep && (
                      <BoxFooterButtonStyle>
                        <Button label="Next" disabled={!allowNext} onClick={allowNext ? () => handleNextStep({ step }) : () => {}} />
                      </BoxFooterButtonStyle>
                    )
                  }
                  {
                    step === maxStep && (
                      <BoxFooterButtonStyle>
                        <Button label={buttonText} disabled={!allowNext} onClick={allowNext ? () => handleAdd() : () => {}} />
                      </BoxFooterButtonStyle>
                    )
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
  progressIndicatorText: PropTypes.array,
  step: PropTypes.number,
  maxStep: PropTypes.number.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  allowNext: PropTypes.bool,
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  hideStep: PropTypes.bool,
  loadingProps: PropTypes.object,
  buttonText: PropTypes.string,
}

Create.defaultProps = {
  loadingProps: {
    showLoading: false,
    textLoading: '',
  },
  progressIndicatorText: [],
  buttonText: '',
  children: null,
  hideStep: false,
  step: 0,
  allowNext: false,
}

export default Create
