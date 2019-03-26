import React from 'react';

export default () => (
  <style global jsx>
    {`
      .search-field input, .search-field span {
        height: 2.1rem !important;
      }

      .icon:hover {
        cursor: pointer;
      }

      .top-search-icon {
        background-color: #313440;
        border: 1px solid #1b1c21;
        border-radius: 4px 0px 0px 4px;
        box-sizing: border-box;
        height: 33.59px;
        width: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 33px;
        z-index: 90;
        padding: 0;
      }

      .top-search-icon:focus {
        outline: none;
      }

      .top-search-icon:hover {
        background: #262831;
      }

      .btn-top-action {
        margin-right: -33px;
      }

    `}
  </style>
);
