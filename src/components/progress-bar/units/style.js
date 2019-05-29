import styled from 'styled-components'
import colors from 'Asset/css/mydata-colors'

export const ProgressBarStyled = styled.progress`
  border-radius: 2px; 
  height: 8px;
  width: 168px;
  border: 1px solid ${colors.grayBlack};
  border-radius: 8px;

  ::-webkit-progress-bar {
    background-color: ${colors.grayLight};
    border-radius: 8px;
  }
  ::-webkit-progress-value {
    background-color: ${colors.gold};
    border-radius: 8px; 
  }
`
