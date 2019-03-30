import { H3Styled, ColsStyled, DescriptionStyled } from './style'
import { Cols } from '../../../../style'
import React from 'react'
import {
  radioLists
} from '../constant'
import { Label, Input, Subtitle,  Body } from 'volantis-ui'
import RadioGroup from '../../../../../../../../components/radio-group'

const StepThreeDatabase = (props) => {
  const { handleChangeInput, fields, rules: { fields: form, required, touched } } = props
  // const [form0, form1] = form
  return (
    <>
      <Cols padding={16}>
        <Subtitle size="big" type="primary">
          Synchronisation
        </Subtitle>
      </Cols>
      <Cols padding={24}>
        <Body type="secondary">
          Keep your data updated by having your data synchronized manually or with scheduler. You need to fill in the incrementingColumn and timestampColumn -or at least one of them- in order to enable synchronization. Please mind your settings here as this configuration is not editable.
        </Body>
      </Cols>
      <Cols padding={24}>
        <Label>DO YOU WANT TO TURN ON THE AUTO-SYNC?</Label>
        <RadioGroup handleChangeInput={() => null} value={fields.autoSync || 'manual'} name="sync" radioLists={radioLists} />
      </Cols>
      <ColsStyled padding={8}>
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
      </ColsStyled>
      <Cols padding={24}>
        Please fill with your primary key (column name), which available across all tables. IncrementingColumn is used to track the newly added rows when you synchronize your database.
      </Cols>
      <ColsStyled padding={8}>
        <Input
          // {...form1}
          label="TIMESTAMP COLUMN"
          name="step3-2"
          key="step3-2"
          // onChange={(e) => this.props.handleChangeInput({ step: 'step3', key: form1.key, value: e.target.value, replacer: form1.replacer })}
          onChange={() => {}}
          value={''}
          errorMessage={''}
        />
      </ColsStyled>
      <Cols padding={0}>
        Please fill in with your column name which has timestamp data type and available across all tables. TimestampColumn is used to identify which object or row has new update when you synchronize your database.
      </Cols>
    </>
  )
}

StepThreeDatabase.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
}

export default StepThreeDatabase
