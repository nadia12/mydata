import React from 'react';

export default () => (
  <style global jsx>
    {`
      /*button*/
      a.is-gold, .a.is-gold:hover{
        color: #FFD77B;
      }

      .button.is-gold, .button.is-gold:hover {
        background: #FFD77B;
        border: 1px solid #FFD77B;
        color: #262831;
      }

      .button.is-gold.is-outlined {
        background: transparent;
        border: 1px solid #FFD77B !important;
        color: #FFD77B !important;
      }

      .button.is-gold.is-outlined:hover {
        background: #FFD77B !important;
        border: 1px solid #FFD77B !important;
        color: #262831 !important;
      }

      .button.is-standard {
        box-sizing: border-box;
        height: 32px;
        padding-right: 32px;
        padding-left: 32px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: 0.8px;
      }
      .button.is-standard.has-icon {
        height: 32px;
        padding-left: 24px;
      }
      .button.is-standard.has-icon .button-icon {
        margin-right: 8px
      }

      .button-icon-box {
        border-radius: 4px;
        box-sizing: border-box;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .button-icon-box.is-standard {
        background-color: #313440;
        border: 1px solid #1b1c21;
      }
      button.button-icon:hover {
        background-color: #262831;
      }
      button.button-icon {
        height: 2.1rem !important;
        margin-right: 0.5rem;
        padding: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        outline:none;
      }
      button.transparent{
        border: none;
        background: rgba(0,0,0,0);
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        outline:none;
        cursor: pointer;
      }
    `}
  </style>
);
