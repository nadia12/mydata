import styled from 'styled-components'
import colors from 'Asset/css/mydata-colors'

export const ModelAccuracyStyled = styled.div`
  width: 240px;
  height: 160px;
  background: #313440;
  border-radius: 8px;
  border: 1px solid ${colors.grayBlack};
`

export const ModelAccuracyHeaderStyled = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.grayBlack};
  padding: 0 16px;
  box-sizing: border-box;
`

export const ModelAccuracyContentStyled = styled.div`
`

export const LeftStyled = styled.div`
  width: 240px;
  padding-right: 32px;
`

export const RightStyled = styled.div`

`

export const AssetFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
  padding-right: 32px;
`

export const ChartImgStyled = styled.div`
  width: 80%;
  margin: auto;
  z-index: 0;
  padding-top: 10px;
`

export const IndicatorStyled = styled.div`
  z-index: 1;
  margin-bottom: -3rem;
  margin-top: -9px;
  max-width: 16rem;
  height: 10px;
  transform-origin: center center 0px;
  transform: rotate(${props => (props.rotateNum)}deg);

  > div {
    z-index: 1;
    background: white;
    border: 1px solid ${colors.white};
    border-radius: 5px;
    width: 50px;
    height: 2px;
    margin-left: 1.45rem;
  }
`