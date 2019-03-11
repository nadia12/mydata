import React from 'react';

export default () => (
  <style global jsx>
    {`
      .box-asset-api-endpoints {
        display: flex;
        flex-direction: column;
        border: 1px solid #1b1c21;
        margin-bottom: 24px;
        border-radius: 8px;
        background-color: #313440;
      }

      .box-asset-header-api-endpoints {
        font-size: 16px;
        font-weight: 500;
        padding-left: 1em;
        padding-bottom: 0.4rem;
        padding-top: 0.7rem;
      }

      .box-asset-content-api-endpoints {
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

      .box-asset-content-api-endpoints div {
        margin-right: 24px;
      }

      .box-asset-content-api-endpoints div:last-child {
        padding-left: 1.5rem;
      }
      
      .url-api-endpoints {
        width: 70%;
        color: #00bdce;
      }

      .type-api-endpoints {
        width: 5em;
      }
      .tooltip-api-endpoints {
        position: relative;
        display: inline-block;
      }
      
      .tooltip-api-endpoints .tooltiptext-api-endpoints {
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

      .tooltip-api-endpoints:after {
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
      
      .tooltip-api-endpoints:active .tooltiptext-api-endpoints, .tooltip-api-endpoints:active:after {
        visibility: visible;
      }

      .box-asset-header{
        padding-bottom: .4rem;
        padding-top: 0.7rem;
        font-size: 15px;
      }

      .box-asset-content div:nth-child(2){
        width: 69%;
      }
    `}
  </style>
);
