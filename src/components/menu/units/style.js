import styled from 'styled-components'

export const MenuStyle = styled.div`
    width: 15rem;
    position: absolute;
    left: 8em;
    top: 9vh;
    z-index: 10;
    pointer-events: auto;

  .bottom-border {  
    border-bottom: 1.2px solid #262831;
    outline: 0;
  }
  .ul-list-item {
    background-color: #313440;
    border-radius: 4px;
    border: 1px solid #1b1c21;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    list-style-type: none;
    position: relative;
  }

  .div-item {
    text-decoration: none;
    color: #9ea1b4;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    background-color: #313440;
    padding:0 15px 0 15px;
    transition:0.2s;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .div-item.disable {
    cursor: not-allowed;
  }

  ul ul {
    position: absolute;
    left: 11.5em;
    top: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 4px;
    max-height: 200px;
    visibility: hidden;
    overflow-y: auto;
    opacity: 0;
    transition: transform 0.2s;
    transform: translateX(50px);
  }

  li:hover > ul {
    left:100%;
    visibility:visible;
    opacity:1;
    transform: translateX(0px);
    background:#313440;
  }

  p {
    display: inline;
    padding-left: 10px;
  }

  .arrow {
    position: relative;
    margin-left: auto;
  }

  .li-list-item:hover > .div-item {
    background-color: #ffd77b;
    color: rgba(0, 0, 0, 0.87);
  }

  .li-list-item:hover > .div-item > :global(svg > g > g > path), 
  .li-list-item:hover > .div-item > .arrow > :global(svg > g > g > polygon) {
    fill: #1b1c21;
  }

  .li-list-item:hover > .div-item > :global(svg path) {
    fill: #1b1c21;
    background: red;
  }

  .li-list-item:first-child:hover > .div-item, 
  .li-list-item:first-child > .div-item {
    border-radius: 4px 4px 0 0;
  }

  .li-list-item:last-child:hover > .div-item, 
  .li-list-item:last-child > .div-item{
    border-radius: 0 0 4px 4px;
  }

  div:first-child > li:first-child:hover >a, 
  .nested-ul-list-item > .li-list-item:first-child:hover > .div-item {
    border-radius: 4px 4px 0 0;
  }

  div:last-child > li:last-child:hover >a, 
  .nested-ul-list-item > .li-list-item:last-child:hover > .div-item {
    border-radius: 0 0 4px 4px;
  }

  .menu-name {
    padding-left: 1em;
  }
`

const MenuStyleUl = styled.ul`
  background-color: #313440;
  border-radius: 4px;
  border: 1px solid #1b1c21;
`

MenuStyle.Ul = MenuStyleUl
