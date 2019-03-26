import React from 'react';

export default () => (
  <style global jsx>
    {`
      body {
        background: #313440;
        font-family: Roboto, 'Open Sans', sans-serif;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: 0.3px;
        color: #9EA1B4;
        overflow: hidden;
      }

      a {
        text-decoration: none !important;
      }
      
      /*box*/
      .box .footer{
        background: #313440;
        border-radius: 0px 0px 8px 8px;
      }

      /*modal*/
      .modal.is-medium .modal-content{
        width: 40%;
      }

      .navbar-main {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        background-color: #1b1c21 !important;
        height: 64px;
        z-index: 999 !important;
      }
      /* chartjs */
      .chartjs-legend.is-left {
        padding: 8px 0px 24px 8px;
        float:left;
      }
      .chartjs-legend ul {
        list-style: none;
        margin:0;
        padding:0;
        text-align:center;
      }
      .chartjs-legend ul li {
        display: inline-table;
      }
      .is-fullwidth {
        width: 100%;
      }
      .xplorer-table > thead > tr > th:nth-child(1), .xplorer-table > tbody > tr > td:nth-child(1) {
        width: 40%;
      }
      .xplorer-table > thead > tr > th:nth-child(2), .xplorer-table > tbody > tr > td:nth-child(2) {
        width: 12%;
      }
      .xplorer-table > thead > tr > th:nth-child(3), .xplorer-table > tbody > tr > td:nth-child(3) {
        width: 13%;
      }
      .xplorer-table > thead > tr > th:nth-child(4), .xplorer-table > tbody > tr > td:nth-child(4) {
        width: 8%;
      }
      .xplorer-table > thead > tr > th:nth-child(5), .xplorer-table > tbody > tr > td:nth-child(5) {
        width: 15%;
      }
      .xplorer-table > thead > tr > th:nth-child(6), .xplorer-table > tbody > tr > td:nth-child(6) {
        width: 12%;
        text-align: center;
      }
      .absolute-position {
        position: absolute;
      }
    `}
  </style>
);
