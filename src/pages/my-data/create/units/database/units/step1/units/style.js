import styled from 'styled-components'
import { Cols } from '../../../../style'
import colors from '../../../../../../../../../src/assets/css/colors'

export const H3Styled = styled.h3`
  color: ${colors.gold}
`

export const ColsStyled = styled(Cols)`
  > div {
    width: 240px;
  }
`