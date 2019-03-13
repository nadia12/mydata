import React from 'react';

export default () => (
  <style global jsx>
    {`
      .box-create-layout {
        width: 60vw;
        height: calc(100vh - 128px);
        background-color: #262831;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        margin: auto;
        margin-top: 32px;
      }

      .box-footer-create-layout {
        width: 60vw;
        height: 75px;
        border-top: 1px solid #1b1c21;
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
      }

      .box-footer-space-between {
        justify-content: space-between;
      }
      .box-footer-flex-end {
        justify-content: flex-end;
      }

      .li-box-footer, .loading-undefined {
        display: inline-flex;
      }

      .box-footer-button {
        margin-right: .3rem;
        margin-left: .3rem;
      }

      .box-footer-button:last-child {
        margin-right: 2rem;
      }

      .box-content-create-layout {
        height: calc(100vh - 128px - 32px - 24px - 100px);
        margin-left: 0px;
        margin-right: 0px;
      }
      .button-cancel-create-layout {
        cursor: pointer;
        outline: none;
        margin-right: 1em;
      }
      .mt-label {
        margin-top: calc(14px + .2rem)
      }

      .column-left-create-layout {
        width: 30%;
        overflow: auto;
        display: flex;
      }

      .column-right-create-layout {
        width: 68.5%;
        overflow: auto;
      }

      .column-full-create-layout {
        width: 100%;
        overflow: auto;
        margin: 0 1em;
      }

      .title-create-layout {
        margin-bottom: 0.75rem;
      }

      .btn-a-href-create-layout {
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding-bottom: calc(0.375em - 1px);
        padding-top: calc(0.375em - 1px);
        text-align: center;
        white-space: nowrap;
        border-radius: 290486px;
        padding-left: 1em;
        padding-right: 1em;
        font: 1rem 'Roboto',sans-serif;
        width: fit-content;
        cursor: pointer;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        border: 0px;
        background: none;
      }
      .li-loading {
        padding-right: .5rem;
        padding-left: .5rem;
        color: #ffd77b;
      }
      .li-loading:first-child {
        margin-left: 2rem;
      }
      .overlay-create-layout, .wrapper-create-layout {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .overlay-create-layout {
        opacity: 0.5;
        pointer-events: none;
      }
      .wrapper-create-layout {
        cursor: not-allowed !important;
        background: none;
      }
    `}
  </style>
);
