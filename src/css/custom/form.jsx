import React from 'react';

export default () => (
  <style global jsx>
    {`
      /*helper form*/
      .input.is-gray-light, .text.is-gray-light, .select.is-gray-light select {
        background: #454958;
        color: #ffffff;
        border: 1px solid #1b1c21;
      }
      .input.is-gray-light:focus, .text.is-gray-light:focus, .select.is-gray-light select:focus {
        border: 1px solid #1b1c21;
        box-shadow: none;
      }
      .select.is-gray-light::after {
        border-color: #ffffff !important;
      }
      .input.is-gray-light::placeholder {
        color: #ffffff;
        opacity: 0.5;
      }
      .input.is-standard{
        padding: 0px 12px 0px 12px;
        font-size: 14px;
        height: 32px;
        box-sizing: border-box;
      }
      .input.is-search-top-table{
        width: 320px;
      }
      .control.has-icons-left .input.is-standard{
        padding-left: 44px !important;
      }
      .select.is-standard{
        font-size: 14px;
        height: 32px !important;
        box-sizing: border-box;
      }
      .select.is-standard select{
        height: 34px !important;
      }
      .control.is-flex {
        display: flex;
      }
      .control .icon.is-standard{
        background-color: #313440;
        border: 1px solid #1b1c21;
        border-radius: 4px 0px 0px 4px;
        box-sizing: border-box;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .field.has-error label{
        color: #d5474f !important;
      }
      .field.has-error .input, .field.has-error .select select{
        border: 1px solid #d5474f !important;
      }
      .field.has-error .field-error-message{
        color: #d5474f !important;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.33;
        letter-spacing: 0.4px;
      }
    `}
  </style>
);
