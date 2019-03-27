import styled from 'styled-components'
import colors from '../../../../../../../../../src/assets/css/colors'

export const H3Styled = styled.h3`
  color: ${colors.gold}
`

export const ColumnStyled = styled.div`
  width: 100%;
  padding: 0.75rem;
  padding-left: 0;
`

export const TabTokenStyled = styled.div`
  display: flex;
  justify-content: center;
`

export const OptionTokenStyled = styled.div`
  border: 1px solid ${colors.grayBlack};
  width: 80px;
  height: 32px;
  background: ${props => (props.isSelected ? colors.gold : colors.grayBlue)};
  color: ${props => (props.isSelected ? colors.grayBlack : colors.gray)};
  text-align: center;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  :first-child {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }
  :last-child {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
`

export const BoxToken = styled.div`
  width: auto;
  height: auto;
  background-color: ${colors.grayBlue};
  color: #00bdce;
  border: 1px solid ${colors.grayBlack};
  line-height: 20px;
  letter-spacing: 0.25px;
  border-radius: 8px;
`

export const BoxTokenContent = styled.div`
  padding: 16px;
  display: flex;

  :first-child {
    border-bottom: 1px solid ${colors.grayBlack};
    justify-content: space-between;
  }
`

export const BoxTokenContentWordWrap = styled(BoxTokenContent)`
  word-break: break-word;
`