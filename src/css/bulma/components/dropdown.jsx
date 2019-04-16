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

      .dropdown {
        display: inline-flex;
        position: relative;
        vertical-align: top;
      }

      .dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {
        display: block;
      }

      .dropdown.is-right .dropdown-menu {
        left: auto;
        right: 0;
      }

      .dropdown.is-up .dropdown-menu {
        bottom: 100%;
        padding-bottom: 4px;
        padding-top: initial;
        top: auto;
      }

      .dropdown-menu {
        display: none;
        left: 0;
        min-width: 12rem;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        z-index: 20;
      }

      .dropdown-content {
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
      }

      .dropdown-item {
        color: #4a4a4a;
        display: block;
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 0.375rem 1rem;
        position: relative;
      }

      a.dropdown-item,
      button.dropdown-item {
        padding-right: 3rem;
        text-align: left;
        white-space: nowrap;
        width: 100%;
      }

      a.dropdown-item:hover,
        button.dropdown-item:hover {
        background-color: whitesmoke;
        color: #0a0a0a;
      }

      a.dropdown-item.is-active,
        button.dropdown-item.is-active {
        background-color: #3273dc;
        color: #fff;
      }

      .dropdown-divider {
        background-color: #dbdbdb;
        border: none;
        display: block;
        height: 1px;
        margin: 0.5rem 0;
      }
    `}
  </style>
);
