import styled from 'styled-components'

import COLORS from 'Asset/css/colors'
import {
  Cols
} from 'Pages/my-data/create/units/style'

export const H3Styled = styled.h3`
  color: ${COLORS.gold};
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
