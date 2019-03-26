import React from 'react';

export default () => (
  <style global jsx>
    {`
      table.tbl-file {
        border-spacing: 0;
        border: 1px solid #1b1c21;
        border-radius: 5px;
        background: #313440;
        color: #9ea1b4;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        text-align: center;
        font-family: Roboto;
        width: 100%;
      }

      table.tbl-file td, table.tbl-file th {
        padding: 0;
        vertical-align: top;
        padding: 0.5em 0.75em;
        border-bottom: 1px solid #1b1c21;
        border-right: 1px solid #1b1c21;
        word-break: break-all;
        max-width: 20em;
        min-width: 10em;
      }

      table.tbl-file th {
        color: #ffd77b;
      }

      table.tbl-file tr:last-child td {
        border-bottom: 0px;
      }

      table.tbl-file td:last-child, table.tbl-file th:last-child {
        border-right: 0px;
      }

      .tbody-wrapper {
        background: #313440;
        border-radius: 8px;
        padding: 1em;
        margin-top: 1em;
        max-width: 40vw;
        overflow-x: scroll;
        overflow-y: scroll;
      }
    `}
  </style>
);
