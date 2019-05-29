import React from 'react'
import PropTypes from 'prop-types'
import { Error404Icon } from 'volantis-icon'
import { Text, Button } from 'volantis-ui'
import {
  Container, Box, TextContainer, ButtonContainer,
} from '../login/units/styled'
import { routes } from '../../config/constants'

export default function Error({ history }) {
  return (
    <Container>
      <Box>
        <Error404Icon width="400px" height="240px" color="#ffd77b" />
        <TextContainer>
          <Text type="secondary" align="center">
            Page not found.
          </Text>
          <Text type="secondary" align="center">
            we are unable to find the page you are looking for
          </Text>
          <ButtonContainer>
            <Button
              label="Back to Home"
              onClick={() => history.push(routes.root)}
            />
          </ButtonContainer>
        </TextContainer>
      </Box>
    </Container>
  )
}

Error.propTypes = {
  history: PropTypes.object.isRequired,
}
