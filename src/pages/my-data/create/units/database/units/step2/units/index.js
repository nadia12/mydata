import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Text,
} from 'volantis-ui'

import {
  Cols,
} from 'GlobalComponent/cols/units'
import {
  ColsStyled,
  ColumnChildStyled,
  LeftStyled,
  RightStyled,
} from 'Pages/my-data/create/units/database/units/step2/units/style'
import InputStep2 from 'Pages/my-data/create/units/database/units/step2/units/input'

const StepTwoDatabase = props => {
  const {
    data: {
      step0: { dbType },
    },
    handleChangeInput,
    fields,
    rules,
  } = props

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          {`Configuration: ${dbType}`}
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Text colorType="secondary">
          Please set your database configuration to connect the database to the system.
        </Text>
      </Cols>
      <ColsStyled padding={24}>
        {
          rules && !!rules.fields && rules.fields.map((form, idx) => {
            const hasError = form.key && rules.required && rules.touched && rules.touched[form.key] && rules.required.findIndex(req => req === form.key) > -1 && fields[form.key] === ''
            const inputProps = {
              handleChangeInput,
              errorMessage: hasError ? 'Fields is required' : '',
              fields,
            }

            return (
              <React.Fragment key={`step1-${idx}`}>
                {
                  Array.isArray(form) && (
                    <>
                      <ColumnChildStyled>
                        {form.map((f, idx2) => (
                          idx2 === 0
                            ? (
                              <LeftStyled key={idx2}>
                                <InputStep2
                                  {...inputProps}
                                  form={f}
                                  idx={`${idx}-${idx2}`}
                                  parent={false}
                                />
                              </LeftStyled>
                            )
                            : (
                              <RightStyled key={idx2}>
                                <InputStep2
                                  {...inputProps}
                                  form={f}
                                  idx={`${idx}-${idx2}`}
                                  parent={false}
                                />
                              </RightStyled>
                            )
                        ))}
                      </ColumnChildStyled>
                    </>
                  )
                }
                {
                  !Array.isArray(form) && (
                    <InputStep2
                      {...inputProps}
                      form={form}
                      idx={idx}
                      parent
                    />
                  )
                }
              </React.Fragment>
            )
          })
        }
      </ColsStyled>
    </>
  )
}

StepTwoDatabase.propTypes = {
  data: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

export default StepTwoDatabase
