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

      .container {
        margin: 0 auto;
        position: relative;
      }

      @media screen and (min-width: 1088px) {
        .container {
          max-width: 960px;
          width: 960px;
        }

        .container.is-fluid {
          margin-left: 64px;
          margin-right: 64px;
          max-width: none;
          width: auto;
        }
      }

      @media screen and (max-width: 1279px) {
        .container.is-widescreen {
          max-width: 1152px;
          width: auto;
        }
      }

      @media screen and (max-width: 1471px) {
        .container.is-fullhd {
          max-width: 1344px;
          width: auto;
        }
      }

      @media screen and (min-width: 1280px) {
        .container {
          max-width: 1152px;
          width: 1152px;
        }
      }

      @media screen and (min-width: 1472px) {
        .container {
          max-width: 1344px;
          width: 1344px;
        }
      }
    `}
  </style>
);
