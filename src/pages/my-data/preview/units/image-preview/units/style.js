import styled from 'styled-components'

const PreviewBoxStyle = styled.div`
  background: #1b1c21;
  height: calc(100vh - 189px);
  overflow: auto;
  display: grid;
  width: 100%
`

const ImageBox = styled.div`
  min-height: 30vw;
  height: auto;
  padding: 36px;
  vertical-align: middle;
  align-content: center;
  align-items: center;
  display: flex;
  text-align: center;
  justify-content: center;
  img {
    height: auto;
    max-width: 100%;
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

PreviewBoxStyle.ImageBox = ImageBox
PreviewBoxStyle.ControlBox = ControlBox

export default PreviewBoxStyle
