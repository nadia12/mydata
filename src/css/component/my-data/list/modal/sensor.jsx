import React from 'react';

export default () => (
  <style global jsx>
    {`
      table.table-sensor {
        width: 100%;
        text-align: left;
      }

      table.table-sensor td.check {
        width: 25px;
      }

      table.table-sensor tr > td:nth-child(2) {
        border: 1px solid #1b1c21;
      }

      table.table-sensor tr > td:nth-child(1) {
        border: 1px solid #1b1c21;
        border-bottom-style: none;
        border-top-style: none;
      }

      table.table-sensor tr:nth-child(2) > td:nth-child(1) {
        border-top: 1px solid #1b1c21;
      }
      table.table-sensor tr:last-child > td:nth-child(1) {
        border-bottom: 1px solid #1b1c21;
        border-radius: 0 0 0 4px;
      }
      table.table-sensor tr:last-child > td:nth-child(2) {
        border-radius: 0 0  4px 0;
        border-bottom: 1px solid #1b1c21 !important; 
      }

      table.table-sensor tr:not(:first-child) > td:nth-child(2) {
        border-left-style: none;
        border-bottom-style: none;
      }

      table.table-sensor tr > td:first-child {
        border-right: none; 
      }

      table.table-sensor td {
        padding: 7px 12px;
      }

      table.table-sensor > tbody > tr > th :global(div) {
        margin-bottom: 0px;
      }
      table.table-sensor > tbody > tr > th :global(div > input) {
        padding-left: 2rem;
      }

      table.table-sensor tr:not(:first-child){
        background: #454958;
      }
      table.table-sensor tr.background-check {
        background: #313440;
      }

      .box-modal-sensor {
        width: 20vw;
        max-height: 80vh;
      }
      .box-modal-sensor input{
        padding-bottom: 2rem;
      }
      .box-modal-sensor h1{
        margin-bottom: 2rem;
        margin-top: 0;
      }
      .btn-a-href-sensor {
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding-bottom: calc(0.375em - 1px);
        padding-top: calc(0.375em - 1px);
        text-align: center;
        #1b1c21-space: nowrap;
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
      }
      .pd-bottom2{
        padding-bottom: 2rem;
      }
    `}
  </style>
);
