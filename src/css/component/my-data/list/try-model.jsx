import React from 'react';

export default () => (
  <style global jsx>
    {`
      .try-pre {
        height: 20rem!important;
        position: relative;
        margin-top: 0.6rem;
      }
      .box-tab-content .columns{
        padding: 1rem 0 1rem 1rem;
      }
      .mb2rem{
        margin-bottom: 2rem;
      }
      .mb1rem{
        margin-bottom: 2rem;
      }
      .padding-bottom0{
        padding-bottom: 0;
      }
      .try-model-output{
        padding-top: .5rem;
      }
      .try-model-output pre, .try-textarea {
        width: 100%;
        height: 20.5rem!important;
        margin-top: 0;
      }
      .try-model-output pre{
        width: 90%;
      }
      pre{
        padding: 10px;
        border: 1px solid #1b1c21;
        border-radius: 8px;
        overflow: auto;
        width: 49.35vw;
        background: #262831!important;
      }

      pre.try-pre {
        width: -webkit-fill-available;
        height: 20rem!important;
      }
      .try-textarea {
        background: transparent;
        color: #75CDCD;
        resize: none;
        border: 0 none;
        max-width: -webkit-fill-available;
        width: -webkit-fill-available;
        outline: none;
        height: 18rem!important;
        /* position: absolute; */
        font-family: monospace;
        width: 300px;
      }
      .padding-top0 {
        padding-top: 0 !important;
      }
      .box-tab-content .is-uppercase{
        font-size: 15px;
      }
      .align-items {
        display: flex;
      }
      .run-action{
        justify-content: flex-end;
        width: 100%;
        display: flex;
      }
      .run-action span{
        margin-left: 5px;
        font-size: 14px;
      }

      .pointer {
        cursor: pointer;
        color: '#ffd77b'
      }
      .pd-left1{
        padding-left: 1.05rem;
      }
    `}
  </style>
);
