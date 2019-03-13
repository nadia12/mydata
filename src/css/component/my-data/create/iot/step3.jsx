import React from 'react';

export default () => (
  <style global jsx>
    {`
    .box-token {
      width: auto;
      height: auto;
      background-color: #313440;
      color: #00bdce;
      border: 1px solid #1b1c21;
      line-height: 20px;
      letter-spacing: 0.25px;
      border-radius: 8px;
    }
    .box-token-content:first-child {
      border-bottom: 1px solid #1b1c21;
      justify-content: space-between;
    } 
    .box-token-content:first-child :global(label) {
      margin-bottom: 0;
    } 
    .box-token-content {
      padding: 16px;
      display: flex;
    }
    .token-type-tab {
      display: flex;
      justify-content: center;
    }
    .tooltip {
      position: relative;
      display: inline-block;
    }
    
    .tooltip .tooltiptext {
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

    .tooltip:after {
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
    
    .tooltip:active .tooltiptext, .tooltip:active:after {
      visibility: visible;
    }

    .word-wrap {
      word-break: break-word;
    }

    .li-token {
      border: 1px solid #1b1c21;
      width: 80px;
      height: 32px;
      background: #313440;
      color: #9ea1b4;
      text-align: center;
      justify-content: center;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }
    .is-selected {
      background: #ffd77b;
      color: rgba(0, 0, 0, 0.87);
    }
    .li-token:first-child {
      border-radius: 4px 0 0 4px;
      border-right: none;
    }
    .li-token:last-child {
      border-radius: 0 4px 4px 0;
      border-left: none;
    }
    .token-type-tab {
      text-align: center;
    }
    .sub-title{
      padding-bottom: 0;
      padding-top: 22px;
    }
    .sub-content {
      padding-bottom: 0;
      padding-top: 10px;
      color: #ffffff !important;
    }
    `}
  </style>
);
