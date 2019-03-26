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

      .list:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .list {
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
      }

      .list-item {
        display: block;
        padding: 0.5em 1em;
      }

      .list-item:not(a) {
        color: #4a4a4a;
      }

      .list-item:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      .list-item:last-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      .list-item:not(:last-child) {
        border-bottom: 1px solid #dbdbdb;
      }

      .list-item.is-active {
        background-color: #3273dc;
        color: #fff;
      }

      a.list-item {
        background-color: whitesmoke;
        cursor: pointer;
      }
    `}
  </style>
);
