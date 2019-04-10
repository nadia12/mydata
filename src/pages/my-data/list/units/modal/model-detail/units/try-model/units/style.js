import styled from 'styled-components'
import colors from 'Assets/css/colors'

export const ModelSampleStyled = styled.div`
  width: 100%;
  height: 320px;
  background: #313440;
  border-radius: 8px;
  border: 1px solid ${colors.grayBlack};
`

export const ModelSampleHeaderStyled = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.grayBlack};
  padding: 0 16px;
  box-sizing: border-box;
`

export const ModelSampleContentStyled = styled.div`
  display: flex;
  padding: 16px;
`

export const LeftStyled = styled.div`
  width: 304px;
`

export const RightStyled = styled.div`
  padding-left: 16px;
`

export const ModelSampleTitleStyled = styled.div`
  height: 32px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    padding-right: 0;
  }
`

export const ModelSampleBoxStyled = styled.div`
  height: 204px;
  width: 304px;
  max-height: 204px;
  background: ${colors.grayLight};
  border: 1px solid ${colors.grayBlack};
  border-radius: 8px;
  padding: 16px;
  word-break: break-all;
  box-sizing: border-box;
`