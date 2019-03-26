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

      .footer {
        background-color: #fafafa;
        padding: 3rem 1.5rem 6rem;
      }
    `}
  </style>
);
