import React from 'react';

export default () => (
  <style global jsx>
    {`
      .box-input {
        position: relative;
        color: rgba(255, 255, 255, 0.6);
        vertical-align: middle;
        white-space: nowrap;
      }

      input.txt-search{
        width: 100%;
        height: 32px;
        background: #454958;
        border: 1px solid #1b1c21;
        border-radius: 4px;
        text-indent: 40px;
        font-size: 14px;
        float: left;
        font: 400 14px 'Roboto', sans-serif;
        padding: .5rem;
      }

      input.txt-search:hover, input.txt-search:focus, input.txt-search:active{
        outline:none;
        box-shadow: 0 0 5px #ffd77b;
      }

      .box-input .fa-search { 
        background-color: #313440;
        border-right: 1px solid #1b1c21;
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 5px;
        margin: 1px;
        border-radius: 3px 0 0 3px;
        z-index: 1;
      }
    `}
  </style>
);
