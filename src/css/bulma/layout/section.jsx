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

      .section {
        padding: 3rem 1.5rem;
      }

      @media screen and (min-width: 1088px) {
        .section.is-medium {
          padding: 9rem 1.5rem;
        }

        .section.is-large {
          padding: 18rem 1.5rem;
        }
      }
    `}
  </style>
);
