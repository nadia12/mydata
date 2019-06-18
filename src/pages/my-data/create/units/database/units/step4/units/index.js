
import React from 'react'
import PropTypes from 'prop-types'
import {
  Label,
  Input,
  Subtitle,
  Text,
} from 'volantis-ui'

import RadioGroup from 'GlobalComponent/radio-group'
import {
  RADIO_LISTS,
} from 'Pages/my-data/create/units/database/units/step4/constant'
import {
  Cols,
  ColsStyled,
} from 'GlobalComponent/cols/units'

const StepFourDatabase = props => {
  const {
    handleChangeInput,
    fields,
    rules: {
      fields: form, required, touched,
    },
  } = props
  const [form0, form1] = form

  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" colorType="primary">
          Synchronisation
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Text colorType="secondary">
          Keep your data updated by having your data synchronized manually or with scheduler. You need to fill in the incrementingColumn and timestampColumn -or at least one of them- in order to enable synchronization. Please mind your settings here as this configuration is not editable.
        </Text>
      </Cols>
      <Cols padding={24}>
        <Label>DO YOU WANT TO TURN ON THE AUTO-SYNC?</Label>
        <RadioGroup handleChangeInput={handleChangeInput} value={fields.autoSync || 'manual'} name="sync" radioLists={RADIO_LISTS} />
      </Cols>
      <ColsStyled padding={8}>
        <Input
          {...form0}
          label="INCREMENTING COLUMN"
          name="step4-1"
          key="step4-1"
          onChange={e => {
            handleChangeInput({
              step: 'step3', key: form0.key, value: e.target.value, replacer: form0.replacer,
            })
          }
          }
          value={fields[form0.key] || ''}
          errorMessage={touched[form0.key] && required.includes(form0.key) && `${fields[form0.key]}`.trim() === '' ? 'Field must be filled' : ''}
        />

      </ColsStyled>
      <Cols padding={24}>
        Please fill with your primary key (column name), which available across all tables. IncrementingColumn is used to track the newly added rows when you synchronize your database.
      </Cols>
      <ColsStyled padding={8}>
        <Input
          {...form1}
          label="TIMESTAMP COLUMN"
          name="step4-2"
          key="step4-2"
          onChange={e => handleChangeInput({
            step: 'step3', key: form1.key, value: e.target.value, replacer: form1.replacer,
          })}
          value={fields[form1.key] || ''}
          errorMessage={touched[form1.key] && required.includes(form1.key) && `${fields[form1.key]}`.trim() === '' ? 'Field must be filled' : ''}
        />
      </ColsStyled>
      <Cols padding={0}>
        Please fill in with your column name which has timestamp data type and available across all tables. TimestampColumn is used to identify which object or row has new update when you synchronize your database.
      </Cols>
    </>
  )
}

StepFourDatabase.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

export default StepFourDatabase
