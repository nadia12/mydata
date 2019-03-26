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

      .level:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .level {
        align-items: center;
        justify-content: space-between;
      }

      .level code {
        border-radius: 4px;
      }

      .level img {
        display: inline-block;
        vertical-align: top;
      }

      .level.is-mobile {
        display: flex;
      }

      .level.is-mobile .level-left,
          .level.is-mobile .level-right {
        display: flex;
      }

      .level.is-mobile .level-left + .level-right {
        margin-top: 0;
      }

      .level.is-mobile .level-item:not(:last-child) {
        margin-bottom: 0;
        margin-right: 0.75rem;
      }

      .level.is-mobile .level-item:not(.is-narrow) {
        flex-grow: 1;
      }

      @media screen and (min-width: 769px), print {
        .level {
          display: flex;
        }

        .level > .level-item:not(.is-narrow) {
          flex-grow: 1;
        }
      }

      .level-item {
        align-items: center;
        display: flex;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
        justify-content: center;
      }

      .level-item .title,
        .level-item .subtitle {
        margin-bottom: 0;
      }

      @media screen and (max-width: 768px) {
        .level-item:not(:last-child) {
          margin-bottom: 0.75rem;
        }
      }

      .level-left,
      .level-right {
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 0;
      }

      .level-left .level-item.is-flexible,
        .level-right .level-item.is-flexible {
        flex-grow: 1;
      }

      @media screen and (min-width: 769px), print {
        .level-left .level-item:not(:last-child),
          .level-right .level-item:not(:last-child) {
          margin-right: 0.75rem;
        }
      }

      .level-left {
        align-items: center;
        justify-content: flex-start;
      }

      @media screen and (max-width: 768px) {
        .level-left + .level-right {
          margin-top: 1.5rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .level-left {
          display: flex;
        }
      }

      .level-right {
        align-items: center;
        justify-content: flex-end;
      }

      @media screen and (min-width: 769px), print {
        .level-right {
          display: flex;
        }
      }
    `}
  </style>
);
