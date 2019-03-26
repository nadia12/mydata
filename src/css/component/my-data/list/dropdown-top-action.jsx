import React from 'react';

export default () => (
  <style global jsx>
    {`
      .par-dropdown-content {
        z-index: 10;
      }
      
      .button:hover, .button.is-hovered {
        background-color: #1b1c21;
        border-color: transparent;
      }
      
      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropbtn {
        width: 48px;
        height: 32px;
        background-color: #313440;
        border: 1px solid #1b1c21;
        display: flex;
        border-radius: 4px;
        position: relative;
      }

      .li-btn {
        border-right: 1px solid #1b1c21;
        height: 100%;
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        justify-content: center;
        flex-flow: column;
      }
      
      .li-btn:first-child {
        width: 70%;
      }
      .li-btn:last-child {
        width: 30%;
        border-right: none;
      }
      .margin-right05{
        margin-right: 0.5rem;
      }

      .par-dropdown-content {
        width: 100%;
        height: 100%;
        max-height: 300px;
        display: none;
        position: fixed;
        overflow-y: scroll;
        overflow-x: hidden;
        cursor: pointer;
      }
        
      .dropdown-content {
        width:160px;
        padding: 0.5rem;
        background-color: #454958;
        border: 1px solid #1b1c21;
        border-radius: 4px;
        display: none;
        position: absolute;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        margin-top: .5rem;
        padding: 0;
      }

      .dropdown-content div:hover {
        background-color: #313440;
        border-radius: 4px;
      }

      .dropdown-content div {
        padding: 5px;
      }
          
      .dropdown-content a {
        color: #ffffff;
        padding: 0.75rem 1rem;
        text-decoration: none;
        display: block;
        background: #454958;
      }

      .dropdown-content-text {
        box-sizing: border-box;
        font-family: Roboto, 'Open Sans', sans-serif;
        font-size: 14px;
        padding: 5px;
        color: #fff;
        
      }
          
      .dropdown-content a:hover {background-color: #ffd77b;}
        
      .dropdown-content a:hover:first-child {border-radius: 4px 4px 0 0;}
      
      .dropdown-content a:hover:last-child {border-radius: 0 0 4px 4px;}
      
      .dropdown:hover .dropdown-content {display: block;}
      
      .dropdown:hover .par-dropdown-content {display: block;}
      
      .dropdown:hover .dropbtn {background-color: #262831;}
    `}
  </style>
);
