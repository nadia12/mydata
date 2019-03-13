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

      .tabs {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .tabs:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .tabs {
        -webkit-overflow-scrolling: touch;
        align-items: stretch;
        display: flex;
        font-size: 1rem;
        justify-content: space-between;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;
      }

      .tabs a {
        align-items: center;
        border-bottom-color: #dbdbdb;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        color: #4a4a4a;
        display: flex;
        justify-content: center;
        margin-bottom: -1px;
        padding: 0.5em 1em;
        vertical-align: top;
      }

      .tabs a:hover {
        border-bottom-color: #363636;
        color: #363636;
      }

      .tabs li {
        display: block;
      }

      .tabs li.is-active a {
        border-bottom-color: #3273dc;
        color: #3273dc;
      }

      .tabs ul {
        align-items: center;
        border-bottom-color: #dbdbdb;
        border-bottom-style: solid;
        border-bottom-width: 1px;
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        justify-content: flex-start;
      }

      .tabs ul.is-left {
        padding-right: 0.75em;
      }

      .tabs ul.is-center {
        flex: none;
        justify-content: center;
        padding-left: 0.75em;
        padding-right: 0.75em;
      }

      .tabs ul.is-right {
        justify-content: flex-end;
        padding-left: 0.75em;
      }

      .tabs .icon:first-child {
        margin-right: 0.5em;
      }

      .tabs .icon:last-child {
        margin-left: 0.5em;
      }

      .tabs.is-centered ul {
        justify-content: center;
      }

      .tabs.is-right ul {
        justify-content: flex-end;
      }

      .tabs.is-boxed a {
        border: 1px solid transparent;
        border-radius: 4px 4px 0 0;
      }

      .tabs.is-boxed a:hover {
        background-color: whitesmoke;
        border-bottom-color: #dbdbdb;
      }

      .tabs.is-boxed li.is-active a {
        background-color: white;
        border-color: #dbdbdb;
        border-bottom-color: transparent !important;
      }

      .tabs.is-fullwidth li {
        flex-grow: 1;
        flex-shrink: 0;
      }

      .tabs.is-toggle a {
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px;
        margin-bottom: 0;
        position: relative;
      }

      .tabs.is-toggle a:hover {
        background-color: whitesmoke;
        border-color: #b5b5b5;
        z-index: 2;
      }

      .tabs.is-toggle li + li {
        margin-left: -1px;
      }

      .tabs.is-toggle li:first-child a {
        border-radius: 4px 0 0 4px;
      }

      .tabs.is-toggle li:last-child a {
        border-radius: 0 4px 4px 0;
      }

      .tabs.is-toggle li.is-active a {
        background-color: #3273dc;
        border-color: #3273dc;
        color: #fff;
        z-index: 1;
      }

      .tabs.is-toggle ul {
        border-bottom: none;
      }

      .tabs.is-toggle.is-toggle-rounded li:first-child a {
        border-bottom-left-radius: 290486px;
        border-top-left-radius: 290486px;
        padding-left: 1.25em;
      }

      .tabs.is-toggle.is-toggle-rounded li:last-child a {
        border-bottom-right-radius: 290486px;
        border-top-right-radius: 290486px;
        padding-right: 1.25em;
      }

      .tabs.is-small {
        font-size: 0.75rem;
      }

      .tabs.is-medium {
        font-size: 1.25rem;
      }

      .tabs.is-large {
        font-size: 1.5rem;
      }
    `}
  </style>
);
