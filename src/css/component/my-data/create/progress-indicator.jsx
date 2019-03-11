import React from 'react';

export default () => (
  <style global jsx>
    {`
      .progressbar {
        overflow: hidden;
        counter-reset: step;
        margin-left:auto;
        margin-right: auto;
        padding-top: 1em;
        padding-left: 0;
        align-content: center;
      }

      /* untuk description (li) */
      .progressbar li {
        list-style-type: none;
        width: 100%;
        padding: 15px;
        font-size: 14px;
        position: relative;
        text-align: left;
        color: #9ea1b4;
      }

      /* sebelum description, add bullet, styling all bullet*/
      .progressbar li:before { 
        width: 24px;
        height: 24px;
        content: counter(step);
        counter-increment: step;
        line-height: 24px;
        border: 2px solid #9ea1b4;
        display: inline-block;
        text-align: center;
        margin: 0 auto 20px auto;
        border-radius: 50%;
        background-color: #9ea1b4;
        margin-right: 10px;
      }

      /* untuk semua garis penghubung */
      .progressbar li:after { 
        width: 2px;
        height: 65%;
        content: '';
        position: absolute;
        background-color: #9ea1b4;
        top: -35px;
        left: 28px;
      }

      /* hilangkan garis penghubung pada first child */
      .progressbar li:first-child:after {
        content: none;
      }

      /*untuk description active*/
      .progressbar li.active { 
        color: #ffd77b;
      }

      /*border yang active*/
      .progressbar li.active:before { 
        border-color: #ffd77b;
        background-color: #ffd77b;
      }

      /* untuk content active maupun non-active*/
      .progressbar li.active:before, .progressbar li:before{
        color: rgba(0, 0, 0, 0.87);
      }
    `}
  </style>
);
