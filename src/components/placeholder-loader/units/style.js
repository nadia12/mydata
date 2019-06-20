
import styled, { keyframes } from 'styled-components'

const placeHolderShimmer = keyframes`
  0%{
    background-position: -468px 0
  }
  100%{
    background-position: 468px 0
  }
`

export const AnimatedStyle = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 4px;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderShimmer};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right,#eeeeee59 8%,#dddddd91 18%,#eeeeee59 33%);
  background-size: 800px 104px;
  position: relative;
`
