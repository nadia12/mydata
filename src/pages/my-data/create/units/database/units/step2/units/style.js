import styled from 'styled-components'

import {
  Cols,
} from 'Pages/my-data/create/units/style'

export const ColsStyled = styled(Cols)`
  > div {
    width: 302px;
  }
`

export const ColumnChildStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
`

export const LeftStyled = styled.div`
  padding: 0;
  flex: none;
  width: 40%;
  > div > div {
    margin-top: 4px;
    > div{
      width: 120px;
    }
  } 
`

export const RightStyled = styled.div`
  padding: 0;
  margin-left: 0.25rem;
  margin-top: 22px;
  > div {
    width: 174px;
  }
`
