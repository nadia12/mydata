import styled from 'styled-components'

import {
  Cols,
} from 'Pages/my-data/create/units/style'

export const ColsStyled = styled(Cols)`
  width: 320px;
`

export const ColumnChildStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
`

export const LeftStyled = styled.div`
  padding: 0;
  flex: none;
  width: 120px;
  > div > div {
    margin-top: 4px;
    width: 120px;
    > div{
      width: 120px;
    }
  }
`

export const RightStyled = styled.div`
  padding: 0;
  margin-left: 0.5rem;
  margin-top: 25px;
  width: 192px;
  > div {
    width: 192px;
  }
`
