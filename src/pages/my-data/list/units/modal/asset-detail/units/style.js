import styled from 'styled-components'
import colors from 'Asset/css/mydata-colors'

export const AssetDetailsStyled = styled.div`
  max-height: 640px;
  width: 720px;
  box-sizing: border-box;
`

export const Cols = styled.div`
  padding-bottom: ${props => (props.padding)}px;
`

export const HalfStyled = styled(Cols)`
  display: flex;
`

export const LeftStyled = styled.div`
  width: 240px;
  padding-right: 32px;
`

export const RightStyled = styled.div`

`

export const AssetTopStyled = styled.div`
  border-bottom: 1px solid ${colors.grayBlack};
  padding: 32px 32px 16px 32px;
`

export const AssetContentStyled = styled.div`
  border-bottom: 1px solid ${colors.grayBlack};
  padding: 32px;
`

export const AssetFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
  padding-right: 32px;
`

export const BoxContentStyled = styled.div`
  width: 100%;
  height: 320px;
  max-height: 320px;
  background: #313440;
  overflow: auto;
  border: 1px solid ${colors.grayBlack};
  border-radius: 8px;
  padding-bottom: 32px;
`

export const ListBoxStyled = styled.div`
  height: 48px;
  display: flex;
  border-bottom: 1px solid ${colors.grayBlack};
`

export const AppName = styled.div`
  display: flex;
  align-items: center;
  width: 381px;
  height: 100%;
  border-right: 1px solid ${colors.grayBlack};
  margin-left: 12px;
`

export const Status = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  border-right: 1px solid ${colors.grayBlack};
  margin-left: 12px;
`

export const Action = styled.div`
  display: flex;
  align-items: center;
  width: 151px;
  height: 100%;
  cursor: pointer;
`

