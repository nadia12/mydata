import React from 'react';

export default () => (
  <style global jsx>
    {`
      .column p {
        display: block;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }
      
      .column label {
        font-size: 12px;
      }
      
      .box-modal-dataset-detail {
        overflow-y: visible;
        overflow-x: hidden;
        max-height: 70vh;
        width: 55vw;
        box-sizing: border-box;
        padding-right: 1rem;
        margin-right: -1rem;
      }
      .footer-modal-dataset-detail {
        margin-top: 2em;
        right: 0;
        border-width: 1px 0 0 0;
        border-color: #1b1c21;
        border-style: solid;
        margin-left: -2em;
        margin-right: -2em;
      }
      .close-btn-dataset-detail {
        float: right;
        margin-top: 2em;
        margin-right: 2em;
      }
      .pd-bottom0.5{
        padding-bottom: .5rem;
      }
      .mr-top0{
        margin-top: 0;
      }
    `}
  </style>
);
