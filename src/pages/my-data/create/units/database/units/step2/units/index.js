import { H3Styled, ColumnStyled, ColumnChildStyled, LeftStyled, RightStyled } from './style'
import React from 'react'
import { Select, Label, Input } from 'volantis-ui'
import { ColumnRightStyle } from '../../../../style';

const renderInput = (fields, form, idx, parent = true) => {
  return (
    <ColumnStyled>
      {
        form.type && form.type === 'select' && (
          <>
            {form.name}
            { parent && (<Label>{`${form.name || ''}`.toUpperCase()}</Label> )}
            <Select
              isMulti={form.isMultiSelect}
              name={form.key}
              placeholder="(select type)"
              options={form.options}
              onChange={(selected) => handleChangeInput({ value: selected, key: form.key })}
              value={fields[form.key] || 
              []} />
          </>
        )
      }
      {
        !(form.type && form.type === 'select') && (
          <span className={form.label === '' ? 'mt-label' : ''}>
            <Input
              {...form}
              label={form.name}
              key={`step1-${idx}`}
              onChange={(e) => handleChangeInput({ step: 'step1', key: form.key, value: e.target.value, replacer: form.replacer })}
              value={fields[form.key] || ''}
              errorMessage={''}
            />
          </span>
        )
      }
    </ColumnStyled>
  );
}

const StepTwoDatabase = (props) => {
  const { dbType, handleChangeInput, fields, rules } = props
  console.log('rules fields form',  rules.fields[0], Array.isArray(rules.fields[0]) )
  return (
    <>
      <H3Styled>{`Configuration: ${dbType}`}</H3Styled>
      <ColumnStyled>
        Please set your database configuration to connect the database to the system.
      </ColumnStyled>
      <ColumnStyled>
        { 
          rules.fields.map((form, idx) => (
            <React.Fragment key={`step1-${idx}`}>
              {
                Array.isArray(form) && (
                  <>
                    <Label>{`${form.name || ''}`.toUpperCase()}</Label>
                      <ColumnChildStyled>
                        {form.map((f, idx2) => (
                          idx2 === 0 ? 
                            <LeftStyled key={idx2}>{renderInput(fields, f, `${idx}-${idx2}`, false)}</LeftStyled> : 
                            <RightStyled key={idx2}>{renderInput(fields, f, `${idx}-${idx2}`, false)}</RightStyled>
                        ))}
                      </ColumnChildStyled>
                  </>
                )
              }
              {
                !Array.isArray(form) && renderInput(fields, form, idx)
              }
            </React.Fragment>
          ))
        }
      </ColumnStyled>
    </>
  )
}

StepTwoDatabase.propTypes = {
  dbType: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired
}

export default StepTwoDatabase
