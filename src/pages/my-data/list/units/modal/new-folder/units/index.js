import React from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Column,
  Modal,
  Button,
  Input,
} from 'volantis-ui'

import {
  REPLACER,
} from 'Config/constants'
import {
  NewFolderStyle,
} from './style'

const NewFolderModal = (props) => {
  const inputProps = {
    fields: props.fields,
    allFields: props.allFields,
    allRules: props.allRules,
    allIsValids: props.allIsValids,
    fieldName: 'newFolder',
    key: 'folderName',
    valueReplacer: REPLACER.specialAlphaNumeric,
  }
  return (
    <Modal isShow={true}>
      <NewFolderStyle>
        <h1 className="has-text-gold">New Folder</h1>
        <div className="">
          <Input 
            {...props.rules} 
            onChange={(e) => props.handleChangeInput({ ...inputProps, value: e.target.value, })} 
            name="folder name" 
            value={props.folderName} 
          />
        </div>

        <Row className="columns is-pulled-right align-items padding-top20">
          <Column className="column p0">
            <Button label="Cancel" type="no-border" onClick={() => props.handleCloseModal('newFolder')} />
          </Column>
          <Column className="column is-two-thirds p0">
            <Button label="Add Folder" disabled={!props.isValid} onClick={props.isValid ? props.handleAdd : null } />
          </Column>
        </Row>

      </NewFolderStyle>
    </Modal>
  )
}

NewFolderModal.propTypes = {
  folderName: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  allRules: PropTypes.array.isRequired,
  allFields: PropTypes.array.isRequired,
  allIsValids: PropTypes.array.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
}

NewFolderModal.defaultProps = {
}

export default NewFolderModal
