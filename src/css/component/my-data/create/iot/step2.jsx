import React from 'react';

export default () => (
  <style global jsx>
    {`
        .style-input-iot :global(div > input) {
          width: -webkit-fill-available;
        }

        .style-input-iot :global(div) {
          margin-bottom: 0px;
        }
    `}
  </style>
);
