import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Title,
  Label,
  Body,
  Subtitle,
  Button,
} from 'volantis-ui'
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

const AssetDetailModal = props => {
  const {
    selected,
    appLists,
    setToggleModalClose,
  } = props

  const { asset } = selected

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
                <Body type="white">{!!asset[0] && asset[0].name}</Body>
              </Cols>
            </LeftStyled>
            <RightStyled>
              <Cols padding={10}>
                <Label>DATE CREATED</Label>
              </Cols>
              <Cols padding={0}>
                <Body type="white">{!!asset[0] && asset[0].createdDate}</Body>
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

            { appLists.length ? appLists.map((app, idx) => (
              <ListBoxStyled key={`app-list-${idx}`}>
                <AppName>
                  <Subtitle size="big" type="secondary">{app.name}</Subtitle>
                </AppName>
                <Status>
                  <Subtitle size="big" type="secondary">{app.isEnabled ? 'Active' : 'Disabled'}</Subtitle>
                </Status>
                <Action>
                  <Button
                    label="Config"
                    theme="no-border"
                    icon={props => <SettingIcon {...props} width="16" />}
                    onClick={() => props.handleToApiManagement(app.id)}
                  />
                </Action>
              </ListBoxStyled>
            )) : <div className="vh-centering"><p>NO DATA</p></div>
            }

          </BoxContentStyled>
        </AssetContentStyled>
        <AssetFooterStyled>
          <Button
            label="Close"
            onClick={() => setToggleModalClose()}
          />
        </AssetFooterStyled>
      </AssetDetailsStyled>
    </Modal>
  )
}

AssetDetailModal.propTypes = {
  selected: PropTypes.object.isRequired,
  appLists: PropTypes.array.isRequired,
  setToggleModalClose: PropTypes.func.isRequired,
  handleToApiManagement: PropTypes.func.isRequired,
}

export default AssetDetailModal
