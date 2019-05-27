import styled from 'styled-components'

import colors from 'Asset/css/mydata-colors'

export const H3Styled = styled.h3`
  color: ${colors.gold};
`

export const ColumnStyled = styled.div`
  width: 100%;
  padding: 0.75rem;
  padding-left: 0;
`

export const TableWrapper = styled.div`
  table {
    width: 100%;
  }
`

export const FormStyled = styled.div`
  padding-bottom: 24px;
  width: 320px;

  ${({ isLocal }) => isLocal && `
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0 6rem;
  `}
  
`

export const DivStyled = styled.div`
  display: flex;
  align-items: center;
`
