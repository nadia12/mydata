import styled from 'styled-components'
import colors from 'Assets/css/colors'

export const AssetDetailsStyled = styled.div`
  max-height: 640px;
  width: 720px;
  box-sizing: border-box;
  overflow: auto;
  padding: 32px;
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
  padding-bottom: 24px;
`

export const AssetFooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 64px;
  padding-right: 32px;
`
