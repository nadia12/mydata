import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'volantis-ui';
import { Columns, Column } from '../../../../../../../assets/css/bulma'
import { replacer } from '../../../../../../../config/constants/constant';
import { NewFolderStyle } from './style';

const NewFolderModal = props => {
  console.log("NewFolderModal", props)
  return (
    <Modal isShow={true}>
      <NewFolderStyle>
        <h1 className="has-text-gold">New Folder</h1>
        <div className="">
          <Input 
            {...props.rules} 
            onChange={(e) => props.handleChangeInput({ 
              fields: props.fields,
              allFields: props.allFields,
              allRules: props.allRules,
              fieldName: 'newFolder', 
              key: 'folderName',
              value: e.target.value,
              valueReplacer: replacer.specialAlphaNumeric })} 
            name="folder name" 
            value={props.folderName} 
          />
        </div>
        <Columns className="columns is-pulled-right align-items padding-top20">
          <Column className="column p0">
            <Button label="Cancel" type="no-border" onClick={() => props.handleCloseModal('newFolder')} />
          </Column>
          <Column className="column is-two-thirds p0">
            <Button label="Add Folder" disabled={!props.isValid} onClick={props.isValid ? props.handleAdd : null } />
          </Column>
        </Columns>
      </NewFolderStyle>
    </Modal>
  );
}

NewFolderModal.propTypes = {
  folderName: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  allRules: PropTypes.array.isRequired,
  allFields: PropTypes.array.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

NewFolderModal.defaultProps = {
}

export default NewFolderModal
