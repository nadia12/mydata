import React from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from 'volantis-ui'

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
  OverlayStyle
} from 'PageLayouts/layout-create/units/style'

const Create = props => {
  const {
    // type,
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
      textLoading
    },
    buttonText,
    title,
    progressIndicatorText
  } = props
  // const { showLoading, textLoading } = props.getLoadingData({ loadingState, isLoading })
  // const { title, buttonDesc } = props.getText(type)
  console.log('!hideStep ===>', !hideStep, step, maxStep, buttonText)

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
              <BoxFooterStyle>
                {textLoading}
                <InlineStyle>
                  <BoxFooterButtonStyle>
                    <Button
                      label={step === 0 ? 'Cancel' : 'Back'}
                      type="no-border"
                      onClick={() => handleBackStep({ step })}
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
  // getText: PropTypes.func.isRequired,
  progressIndicatorText: PropTypes.array,
  // getLoadingData: PropTypes.func.isRequired,
  // type: PropTypes.string.isRequired,
  step: PropTypes.number,
  maxStep: PropTypes.number.isRequired,
  handleBackStep: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  allowNext: PropTypes.bool.isRequired,
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  // isLoading: PropTypes.bool,
  hideStep: PropTypes.bool,
  // loadingState: PropTypes.string,
  // rules: PropTypes.object,
  loadingProps: PropTypes.object,
  buttonText: PropTypes.string
}

Create.defaultProps = {
  loadingProps: {
    showLoading: false,
    textLoading: ''
  },
  progressIndicatorText: [],
  buttonText: '',
  children: null,
  // isLoading: false,
  hideStep: false,
  // loadingState: '',
  // rules: {
  //   fields: [],
  //   required: [],
  //   touched: {}
  // },
  step: 0
}

export default Create
