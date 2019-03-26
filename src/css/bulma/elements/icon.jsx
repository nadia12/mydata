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

      .icon {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        height: 1.5rem;
        width: 1.5rem;
      }

      .icon.is-small {
        height: 1rem;
        width: 1rem;
      }

      .icon.is-medium {
        height: 2rem;
        width: 2rem;
      }

      .icon.is-large {
        height: 3rem;
        width: 3rem;
      }
    `}
  </style>
);
