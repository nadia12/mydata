import React from 'react'
import PropTypes from 'prop-types'
import { ChildrenStyle, H2Style, BoxLayoutStyle, ColumnLeftStyle, ColumnFullStyle, ColumnRightStyle, InlineStyle, BoxFooterButtonStyle, BoxFooterStyle, BoxHeaderStyle, WrapperStyle, OverlayStyle } from './style'
import { Button /*, Navbar  */ } from 'volantis-ui'
import ProgressIndicator from '../../../components/progress-indicator'
import LayoutWithoutSidebar from '../../layout-without-sidebar'
// import Upload from '../../../pages/my-data/create/units/upload/units'
// import RadioGroup from './radio-group/units'
// import StepOneFile from '../../../pages/my-data/create/units/file/units/step1/units'
// import StepTwoFile, { RenderTableUpload, RenderFormUpload } from '../../../pages/my-data/create/units/file/units/step2/units';
// import StepOneDatabase from '../../../pages/my-data/create/units/database/units/step1/units';
// import StepTwoDatabase from '../../../pages/my-data/create/units/database/units/step2/units';
// import StepThreeDatabase from '../../../pages/my-data/create/units/database/units/step3/units';
// import StepOneIot from '../../../pages/my-data/create/units/iot/units/step1/units';
// import TableProperties from '../../../pages/my-data/create/units/iot/units/table-properties/units';
// import StepTwoIot from '../../../pages/my-data/create/units/iot/units/step2/units';
import StepThreeIot from '../../../pages/my-data/create/units/iot/units/step3/units';

// const uploadTypeList = [
//   { label: 'Browse from Local', value: 'local' },
//   { label: 'Insert Link', value: 'link' }
// ];

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
  // const rules = {
  //   touched: {filePath: true, fileSize: true, UUID: true, fileType: true},
  //   required: ["fileName", "filePath"],
  //   fields: [{name: "File Name", key: "fileName", replacer: "specialAlphaNumeric", maxLength: 260, type: "input"}]
  // }
  
  // const rules = {
  //   fields : [
  //     {name: "Dataset Name", key: "datasetName", replacer: "specialAlphaNumeric", maxLength: 260}, 
  //     {name: "Host", key: "hostName", replacer: undefined},
  //     {name: "Port", key: "port", replacer: "numeric"},
  //     {name: "Database Name", key: "databaseName", replacer: "specialAlphaNumeric"},
  //     {name: "Username", key: "username", replacer: "specialAlphaNumeric"},
  //     {name: "Password", key: "password", type: "password", replacer: "specialAlphaNumeric"}
  //   ],
  //   required: ["datasetName", "hostName", "port", "databaseName", "username", "password"],
  //   touched: {}
  // }

  const rules = {
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
  }

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
                    radioLists={uploadTypeList} 
                  /> */}
                   {/* <StepOneFile
                    handleChangeInput={() => {}}
                    fields={[]}
                  /> */}
                  {/* <StepTwoFile
                    handleChangeInput={() => {}}
                    fields={[]}
                  /> */}
                  {/* <RenderTableUpload /> */}
                  {/* <RenderFormUpload
                    rules={rules}
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
                  <StepThreeIot
                    token="003026bbc133714df1834b8638bb496e-8f4b3d9a-e931-478d-a994-28a725159ab9" 
                  />
                    {children}
                  </ColumnRightStyle>
                }
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