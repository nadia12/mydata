import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Title, Label, Body, Subtitle, Button } from 'volantis-ui'
import { SettingIcon } from 'volantis-icon'
import { 
  AssetDetailsStyled,
  Cols,
  LeftStyled,
  RightStyled,
  HalfStyled,
  AssetTopStyled,
  AssetContentStyled,
  BoxContentStyled,
  ListBoxStyled,
  AppName,
  Status,
  Action,
  AssetFooterStyled,
} from './style'

const DatasetDetailModal = props => {
  const {
    isDataset,
    assetId,
    handleCloseModal,
    assetName,
    dateCreated,
    endpoints,
    accuracy,
    queryBuilders,
    accessToken,
  } = props

  return (
    <Modal isShow noPadding>
      <AssetDetailsStyled>
        <AssetTopStyled>
          <Cols padding={32}>
            <Title>Asset details</Title>
          </Cols>
          <HalfStyled padding={0}>
            <LeftStyled>
              <Cols padding={10}>
                <Label>DATASET NAME</Label>
              </Cols>
              <Cols padding={0}>
                <Body type="white">{assetName}</Body>
              </Cols>
            </LeftStyled>
            <RightStyled>
              <Cols padding={10}>
                <Label>DATE CREATED</Label>
              </Cols>
              <Cols padding={0}>
                <Body type="white">{dateCreated}</Body>
              </Cols>
            </RightStyled>
          </HalfStyled>
        </AssetTopStyled>
        <AssetContentStyled>
          <BoxContentStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Status</Subtitle>
              </Status>
              <Action>{' '}</Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 1</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={props => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 2</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Disabled</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 3</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 1</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 1</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 1</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 1</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
            <ListBoxStyled>
              <AppName>
                <Subtitle size="big" type="secondary">App Name 1</Subtitle>
              </AppName>
              <Status>
                <Subtitle size="big" type="secondary">Active</Subtitle>
              </Status>
              <Action>
                <Button
                  label="Config"
                  type="no-border"
                  icon={(props) => <SettingIcon {...props} width="16" />}
                />
              </Action>
            </ListBoxStyled>
          </BoxContentStyled>
        </AssetContentStyled>
        <AssetFooterStyled>
          <Button
            label="Close"
          />
        </AssetFooterStyled>
      </AssetDetailsStyled>
    </Modal>
  );
}

DatasetDetailModal.propTypes = {
  isDataset: PropTypes.bool.isRequired,
  assetId: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  assetName: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  endpoints: PropTypes.array.isRequired,
  accuracy: PropTypes.number.isRequired,
  queryBuilders: PropTypes.array.isRequired,
  accessToken: PropTypes.string.isRequired
}

export default DatasetDetailModal
