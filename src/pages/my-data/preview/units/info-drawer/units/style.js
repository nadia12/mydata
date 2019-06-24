import styled from 'styled-components'
import COLORS from 'Asset/css/mydata-colors'

export const InfoBoxStyle = styled.div`
  width: 280px;
  height: calc(100vh - 144px);
  position: fixed;
  background: ${COLORS.grayDark};
  z-index: 3;
  right: 2.2rem;
  border-left: 1px solid #1b1c21;
  outline: none;
  top: 7.5em;
  border-radius: 0px 0px 8px 0px;
  overflow-y: auto;
  overflow-x: hidden;

  .bvPJql{
    font-size: 0.875rem;
    color: #fff;
  }
`

