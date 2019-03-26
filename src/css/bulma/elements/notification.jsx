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

      .notification:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .notification {
        background-color: whitesmoke;
        border-radius: 4px;
        padding: 1.25rem 2.5rem 1.25rem 1.5rem;
        position: relative;
      }

      .notification a:not(.button):not(.dropdown-item) {
        color: currentColor;
        text-decoration: underline;
      }

      .notification strong {
        color: currentColor;
      }

      .notification code,
        .notification pre {
        background: white;
      }

      .notification pre code {
        background: transparent;
      }

      .notification > .delete {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }

      .notification .title,
        .notification .subtitle,
        .notification .content {
        color: currentColor;
      }

      .notification.is-white {
        background-color: white;
        color: #0a0a0a;
      }

      .notification.is-black {
        background-color: #0a0a0a;
        color: white;
      }

      .notification.is-light {
        background-color: whitesmoke;
        color: #363636;
      }

      .notification.is-dark {
        background-color: #363636;
        color: whitesmoke;
      }

      .notification.is-primary {
        background-color: #00d1b2;
        color: #fff;
      }

      .notification.is-link {
        background-color: #3273dc;
        color: #fff;
      }

      .notification.is-info {
        background-color: #209cee;
        color: #fff;
      }

      .notification.is-success {
        background-color: #23d160;
        color: #fff;
      }

      .notification.is-warning {
        background-color: #ffdd57;
        color: rgba(0, 0, 0, 0.7);
      }

      .notification.is-danger {
        background-color: #ff3860;
        color: #fff;
      }
    `}
  </style>
);
