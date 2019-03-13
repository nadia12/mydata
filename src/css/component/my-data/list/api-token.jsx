import React from 'react';

export default () => (
  <style global jsx>
    {`
      .box-asset-token {
        display: flex;
        flex-direction: column;
        border: 1px solid #1b1c21;
        margin-bottom: 24px;
        border-radius: 8px;
        background-color: #313440;
      }

      .box-asset-header-token {
        font-size: 16px;
        font-weight: 500;
        padding-left: 1em;
        padding-top: .7em;
        padding-bottom: .4em;
      }

      .box-asset-content-token {
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
      }

      .box-asset-content-token div {
        margin-right: 24px;
      }
      
      .url-token {
        width: 70%;
        color: #00bdce;
      }

      .type-token {
        width: 5em;
      }
      .tooltip-token {
        position: relative;
        display: inline-block;
      }
      
      .tooltip-token .tooltiptext-token {
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

      .tooltip-token:after {
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
      
      .tooltip-token:active .tooltiptext-token, .tooltip-token:active:after {
        visibility: visible;
      }

      .copy-token{
        margin-right: 1.5rem;
        padding: 0;
        line-height: 0;
      }
      
      .word-wrap-token {
        word-break: break-word;
      }
    `}
  </style>
);
