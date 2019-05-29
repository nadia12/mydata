import styled from 'styled-components'
import colors from 'Asset/css/mydata-colors'

export const H3Styled = styled.div`
  color: ${colors.gold};
  font-size: 16px;
`

export const Cols = styled.div`
  width: 100%;
  padding-bottom: ${props => (props.padding)}px;
  padding-left: 0;
`
