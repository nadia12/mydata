import styled from 'styled-components'

export const ApiTokenStyle = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #1b1c21;
  margin-bottom: 24px;
  border-radius: 8px;
  background-color: #313440;
`

const Header = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding-left: 1em;
  padding-top: .7em;
  padding-bottom: .4em;
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

  word-break: break-word;
  div {
    margin-right: 24px;
    width: 70%;
    color: #00bdce;
  }
`

const Tooltip = styled.span`
  position: relative;
  display: inline-block;

  span {
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

  &:active span, 
  &:active:after {
    visibility: visible;
  }

`

const Copy = styled.div`
  margin-right: 1.5rem;
  padding: 0;
  line-height: 0;
`

ApiTokenStyle.Header = Header
ApiTokenStyle.Content = Content
ApiTokenStyle.Tooltip = Tooltip
ApiTokenStyle.Copy = Copy
