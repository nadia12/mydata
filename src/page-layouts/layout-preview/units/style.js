import styled from 'styled-components'
import COLORS from 'Asset/css/mydata-colors'

export const MainContentStyle = styled.section`
    display: flex;
    -webkit-align-items: stretch;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    min-width: 95vw;
    
    .fullheight-no-footer{
      height: calc(100vh - 230px);
    }
    .fullheight-with-footer{
      height: calc(100vh - 370px);
    }

    .main-content-head-system-status{
      box-sizing: border-box;
      background-color: #262831;
      border-top: 1px solid #1b1c21;
      border-left: 1px solid #1b1c21;
      border-right: 1px solid #1b1c21;
      border-radius: 8px 8px 0px 0px;
      padding: 32px 16px 24px 32px;
    }
    .main-content-body-system-status{
      box-sizing: border-box;
      overflow-y: auto;
      box-sizing: border-box;
      background-color: #262831;
      border-left: 1px solid #1b1c21;
      border-right: 1px solid #1b1c21;
      border-bottom: 1px solid #1b1c21;
      border-radius: 0px 0px 8px 8px;
      padding: 0px;
    }
`

const MainContentStyleHead = styled.div`
  padding: 32px 32px 0px 32px;
  z-index: 2;
`

const MainContentStyleHeadBox = styled.div`
  box-sizing: border-box;
  height: 86px;
  background-color: #262831;
  border: 1px solid #1b1c21;
  border-radius: 8px 8px 0px 0px;
  padding: 32px 16px 24px 16px;
  width: 100%;

  button{
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #1b1c21;
    background-color: #313440;
    cursor: pointer;
    padding: 3px;
    outline:none;
    svg {
      cursor:pointer;
    }
  }
  button:fokus{
    outline:none;
  }
  .arrow-back{
    cursor: pointer;
  }
`

const MainContentStyleBody = styled.div`
  display: block;
  padding: 0px 33px 0px 33px;
  z-index: 1;
  width: 100%;
  min-width: 95vw;
  box-sizing: border-box;

  .main-content-body {
    box-sizing: border-box;
    height: calc(100vh - 265px);
    background-color: #262831;
    border-left: 1px solid #1b1c21;
    border-right: 1px solid #1b1c21;
    padding: 0px;
  }

  .main-content-body.no-footer{
    border-radius: 0 0 8px 8px;
    border-bottom: 0.5px solid #1b1c21;
    height: calc(100vh - 230px);
  }

  .main-content-body.overflow-x-hidden {
    overflow-x: hidden;
  }
  .main-content-body.overflow-y-hidden {
    overflow-y: hidden;
  }
  
  .main-content-body-left{
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    box-sizing: border-box;
    height: calc(100vh - 265px);
    max-height: calc(100vh - 265px);
    overflow-y: auto;
  } 
  .main-content-body-right{
    padding: 16px;
    box-sizing: border-box;
    height: calc(100vh - 265px);
    border-left: 1px solid #1b1c21;
  }
`

const MainContentStyleLeft = styled.div`
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  box-sizing: border-box;
  height: calc(100vh - 265px);
  max-height: calc(100vh - 265px);
  overflow-y: auto;
`

const MainContentStyleRight = styled.div`
  padding: 16px;
  box-sizing: border-box;
  height: calc(100vh - 265px);
  border-left: 1px solid #1b1c21;
`

const MainContentStyleFooter = styled.div`
  padding: 0px 32px 24px 32px;
  z-index: 0;
  font-size: .85rem;
  width: 100%;
  box-sizing: border-box;
  min-width: 95vw;

  .main-content-foot {
    box-sizing: border-box;
    height: 48px;
    background-color: #313440;
    border: 1px solid #1b1c21;
    border-radius: 0px 0px 8px 8px;
    padding: 13px;
    color: #9ea1b4;
  }

  .trash-bin {
    color: ${COLORS.gold};
    cursor: pointer;
    padding-left: 2rem;
    vertical-align: middle;
    align-content: center;
    display: inline-flex;
    align-items: center;
    width: auto;
    flex-basis: 11.667%;
    min-width: 11.667%;
  }
  .trash-bin svg{
    margin-right: 0.5em;
  }
`

MainContentStyle.Head = MainContentStyleHead
MainContentStyle.HeadBox = MainContentStyleHeadBox
MainContentStyle.Body = MainContentStyleBody
MainContentStyle.BodyLeft = MainContentStyleLeft
MainContentStyle.BodyRight = MainContentStyleRight
MainContentStyle.Footer = MainContentStyleFooter
