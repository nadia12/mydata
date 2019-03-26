import React from 'react';

export default () => (
  <style global jsx>
    {`
      /*table*/
      table.is-standard{
        background: #262831 !important;
        color: #9ea1b4 !important;
        border-collapse: collapse;
      }
      table.is-standard th{
        border-bottom: 1px solid #1b1c21;
        border-right:  1px solid #1b1c21;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.25;
        letter-spacing: 0.2px;
        color: #9ea1b4 !important;
        padding: 14px 12px;
        box-sizing: border-box;
        height: 48px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      }
      table.is-standard td{
        border-bottom: 1px solid #1b1c21;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: 0.3px;
        padding: 13px 12px 14px 12px;
        box-sizing: border-box;
        min-height: 48px;
      }
      table.is-standard th:last-child{
        border-right: none;
      }
      table.is-standard th:first-child, table.is-standard td:first-child{
        padding-left: 36px;
      }
      table.is-standard th:last-child, table.is-standard td:last-child{
        padding-right: 36px;
      }
      table.is-standard tr:last-child{
        // border-bottom: 1px solid #1b1c21;
        border-bottom: none;
      }
      table.is-standard tr.is-active td{
        background-color: #FFD77B;
        color: #262831;
      }
      /* table fix header */
      .table.is-standard.fix-header th, .table.is-standard.fix-header th{
        width: 280px;
      }
      .table.is-standard.fix-header th{
        padding: 0px;
        border: none;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      }
      .table.is-standard.fix-header th div.header{
        position: absolute;
        height: 48px;
        width: 280px;
        box-sizing: border-box;
        padding: 14px 12px;
        border-bottom: 1px solid #1b1c21;
        border-right:  1px solid #1b1c21;
        background-color: #262831 !important;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      }
      .table.is-standard.fix-header th:first-child div.header{
        padding-left: 36px;
      }
      .table.is-standard.fix-header th:last-child div.header{
        padding-right: 36px;
        border-right: none;
      }
      /* fix heder */

      table.is-selectable tr {
        cursor: pointer;
      }

      .table-info-detail tr td{
        padding-top: 16px;
      }
      .table-info-detail tr:first-child td{
        padding-top: 0px;
      }
      .table-info-detail tr td.left{
        font-family: Roboto;
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: 0.4px;
        text-transform: uppercase !important;
      }
      .table-info-detail tr td.right{
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: 0.3px;
      }

      /* user role */
      table.user-role {
        background: #262831 !important;
        color: #9ea1b4 !important;
        border-collapse: collapse;
      }
      table.user-role th{
        background-color: #313440;
        text-align: left;
        border-bottom: 1px solid #1b1c21;
        border-right:  1px solid #1b1c21;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: 0.4px;
        color: #9ea1b4 !important;
        padding: 8px 12px;
        box-sizing: border-box;
        height: 32px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        white-space: nowrap;
        min-width: 100px;
      }
      table.user-role td{
        background-color: #454958;
        text-align: left;
        border-bottom: none;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: 0.4px;
        padding: 8px 12px;
        box-sizing: border-box;
        min-height: 32px;
      }
      table.user-role th:last-child{
        border-right: none;
      }
      table.user-role td.role-permission{
        text-align: center;
        color: #ffd77b;
      }
      table.user-role tr.divider td{
        color: #9ea1b4;
        text-align: left;
        background-color: #313440;
        border-bottom: 1px solid #1b1c21;
        border-top:  1px solid #1b1c21;
      }

      .table.has-no-border td{
        border: none;
      }
      .table.has-no-padding-left td{
        padding-left: 0px;
      }
      .table.has-no-padding-right td{
        padding-left: 0px;
      }
    `}
  </style>
);
