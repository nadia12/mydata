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
import { NewFolderStyle } from './style'

const NewFolderModal = ({
  _mydataList, handleCloseModal, handleChangeInput, handleAdd, linkTo,
}) => (
  <Modal isShow>
    <NewFolderStyle>
      <h1 className="has-text-gold">New Folder</h1>
      <Input
        {..._mydataList.rules}
        name="Folder Name"
        label="Folder Name"
        onChange={e => handleChangeInput({
          fieldName: 'newFolder',
          key: 'folderName',
          value: e.target.value,
          valueReplacer: REPLACER.specialAlphaNumeric,
        })}
        value={_mydataList.folderName}
      />

      <Row className="columns is-pulled-right align-items padding-top20">
        <Column className="column p0">
          <Button label="Cancel" theme="no-border" onClick={() => handleCloseModal()} />
        </Column>
        <Column className="column is-two-thirds p0">
          <Button label="Add Folder" disabled={!_mydataList.isValid} onClick={_mydataList.isValid ? () => handleAdd(linkTo) : () => {}} />
        </Column>
      </Row>

    </NewFolderStyle>
  </Modal>
)

NewFolderModal.propTypes = {
  _mydataList: PropTypes.object.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func,
  handleCloseModal: PropTypes.func.isRequired,
  linkTo: PropTypes.func.isRequired,
}

NewFolderModal.defaultProps = {
  handleAdd: () => {},
}

export default NewFolderModal
