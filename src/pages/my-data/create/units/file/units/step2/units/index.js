
import React from 'react'
import { 
  Table,
  Input,
  Select,
  Label,
  Subtitle,
  Body,
} from 'volantis-ui'

import {
  Cols,
} from 'Pages/my-data/create/units/style'
import {
  H3Styled,
  ColumnStyled,
  TableWrapper,
  FormStyled,
} from './style'
import {
  MYDATA_CREATE,
} from 'Config/constants'
import Upload from 'Pages/my-data/create/units/upload/units'

const StepTwoFile = (props) => {
  const {
    handleChangeInput,
    fields,
  } = props
  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          Upload File
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
          { MYDATA_CREATE.UPLOAD_DESCRIPTION.file }
        </Body>
      </Cols>
      <Cols padding={0}>
        <Upload
          handleChangeFileInput={() => {}}
          fileInput={React.createRef()}
          accept=""
          // accept={accept}
          // files={files}
          // fileInput={this.fileInput}
          // handleChangeFileInput={this.handleChangeFileInput}
          // handleOnUpload={this.handleOnUpload}
        />
      </Cols>
    </>
  )
}

export const RenderTableUpload = (props) => {
  // const { files } = this.state;
  // let { tusPercentage } = this.state;

  // const file = typeof files[0] === 'undefined' ? this.props.files.file : files[0];
  // tusPercentage = this.props.files.status === 0 ? tusPercentage : this.props.files.status;
  // const status = tusPercentage === 100 ? 'Success Upload' : (<ProgressBar progress={tusPercentage} max={100} />);

  return (
    <>
      {/* <Table
        hasBorder={false}
        thead={['Filename', 'Type', '']}
        tbody={[{ filename: file.name, type: file.type, status }]}
      /> */}
      <Cols padding={24}>
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <td>Filename</td>
                <td>Type</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Filename</td>
                <td>Filetype</td>
                <td>status</td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      </Cols>
    </>
  );
}

export const RenderFormUpload = (props) => {
  const {
    handleChangeInput,
    fields,
    rules,
  } = props
  // return null
  return (
    <Cols padding={16}>
      {
        rules && rules.fields && rules.fields.map((form, idx) => {
          if (!!!form.type) return
          return (
            <React.Fragment key={idx}>
              <FormStyled>
                {
                  form.type && form.type === 'select' && (
                    <>
                      <Label>
                        {`${form.name || ''}`.toUpperCase()}
                      </Label>
                      <Select
                        name={form.key}
                        placeholder="(select type)"
                        options={form.options}
                        onChange={(selected) => handleChangeInput({ step: 'step1', value: selected.value, key: form.key })}
                        value={''} />
                    </>
                  )
                }
                {
                  !(form.type && form.type === 'select') && (
                    <Input
                      {...form}
                      label={form.name}
                      name={form.key}
                      key={`step1-${idx}`}
                      onChange={(e) => handleChangeInput({ step: 'step1', key: form.key, value: e.target.value, replacer: form.replacer })}
                      value={form.key || ''}
                      errorMessage={''}
                    />
                  )
                }
              </FormStyled>
            </React.Fragment>
          );
        })
      }
    </Cols>
  );
}

StepTwoFile.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

export default StepTwoFile
