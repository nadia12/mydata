import React from 'react';

export default () => (
  <style global jsx>
    {`
      @keyframes spinAround {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(359deg);
        }
      }

      .box:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .box {
        background-color: white;
        border-radius: 6px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        color: #4a4a4a;
        display: block;
        padding: 1.25rem;
      }

      a.box:hover, a.box:focus {
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc;
      }

      a.box:active {
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc;
      }
    `}
  </style>
);
