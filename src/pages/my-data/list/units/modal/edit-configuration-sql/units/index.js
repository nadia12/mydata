import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Column,
  Modal,
  Button,
  Input,
} from 'volantis-ui'

import { REPLACER } from 'Config/constants'
import { EditConfigurationSQLStyle } from '../style'

const EditConfigurationSQL = ({ _mydataList }) => {
  const {
    isValid,
    rules,
    handleCloseModal,
    handleChangeInput,
    handleAdd,
    linkTo,
    fields,
  } = _mydataList

  return (
    <Modal isShow>
      <EditConfigurationSQLStyle>
        <h1 className="has-text-gold">Edit Configuration</h1>
        <Input
          {...rules || ''}
          placeholder="database_sku"
          name="Database Name"
          label="Database Name"
          onChange={e => handleChangeInput({
            fieldName: 'editConfigurationSQL',
            key: 'databaseName',
            value: e.target.value,
            valueReplacer: REPLACER.specialAlphaNumeric,
          })}
          value={fields.editConfigurationSQL.databaseName}
        />
        <Row>
          <Column>
            <Input
              {...rules || ''}
              name="Host"
              label="Host"
              onChange={e => handleChangeInput({
                fieldName: 'editConfigurationSQL',
                key: 'hostName',
                value: e.target.value,
                valueReplacer: REPLACER.specialAlphaNumeric,
              })}
              value={fields.editConfigurationSQL.hostName}
            />
          </Column>
          <Column>
            <Input
              {...rules || ''}
              name="Port"
              label="Port"
              onChange={e => handleChangeInput({
                fieldName: 'editConfigurationSQL',
                key: 'port',
                value: e.target.value,
                valueReplacer: REPLACER.numeric,
              })}
              value={fields.editConfigurationSQL.port}
            />
          </Column>
        </Row>

        <Input
          {...rules || ''}
          name="Username"
          label="Username"
          onChange={e => handleChangeInput({
            fieldName: 'editConfigurationSQL',
            key: 'username',
            value: e.target.value,
            valueReplacer: REPLACER.specialAlphaNumeric,
          })}
          value={fields.editConfigurationSQL.username}
        />
        <Input
          {...rules || ''}
          name="Password"
          label="Password"
          type="password"
          onChange={e => handleChangeInput({
            fieldName: 'editConfigurationSQL',
            key: 'password',
            value: e.target.value,
            valueReplacer: REPLACER.specialAlphaNumeric,
          })}
          value={fields.editConfigurationSQL.password}
        />

        <Row className="columns is-pulled-right align-items padding-top20">
          <Column className="column p0">
            <Button label="Cancel" theme="no-border" onClick={() => handleCloseModal()} />
          </Column>
          <Column className="column is-two-thirds p0">
            <Button label="Save" disabled={!isValid} onClick={isValid ? () => handleAdd(linkTo) : () => {}} />
          </Column>
        </Row>

      </EditConfigurationSQLStyle>
    </Modal>
  )
}
EditConfigurationSQL.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  isValid: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func,
  handleCloseModal: PropTypes.func.isRequired,
  linkTo: PropTypes.func.isRequired,
}

EditConfigurationSQL.defaultProps = {
  handleAdd: () => {},
}

export default EditConfigurationSQL
