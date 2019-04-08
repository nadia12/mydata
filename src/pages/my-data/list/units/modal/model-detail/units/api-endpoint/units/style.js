import styled from 'styled-components'


export const ApiEndpointStyle = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #1b1c21;
    margin-bottom: 24px;
    border-radius: 8px;
    background-color: #313440;

  .box-asset-header{
    padding-bottom: .4rem;
    padding-top: 0.7rem;
    font-size: 15px;
  }

  .box-asset-content div:nth-child(2){
    width: 69%;
  }
`

const Header = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding-left: 1em;
  padding-bottom: 0.4rem;
  padding-top: 0.7rem;
`

const Content = styled.div`
  display: flex;
  margin-top: 4px;
  padding-left: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  flex-wrap: wrap;
  align-content: space-around;
  border-style:solid;
  border-color: #1b1c21;
  border-width: 1px 0 0 0;

  div {
    margin-right: 24px;
  }

  div:last-child {
    padding-left: 1.5rem;
  }
`

const Url = styled.div`
  width: 65%;
  color: #00bdce;
`

const Type = styled.div`
  width: 5em;
`

const Tooltip = styled.span`
  position: relative;
  display: inline-block;

  .tooltiptext-api-endpoints {
    visibility: hidden;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    padding: 7px;
    white-space: nowrap;
    border-radius: 8px;
    background-color: #ffd77a;
    color: #1b1c21;
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }

  &:after {
    visibility: hidden;
    content: '';
    position: absolute;
    bottom: 90%;
    left: 45%;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #ffd77a;
  }

  &:active .tooltiptext-api-endpoints,
  &:active:after {
    visibility: visible;
  }
`

ApiEndpointStyle.Header = Header
ApiEndpointStyle.Content = Content
ApiEndpointStyle.Url = Url
ApiEndpointStyle.Type = Type
ApiEndpointStyle.Tooltip = Tooltip