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

      .breadcrumb {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .breadcrumb:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .breadcrumb {
        font-size: 1rem;
        white-space: nowrap;
      }

      .breadcrumb a {
        align-items: center;
        color: #3273dc;
        display: flex;
        justify-content: center;
        padding: 0 0.75em;
      }

      .breadcrumb a:hover {
        color: #363636;
      }

      .breadcrumb li {
        align-items: center;
        display: flex;
      }

      .breadcrumb li:first-child a {
        padding-left: 0;
      }

      .breadcrumb li.is-active a {
        color: #363636;
        cursor: default;
        pointer-events: none;
      }

      .breadcrumb li + li::before {
        color: #b5b5b5;
        content: "\0002f";
      }

      .breadcrumb ul,
        .breadcrumb ol {
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .breadcrumb .icon:first-child {
        margin-right: 0.5em;
      }

      .breadcrumb .icon:last-child {
        margin-left: 0.5em;
      }

      .breadcrumb.is-centered ol,
        .breadcrumb.is-centered ul {
        justify-content: center;
      }

      .breadcrumb.is-right ol,
        .breadcrumb.is-right ul {
        justify-content: flex-end;
      }

      .breadcrumb.is-small {
        font-size: 0.75rem;
      }

      .breadcrumb.is-medium {
        font-size: 1.25rem;
      }

      .breadcrumb.is-large {
        font-size: 1.5rem;
      }

      .breadcrumb.has-arrow-separator li + li::before {
        content: "\000b7";
      }

      .breadcrumb.has-bullet-separator li + li::before {
        content: "\000b7";
      }

      .breadcrumb.has-dot-separator li + li::before {
        content: "\000b7";
      }

      .breadcrumb.has-succeeds-separator li + li::before {
        content: "\000b7";
      }
    `}
  </style>
);
