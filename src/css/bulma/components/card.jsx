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

      .card {
        background-color: white;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        color: #4a4a4a;
        max-width: 100%;
        position: relative;
      }

      .card-header {
        background-color: transparent;
        align-items: stretch;
        box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
        display: flex;
      }

      .card-header-title {
        align-items: center;
        color: #363636;
        display: flex;
        flex-grow: 1;
        font-weight: 700;
        padding: 0.75rem;
      }

      .card-header-title.is-centered {
        justify-content: center;
      }

      .card-header-icon {
        align-items: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        padding: 0.75rem;
      }

      .card-image {
        display: block;
        position: relative;
      }

      .card-content {
        background-color: transparent;
        padding: 1.5rem;
      }

      .card-footer {
        background-color: transparent;
        border-top: 1px solid #dbdbdb;
        align-items: stretch;
        display: flex;
      }

      .card-footer-item {
        align-items: center;
        display: flex;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 0;
        justify-content: center;
        padding: 0.75rem;
      }

      .card-footer-item:not(:last-child) {
        border-right: 1px solid #dbdbdb;
      }

      .card .media:not(:last-child) {
        margin-bottom: 0.75rem;
      }
    `}
  </style>
);
