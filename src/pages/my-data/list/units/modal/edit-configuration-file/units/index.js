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
import { EditConfigurationFileStyle, DivInputStyle, TextStyle } from './style'

const EditConfigurationFile = ({
  isValid,
  rules,
  handleCloseModal,
  handleChangeInput,
  handleSave,
  // linkTo,
  fields,
}) => (
  <Modal isShow>
    <EditConfigurationFileStyle>
      <h1 className="has-text-gold has-text-24 mb8px">Edit configuration</h1>
      <TextStyle>
        <h5 className="has-text-14 has-text-gray mt0">
          Please note that after editing configuration you will need to synchronize the connector in order to have the latest data from the connector.
        </h5>
      </TextStyle>

      <DivInputStyle>
        <Input
          {...rules || ''}
          name="File Name"
          label="File Name"
          value={fields.editConfigurationFile.name}
          disabled
        />
      </DivInputStyle>
      <br />

      <DivInputStyle>
        <Input
          {...rules || ''}
          name="URL"
          label="URL"
          onChange={e => handleChangeInput({
            fieldName: 'editConfigurationFile',
            key: 'fileUrl',
            value: e.target.value,
            valueReplacer: REPLACER.specialAlphaNumeric,
          })}
          value={fields.editConfigurationFile.fileUrl}
        />
      </DivInputStyle>

      <Row className="columns is-pulled-right align-items pt32px mr0">
        <Column className="column p0">
          <Button label="Cancel" theme="no-border" onClick={() => handleCloseModal()} />
        </Column>
        <Column className="column is-two-thirds p0">
          <Button label="Save Changes" disabled={!isValid} onClick={isValid ? () => handleSave('editConfigurationFile') : () => {}} />
        </Column>
      </Row>

    </EditConfigurationFileStyle>
  </Modal>
)

EditConfigurationFile.propTypes = {
  fields: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  rules: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleSave: PropTypes.func,
  handleCloseModal: PropTypes.func.isRequired,
  // linkTo: PropTypes.func.isRequired,
}

EditConfigurationFile.defaultProps = {
  handleSave: () => {},
}

export default EditConfigurationFile
