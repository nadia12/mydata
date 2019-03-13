import React from 'react';

export default () => (
  <style global jsx>
    {`
      table.tbl-prop {
        width: 100%;
        padding: 0px;
        margin: 0px;
      }
      ttable.tbl-prop body {
        min-height: 100%;
      }

      .box-table {
        border: 1px solid #1b1c21;
        border-radius: 4px;
        padding: 0px;
        width: 100%;
        height: 230px;
        background-color: #454958;
      }
      .box-table-content {
        border-radius: 4px;
        background-color: #454958;
        height: 200px;
        overflow: auto;
      }
      .box-table-footer {
        border-top: 1px solid #1b1c21;
        width: 100%;
        height: 30px;
        text-align: right;
        border-radius: 0 0 4px 4px;
      }

      table.tbl-prop td {
        min-width: 150px;
        border-bottom: 1px solid #1b1c21;
        border-right: 1px solid #1b1c21;
      }

      .input-table {
        width: 100%;
        border: none;
        background: #454958;
        color: #ffffff;
        outline: none;
      }

      table.tbl-prop td:nth-child(2) {
        border-bottom: 1px solid #1b1c21;
      }

      table.tbl-prop td:nth-child(1) div div {
        border-style: none;
      }

      table.tbl-prop tr {
        padding-bottom: 1px;
      }

      table.tbl-prop td:last-child {
        border-right: none;
      }

      .test{
        display: inline-block;
        padding: .15rem;
      }

      .box-table-content table.tbl-prop > tbody > tr > td > div > div {
        border-style: none;
      }  
    `}
  </style>
);
