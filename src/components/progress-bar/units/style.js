import styled from 'styled-components'
import colors from 'Asset/css/mydata-colors'

export const ProgressBarStyled = styled.progress` 
  height: 0.6em;
  width: 235px;
  border: 1px solid ${colors.grayBlack};
  border-radius: 0.5em;

  ::-webkit-progress-bar {
    background-color: ${colors.grayLight};
    border-radius: 0.5em;
  }
  ::-webkit-progress-value {
    background-color: ${colors.gold};
    border-radius: 0.5em; 
  }
`
