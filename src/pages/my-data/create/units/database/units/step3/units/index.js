import { H3Styled, ColumnStyled, DescriptionStyled } from './style'
import React from 'react'
import {
  radioLists
} from '../constant'
import { Label, Input } from 'volantis-ui'
import RadioGroup from '../../../../../../../../components/radio-group'

const StepThreeDatabase = (props) => {
  const { handleChangeInput, fields, rules: { fields: form, required, touched } } = props
  // const [form0, form1] = form
  return (
    <>
      <H3Styled>Synchronisation</H3Styled>
      <ColumnStyled>
        Keep your data updated by having your data synchronized manually or with scheduler. You need to fill in the incrementingColumn and timestampColumn -or at least one of them- in order to enable synchronization. Please mind your settings here as this configuration is not editable.
      </ColumnStyled>
      <ColumnStyled>
        <Label>DO YOU WANT TO TURN ON THE AUTO-SYNC?</Label>
        <RadioGroup handleChangeInput={() => null} value={fields.autoSync || 'manual'} name="sync" radioLists={radioLists} />
      </ColumnStyled>
      <ColumnStyled>
        <Input
          // {...form0}
          label="INCREMENTING COLUMN"
          name="step3-1"
          key="step3-1"
          // onChange={(e) => handleChangeInput({ step: 'step3', key: form0.key, value: e.target.value, replacer: form0.replacer })}
          onChange={() => {}}
          value={''}
          errorMessage={''}
        />
      </ColumnStyled>
      <DescriptionStyled>
        Please fill with your primary key (column name), which available across all tables. IncrementingColumn is used to track the newly added rows when you synchronize your database.
      </DescriptionStyled>
      <ColumnStyled>
        <Input
          // {...form1}
          label="TIMESTAMP COLUMN"
          name="step3-2"
          key="step3-2"
          // onChange={(e) => this.props.handleChangeInput({ step: 'step3', key: form1.key, value: e.target.value, replacer: form1.replacer })}
          onCHange={() => {}}
          value={''}
          errorMessage={''}
        />
      </ColumnStyled>
      <DescriptionStyled>
        Please fill in with your column name which has timestamp data type and available across all tables. TimestampColumn is used to identify which object or row has new update when you synchronize your database.
      </DescriptionStyled>
    </>
  )
}

StepThreeDatabase.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

export default StepThreeDatabase
