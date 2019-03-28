import { Cols } from '../../../../style'
import styled from 'styled-components'
import colors from '../../../../../../../../../src/assets/css/colors'

export const H3Styled = styled.h3`
  color: ${colors.gold}
`

export const ColsStyled = styled(Cols)`
  > div {
    width: 240px;
  }
`

export const DescriptionStyled = styled.div`
  width: 100%;
  padding: 0 .75rem .75rem 0;
`