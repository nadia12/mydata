import React from 'react'
import PropTypes from 'prop-types'
import Alert from 'GlobalComponent/alert'

import {
  Row,
  Column,
  Modal,
  Button,
  Input,
} from 'volantis-ui'

import { REPLACER } from 'Config/constants'
import { EditConfigurationSQLStyle } from './style'

const EditConfigurationSQL = ({
  isValid,
  rules,
  handleCloseModal,
  handleChangeInput,
  handleSave,
  // linkTo,
  fields,
  errorToast,
  errorMessage,
}) => (
  <Modal isShow>
    <EditConfigurationSQLStyle>
      <h1 className="has-text-gold">Edit Configuration</h1>
      <p>
        Please note that after editing configuration you will
        need to synchronize the connector in order to have
        the latest data from the connector.
      </p>
      <br />
      {
        errorToast && (
          <Alert
            isShow
            type="error"
            onClose={() => handleCloseModal('errorToast')}
          >
            {errorMessage}
          </Alert>
        )
      }

      <Input
        {...rules || ''}
        placeholder="database_sku"
        name="Database Name"
        label="Database Name"
        value={fields.editConfigurationSQL.databaseName}
        disabled
      />
      <br />

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
      <br />

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
      <br />

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
      <br />

      <Row className="columns is-pulled-right align-items padding-top20">
        <Column className="column p0">
          <Button label="Cancel" theme="no-border" onClick={() => handleCloseModal('editConfigurationSQL')} />
        </Column>
        <Column className="column is-two-thirds p0">
          <Button label="Save" disabled={!isValid} onClick={isValid ? () => handleSave('editConfigurationSQL') : () => {}} />
        </Column>
      </Row>

    </EditConfigurationSQLStyle>
  </Modal>
)
EditConfigurationSQL.propTypes = {
  fields: PropTypes.object.isRequired,
  isValid: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  handleCloseModal: PropTypes.func.isRequired,
  errorToast: PropTypes.bool.isRequired,
  errorMessage: PropTypes.object,
  // linkTo: PropTypes.func.isRequired,
}

EditConfigurationSQL.defaultProps = {
  handleSave: () => {},
  errorMessage: {},
}

export default EditConfigurationSQL
