import React from 'react';

export default () => (
  <style global jsx>{`
    .tbl-set-width {
      table-layout: fixed;
    }
    .table-header {
      vertical-align: middle !important;
      font-weight: bold !important;
    }
    .table.is-standard tr:last-child {
      border-bottom: none !important;
    }
    .table-content > td {
      padding: 0px !important;
    }

    td {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
    .table-icon {
      vertical-align: middle;
      align-content: center;
      display: inline-flex;
      align-items: center;
      width: 100%;
    }
    .icon-selected :global(svg > g > g > path){
      fill: #1b1c21;
    }
    .is-active > td {
      color: rgba(0, 0, 0, 0.87) !important;
    }
    td {
      color: #9ea1b4 !important;
    }

    .fit-table {
      margin-right: 0;
    }

    .vertical-center {
      vertical-align: middle;
      align-content: center;
      align-items: center;
      display: flex;
      text-align: center;
      justify-content: center;
    }

    .main-content-body-left {
      overflow: unset;
    }

    .table-name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .style-icon {
      width: 24px;
      height: 24px;
    }
    
    .thead-icon {
      vertical-align: middle;
      align-content: center;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      justify-content: space-between;
    }
    
    `}
  </style>
);
