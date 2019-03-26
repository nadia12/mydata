import React from 'react';

export default () => (
  <style global jsx>
    {`
      .box-modal-modal-detail {
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 70vh;
        width: 55vw;
        box-sizing: border-box;
        margin-top: -2rem;
        padding-right: 1rem;
        margin-right: -1rem;
      }

      .modal-line {
        border-bottom: 1px black solid;
      }

      .modal-text{
        padding-bottom: 10px;
        padding-left: 1rem;
      }

      .modal-text span{
        font-size: 15px;
      }

      .column.right div{
        padding-bottom: 22px;
        padding-left: 15px;
      }

      .box-sample .column{
        padding: 30px;
      }

      // .table > tbody > tr {
      //   color: #9ea1b4;
      // }

      .name{
        color: #00bdce;
      }

      .level-left {
        float: left;
      }

      .container-box {
        display: flex;
        flex-direction: column;
      }

      // .table {
      //   background-color: #313440;
      //   border: 1px solid #1b1c21;
      //   border-radius: 8px;
      // }
      
      .column p {
        display: block;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }

      .box-asset {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        margin-bottom: 24px;
        border-radius: 8px;
        background-color: #313440;
      }

      .text-blue-azure {
        color: #00bdce;
      }

      .url {
        width: 70%;
        color: #00bdce;
      }

      .type {
        width: 5em;
      }

      .box-asset-header {
        font-size: 15px;
        padding-left: 1em;
        padding-top: 1em;
        padding-bottom: 1em;
      }

      .box-asset-content {
        display: flex;
        margin-top: 4px;
        padding-left: 1em;
        padding-top: 1em;
        padding-bottom: 1em;
        flex-wrap: wrap;
        align-content: space-around;
        border-style:solid;
        border-color: black;
        border-width: 1px 0 0 0;
      }

      .box-asset-content div {
        margin-right: 24px;
      }

      .footer-modal-model-detail {
        margin-top: 2em;
        right: 0;
        border-width: 1px 0 0 0;
        border-color: black;
        border-style: solid;
        margin-left: -2em;
        margin-right: -2em;
      }

      .close-btn-model-detail {
        float: right;
        margin-top: 2em;
        margin-right: 2em;
      }

      .left-model {
        width: 18vw;
        height: 25vh; 
        background-color: #313440;
        border-radius: 0.5em;
        
      }

      .left-model > h3 {
        border-style: solid;
        border-width: 0 0 1px 0;
        margin: 0.6rem 0px 0 0;
        padding-bottom: 0.6rem;
        padding-left: 0.6rem;
      }

      .right-model {
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
      }

      .right-model > div > p {
        color: #fff;
        margin-bottom: 2rem;
      }
      .box-tab-content {
        border: 1px solid #1b1c21;
        border-radius: 8px;
        background: #313440;
        padding: 10px 0 10px 0;
      }

      .accuracy.columns{
        margin-left: 0px;
        margin-bottom: -1.3rem;
        margin-top: 1.3rem;
      }
      
      .chart-image-accuracy{
        width: 80%;
        margin: auto;
        z-index: 0;
        padding-top: 20px;
      }
      .accuracy .box-tab-content{
        padding-bottom: 1rem;
      } 
      .accuracy .text-chart{
        padding-bottom: 1rem;
        z-index: 1;
      }
      .border-bottom{
        border-bottom: 1px black solid;
      }

      .accuracy-tooltip{
        float: right;
        margin-right: 13px;
      }
    `}
  </style>
);
