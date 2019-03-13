import React from 'react';

export default () => (
  <style global jsx>
    {`
      .half-field{
        float: left;
        width: 50%;
        padding-bottom: 0;
      }
      .full-field{
        float: left;
        width: 100%;
        padding-bottom: 1rem;
      }
      .dataset-label{
        font-size: 12px;
        margin-left: 1px;
        margin-top: 3px;
        color: #9ea1b4;
      }
      .dataset-field{
        width: 46.8%;
        float: left;
      }
      .chart-field{
        width: 40.5%;
        float: right;
      }
      .right-box{
        flex: none;
        width: 33%;
      }
      .chart-wrapper{
        background: #454958;
        margin-top: 3em;
        height: 180px;
      }
      .tab-body{
        border: 1px solid #1b1c21;
        border-left: 0;
        margin: 0 !important;
      }
      .tab-footer{
        height: 2.8vw;
        padding: 1rem 2rem;
      }

      //Ini ada di index page
      .app-list{
        padding: 0;
      }
      .search-field{
        height: 50px;
        border-bottom: 1px solid #1b1c21;
      }
    `}
  </style>
);
