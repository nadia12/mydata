import styled from 'styled-components'
import {
  Label,
} from 'volantis-ui'

export const RadioInline = styled.div`
  display: flex;
  padding: .25rem;
  align-items: center;
  width: fit-content;
  cursor: ${props => (props.cursorDisabled ? 'not-allowed' : 'pointer')};
`

export const LabelStyled = styled(Label)`
  padding: 0 0 0 10px;
  cursor: ${props => (props.cursorDisabled ? 'not-allowed' : 'pointer')};
`
