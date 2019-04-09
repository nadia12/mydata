import React from 'react'
import PropTypes from 'prop-types'
import {
  Subtitle,
  Body
} from 'volantis-ui'

import {
  Cols
} from 'Pages/my-data/create/units/style'
import {
  ColsStyled,
  ColumnChildStyled,
  LeftStyled,
  RightStyled
} from 'Pages/my-data/create/units/database/units/step2/units/style'
import InputStep2 from 'Pages/my-data/create/units/database/units/step2/units/input'

const StepTwoDatabase = props => {
  const {
    data: {
      step0: { dbType }
    },
    handleChangeInput,
    fields,
    rules
  } = props

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          {`Configuration: ${dbType}`}
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
          Please set your database configuration to connect the database to the system.
        </Body>
      </Cols>
      <ColsStyled padding={24}>
        {
          rules && !!rules.fields && rules.fields.map((form, idx) => (
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
                                fields={fields}
                                form={f}
                                idx={`${idx}-${idx2}`}
                                handleChangeInput={handleChangeInput}
                                parent={false}
                              />
                            </LeftStyled>
                          )
                          : (
                            <RightStyled key={idx2}>
                              <InputStep2
                                fields={fields}
                                form={f}
                                idx={`${idx}-${idx2}`}
                                handleChangeInput={handleChangeInput}
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
                    fields={fields}
                    form={form}
                    idx={idx}
                    handleChangeInput={handleChangeInput}
                    parent
                  />
                )
              }
            </React.Fragment>
          ))
        }
      </ColsStyled>
    </>
  )
}

StepTwoDatabase.propTypes = {
  data: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired
}

export default StepTwoDatabase
