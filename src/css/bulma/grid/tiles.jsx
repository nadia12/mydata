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

      .tile {
        align-items: stretch;
        display: block;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        min-height: min-content;
      }

      .tile.is-ancestor {
        margin-left: -0.75rem;
        margin-right: -0.75rem;
        margin-top: -0.75rem;
      }

      .tile.is-ancestor:last-child {
        margin-bottom: -0.75rem;
      }

      .tile.is-ancestor:not(:last-child) {
        margin-bottom: 0.75rem;
      }

      .tile.is-child {
        margin: 0 !important;
      }

      .tile.is-parent {
        padding: 0.75rem;
      }

      .tile.is-vertical {
        flex-direction: column;
      }

      .tile.is-vertical > .tile.is-child:not(:last-child) {
        margin-bottom: 1.5rem !important;
      }

      @media screen and (min-width: 769px), print {
        .tile:not(.is-child) {
          display: flex;
        }

        .tile.is-1 {
          flex: none;
          width: 8.33333%;
        }

        .tile.is-2 {
          flex: none;
          width: 16.66667%;
        }

        .tile.is-3 {
          flex: none;
          width: 25%;
        }

        .tile.is-4 {
          flex: none;
          width: 33.33333%;
        }

        .tile.is-5 {
          flex: none;
          width: 41.66667%;
        }

        .tile.is-6 {
          flex: none;
          width: 50%;
        }

        .tile.is-7 {
          flex: none;
          width: 58.33333%;
        }

        .tile.is-8 {
          flex: none;
          width: 66.66667%;
        }

        .tile.is-9 {
          flex: none;
          width: 75%;
        }

        .tile.is-10 {
          flex: none;
          width: 83.33333%;
        }

        .tile.is-11 {
          flex: none;
          width: 91.66667%;
        }

        .tile.is-12 {
          flex: none;
          width: 100%;
        }
      }
    `}
  </style>
);
