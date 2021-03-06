import styled from 'styled-components'

export const Cols = styled.div`
  width: 100%;
  padding-bottom: ${props => (props.padding)}px;
  padding-left: 0;
  margin: ${props => (props.margin)}em;
`

export const ColsStyled = styled(Cols)`
  > div {
    width: 240px;
  }
`
