import React from 'react'
import PropTypes from 'prop-types'

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
} from './style'
import { Button } from 'volantis-ui'
import ProgressIndicator from 'Components/progress-indicator'
import LayoutWithoutSidebar from '../../layout-without-sidebar'

const CreateLayout = (props) => {
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
    rules,
    loadingProps: {
      showLoading,
      textLoading,
    },
    buttonText,
    title,
    progressIndicatorText,

  } = props
  // const { showLoading, textLoading } = props.getLoadingData({ loadingState, isLoading })
  // const { title, buttonDesc } = props.getText(type)

  return (
    <>
      <LayoutWithoutSidebar>
        <WrapperStyle>
          <OverlayStyle>
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
                  hideStep
                    ? <ColumnFullStyle>{children}</ColumnFullStyle>
                    : <ColumnRightStyle>{children}</ColumnRightStyle>
                }
              </ChildrenStyle>
              <BoxFooterStyle>
                <InlineStyle>
                  <BoxFooterButtonStyle>
                    <Button
                      name={step === 0 ? 'Cancel' : 'Back'}
                      type="no-border"
                      onClick={handleBackStep}
                    />
                  </BoxFooterButtonStyle>
                  {
                    step < maxStep && (
                      <BoxFooterButtonStyle>
                        <Button name="Next" isDisabled={!allowNext} onClick={() => allowNext ? handleNextStep() : null } />
                      </BoxFooterButtonStyle>
                    )
                  }
                  {
                    step === maxStep && (
                      <BoxFooterButtonStyle>
                        <Button name={buttonDesc} isDisabled={!allowNext} onClick={() => allowNext ? handleAdd() : null } />
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

CreateLayout.propTypes = {
  getText: PropTypes.func.isRequired,
  getLoadingData: PropTypes.func,
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
  rules: PropTypes.object,
}

CreateLayout.defaultProps = {
  getLoadingData: () => {},
  children: null,
  isLoading: false,
  hideStep: false,
  loadingState: '',
  rules: {
    fields : [
      {name: "Dataset Name", key: "datasetName", replacer: "specialAlphaNumeric", maxLength: 260}, 
      {name: "Host", key: "hostName", replacer: undefined},
      {name: "Port", key: "port", replacer: "numeric"},
      [
        {name: "SID / Service Name", key: "oracleType", replacer: "", type: "select", options: [{label: "SID", value: "SID"}, {label: "Service Name", value: "Service Name"}]},
        {name: "", key: "sidservicename", replacer: ""}
      ],
      {name: "Username", key: "username", replacer: "specialAlphaNumeric"},
      {name: "Password", key: "password", type: "password", replacer: "specialAlphaNumeric"}
    ],
    required: ["datasetName", "hostName", "port", "oracleType", "sidservicename", "username", "password"],
    touched: {}
  },
}

export default CreateLayout