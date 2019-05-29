import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import { VolantisTextIcon, ErrorIcon, SpinnerIcon } from 'volantis-icon'
import {
  Text,
  Input,
  Button,
  ModalConfirmation,
} from 'volantis-ui'
import superagent from 'superagent'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

import { routes } from '../../../config/constants'

import {
  Container,
  Box,
  TextContainer,
  FormContainer,
  PasswordContainer,
  ButtonContainer,
} from './styled'

import { actionType, initialState, reducer } from './action'

const errors = {
  invalidEmailOrPassword: {
    title: 'Incorrect email or password',
    subtitle: 'You might type the wrong email or password. Please recheck your input.',
  },
  disconnected: {
    title: 'Connection Error',
    subtitle: 'Oops! There is something wrong with your network. Please check your internet connection!',
  },
}

function Login(props) {
  const [{
    email, password, isValidEmail, isEmailTouched,
    showModal, errorMessage, isSubmitting,
  }, dispatch] = useReducer(reducer, initialState)

  const onChange = e => {
    const type = e.target.name === 'email'
      ? actionType.setEmail
      : actionType.setPassword
    dispatch({
      type,
      payload: e.target.value,
    })
  }

  const onKeyUp = () => (
    dispatch({
      type: actionType.setEmailKeyPress,
      isValidEmail: new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/, 'gi')
        .test(email),
    })
  )

  const onShowModal = () => {
    dispatch({ type: actionType.setShowModal })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (navigator.onLine) {
      try {
        dispatch({ type: actionType.setIsSubmitting })
        const { host, webAPI } = props.service
        const { Text } = await superagent
          .post(`${host + webAPI}/sessions/login`)
          .send({ email, password })
        const cookie = new Cookies()
        const { user, auth } = props.cookies
        cookie.set(auth, Text.id, { path: '/', domain: props.topLevelDomain })
        cookie.set(user, Text.user, { path: '/', domain: props.topLevelDomain })
        props.setIsAuthenticated(true)
      } catch (err) {
        dispatch({ type: actionType.setIsSubmitting })
        dispatch({
          type: actionType.setErrorMessage,
          payload: errors.invalidEmailOrPassword,
        })
        onShowModal()
      }
    } else {
      e.preventDefault()
      dispatch({
        type: actionType.setErrorMessage,
        payload: errors.disconnected,
      })
      onShowModal()
    }
  }

  const showSpinnerIcon = props => <SpinnerIcon {...props} />

  return !props.isAuthenticated
    ? (
      <>
        <Container>
          <Box>
            <VolantisTextIcon width="213.6px" height="100px" color="#ffd77b" />
            <TextContainer>
              <Text type="secondary" align="center">
                Volantis is data economy that helps individual, business and government
                <br />
                to unlock the true power of data to solve the humanity hardest problem.
              </Text>
            </TextContainer>
            <FormContainer>
              <form onSubmit={e => onSubmit(e)}>
                <Input
                  value={email}
                  label="EMAIL"
                  name="email"
                  placeholder="username@example.com"
                  onChange={onChange}
                  onKeyUp={onKeyUp}
                  errorMessage={
                    !isValidEmail && isEmailTouched
                      ? 'Please enter a valid email format (e.g. example@mail.com)'
                      : ''
                  }
                />
                <PasswordContainer>
                  <Input
                    value={password}
                    label="PASSWORD"
                    name="password"
                    type="password"
                    onChange={onChange}
                  />
                </PasswordContainer>
                <ButtonContainer>
                  <Button
                    label="Sign in"
                    type="submit"
                    icon={(isSubmitting && showSpinnerIcon) || null}
                    disabled={isSubmitting}
                  />
                </ButtonContainer>
              </form>
            </FormContainer>
          </Box>
        </Container>
        <ModalConfirmation
          isShow={showModal}
          onClose={onShowModal}
          icon={() => <ErrorIcon width="64" height="64" color="#ffd77b" />}
          title={errorMessage.title}
          subtitle={errorMessage.subtitle}
          primaryButton="Close"
          onClickPrimary={onShowModal}
          reverseBtn
          noBorderSecondaryBtn
        />
      </>
    )
    : <Redirect to={(props.location.state && props.location.state.from) || routes.myData.root} />
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  service: PropTypes.object.isRequired,
  cookies: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  topLevelDomain: PropTypes.string.isRequired,
}

const mapStateToProps = ({ volantisConstant }) => ({
  topLevelDomain: volantisConstant.topLevelDomain,
})

export default connect(mapStateToProps)(Login)
