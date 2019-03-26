import React from 'react';

export default () => (
  <style global jsx>
    {`
      .main-content-body-right {
        padding: 0;
      }
      .table-info-detail {
        width: 100%;
      }

      .header-table-info {
        border-bottom: 1px solid #1b1c21;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        padding: 0.79em;
        padding-right: 0;
      }

      .th-info {
        display: inline-block;
        vertical-align: middle;
        align-self: center;
        padding-right: .75rem;
      }

      .folder-path {
        display: flex;
        align-items: flex-end;
      }

    `}
  </style>
);
