import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'volantis-ui'

import ProgressIndicator from 'Components/progress-indicator'
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
} from 'PageLayouts/layout-create/units/style'
import LayoutWithoutSidebar from 'PageLayouts/layout-without-sidebar'
import Upload from 'Pages/my-data/create/units/upload/units'
// import RadioGroup from './radio-group/units'
import StepOneFile from 'Pages/my-data/create/units/file/units/step1/units'
import StepTwoFile, {
  RenderTableUpload,
  RenderFormUpload,
} from 'Pages/my-data/create/units/file/units/step2/units'
import StepOneDatabase from 'Pages/my-data/create/units/database/units/step1/units'
import StepTwoDatabase from 'Pages/my-data/create/units/database/units/step2/units'
import StepThreeDatabase from 'Pages/my-data/create/units/database/units/step3/units'
import StepOneIot from 'Pages/my-data/create/units/iot/units/step1/units'
import StepTwoIot from 'Pages/my-data/create/units/iot/units/step2/units'
import TableProperties from 'Pages/my-data/create/units/iot/units/table-properties/units'
import StepThreeIot from 'Pages/my-data/create/units/iot/units/step3/units'

// const UPLOAD_TYPE_LIST = [
//   { label: 'Browse from Local', value: 'local' },
//   { label: 'Insert Link', value: 'link' }
// ]

const Create = (props) => {
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
                      <ProgressIndicator
                        currentStep={step}
                        progressIndicatorText={progressIndicatorText}
                      />
                    </ColumnLeftStyle>
                  )
                }
                {
                  hideStep ? <ColumnFullStyle>{children}</ColumnFullStyle> : <ColumnRightStyle>
                  {/* <Upload
                    handleChangeFileInput={() => {}}
                    fileInput={React.createRef()}
                    accept=""
                  /> */}
                  {/* <RadioGroup
                    handleChangeInput={() => {}}
                    value=""
                    name="uploadType"
                    radioLists={UPLOAD_TYPE_LIST} 
                  /> */}
                   <StepOneFile
                    handleChangeInput={() => {}}
                    fields={[]}
                  />
                  {/* <StepTwoFile
                    handleChangeInput={() => {}}
                    fields={[]}
                  />
                  <RenderTableUpload />
                  <RenderFormUpload
                    rules={rules}
                  />
                  <StepOneDatabase
                    handleChangeInput={() => {}}
                    fields={[]}
                  /> */}
                  {/* <StepTwoDatabase
                    dbType="MsSQL"
                    handleChangeInput={() => {}}
                    fields={[]}
                    rules={rules}
                  /> */}
                  {/* <StepThreeDatabase
                    handleChangeInput={() => {}}
                    fields={[]}
                    rules={[]}
                  /> */}
                  {/* <StepOneIot
                    handleChangeInput={() => {}}
                    fields={[]}
                  /> */}
                  {/* <TableProperties
                    properties={[]}
                    optionProperties={[]}
                    handleChangeProps={() => {}}
                    handleDeleteProps={() => {}}
                    handleAddProps={() => {}}
                  /> */}
                  {/* MASIH BELUM BISA */}
                  {/* <StepTwoIot 
                    handleChangeInput={() => {}}
                    fields={[]}
                    rules={rules}
                  /> */}
                  {/* <StepThreeIot
                    token="003026bbc133714df1834b8638bb496e-8f4b3d9a-e931-478d-a994-28a725159ab9" 
                  /> */}
                    {children}
                  </ColumnRightStyle>
                }
              </ChildrenStyle>
              <BoxFooterStyle>
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
                        <Button name="Next" disabled={!allowNext} onClick={() => allowNext ? handleNextStep({ step }) : null } />
                      </BoxFooterButtonStyle>
                    )
                  }
                  {
                    step === maxStep && (
                      <BoxFooterButtonStyle>
                        <Button name={buttonText} disabled={!allowNext} onClick={() => allowNext ? handleAdd() : null } />
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
  rules: PropTypes.object,
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
  isLoading: false,
  hideStep: false,
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

export default Create
