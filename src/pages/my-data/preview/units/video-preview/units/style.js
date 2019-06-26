import styled from 'styled-components'

const PreviewBoxStyle = styled.div`
  background: #1b1c21;
  height: calc(100vh - 189px);
  overflow: auto;
  display: grid;
  width: 100%
`

const VideoBox = styled.div`
  width: 100%;
  height: 100%;
  vertical-align: middle;
  align-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
  img {
    height: auto;
  }
`

const ControlBox = styled.div`
  padding: 32px;
  svg {
    cursor: pointer;
  }

  span {
    color: #fff;
    margin-right: 16px;
    font-size: 20px;
  }

  .kcEqNy {
    background: none;
    font-size: 20px;
    width: 44px;
    padding: 0 0px 0 7px;
    margin-left: 16px;
  }

  .hngXtO {
    font-size: 20px !important;
  }
`

PreviewBoxStyle.VideoBox = VideoBox
PreviewBoxStyle.ControlBox = ControlBox

export default PreviewBoxStyle
