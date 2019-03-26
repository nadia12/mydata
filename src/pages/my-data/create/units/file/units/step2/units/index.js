import { H3Styled, ColumnStyled, TableWrapper, FormStyled } from './style'
import React from 'react'
import { MYDATA_CREATE } from '../../../../../../../../config/constants/constant'
import Upload from '../../../../upload/units'
import { Table, Input, Select, Label } from 'volantis-ui'

const StepTwoFile = (props) => {
  const { handleChangeInput, fields } = props
  return (
    <>
      <H3Styled>Upload File</H3Styled>
      <ColumnStyled>
        { MYDATA_CREATE.UPLOAD_DESCRIPTION.file }
      </ColumnStyled>
      <ColumnStyled>
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
      </ColumnStyled>
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
    </>
  );
}

export const RenderFormUpload = (props) => {
  const { handleChangeInput, fields, rules } = props
  console.log(rules)
  // return null
  return (
    <ColumnStyled>
      {
        rules && rules.fields && rules.fields.length > 0 && rules.fields.map((form, idx) => {
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
    </ColumnStyled>
  );
}

StepTwoFile.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

export default StepTwoFile
