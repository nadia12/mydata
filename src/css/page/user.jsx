import React from 'react';

export default () => (
  <style global jsx>
    {`
      .table-role-container {
        overflow-y: auto;
        overflow-x: auto;
        height: calc(100vh - 510px);
      }
      .table-users-body-container{
        height: calc(100vh - 308px);
        overflow-y: auto;
      }
    `}
  </style>
);
