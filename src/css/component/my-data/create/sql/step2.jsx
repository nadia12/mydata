import React from 'react';

export default () => (
  <style global jsx>
    {`
      .pd-bottom2{
        padding-bottom: 2rem;
      }
      .columns-child {
        justify-content: flex-start;
        align-content: flex-start;
        margin-left: auto;
        display: flex;
      }
      .pt1px {
        padding-top: 1px;
      }
      .style-input-sql {
        margin-top: -17px;
        width: 48%;
        margin-left: .25rem;
      }
      .style-input-sql :global(span > div){
        padding-bottom: 0 !important;
      }
      .input-style :global(span > div){
        padding-bottom: .5rem;
      }
    `}
  </style>
);
