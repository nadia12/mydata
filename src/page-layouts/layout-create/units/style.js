import styled, {
  css,
} from 'styled-components'
import colors from 'Asset/css/colors'

const FixedPosition = css`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const checkLoadingWrapper = props => {
  if (props.showLoading) {
    return css`
      cursor: not-allowed !important;
      background: none;
    `
  }
}

const checkLoadingOverlay = props => {
  if (props.showLoading) {
    return css`
      opacity: 0.5;
      pointer-events: none;
    `
  }
}

export const WrapperStyle = styled.div`
  ${checkLoadingWrapper}
  ${FixedPosition}
`

export const OverlayStyle = styled.div`
  ${checkLoadingOverlay}
  ${FixedPosition}
`

export const BoxLayoutStyle = styled.div`
  width: 60vw;
  height: calc(100vh - 128px);
  background-color: ${colors.grayDark};
  color: ${colors.gray};
  padding: 0px;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin: auto;
  margin-top: 32px;
`

export const H2Style = styled.h2`
  color: ${colors.gold};
  margin: 0 0 0 32px;
`

export const ChildrenStyle = styled.div`
  display: flex;
  height: calc(100vh - 128px - 32px - 24px - 100px);
  margin: 0;
`

export const ColumnLeftStyle = styled.div`
  width: 30%;
  overflow: auto;
  display: flex;
`
export const ColumnFullStyle = styled.div`
  width: 100%;
  overflow: auto;
  margin: 0 1em;
`
export const ColumnRightStyle = styled.div`
  width: 68.5%;
  overflow: auto;
  border-left: 1px solid ${colors.grayBlack};
  font-size: 14px;
  padding: 32px;
  display: block;
  max-width: 100%;
`

export const BoxHeaderStyle = styled.div`
  width: 60vw;
  height: 92px;
  border-bottom: 1px solid ${colors.grayBlack};
  display: flex;
  align-items: center;
`

export const BoxFooterStyle = styled.div`
  width: 60vw;
  height: 64px;
  border-top: 1px solid ${colors.grayBlack};
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  justify-content: ${props => (props.showLoading ? 'space-between' : 'flex-end')};
`

export const BoxFooterButtonStyle = styled.div`
  margin-right: .3rem;
  margin-left: .3rem;

  :last-child {
    margin-right: 2rem;
  }
`

export const InlineStyle = styled.div`
  display: inline-flex;
`

export const LoadingStyle = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  color: ${colors.gold};
  
  :first-child {
    margin-left: 2rem;
  }
`
