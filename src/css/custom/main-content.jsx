import React from 'react';

export default () => (
  <style global jsx>
    {`
      /* main content*/
      .hero.main-content .hero-head{
        padding: 32px 32px 0px 96px;
        z-index: 2;
      }
      .hero.main-content .hero-foot{
        padding: 0px 32px 24px 96px;
        z-index: 2;
      }
      .hero.main-content .hero-body{
        display: block;
        padding: 0px 32px 0px 96px;
        z-index: 1;
      }
      .main-content-head {
        box-sizing: border-box;
        height: 168px;
        background-color: #262831;
        border: 1px solid #1b1c21;
        border-radius: 8px 8px 0px 0px;
        padding: 32px 16px 24px 32px;
      }
      .main-content-foot {
        box-sizing: border-box;
        height: 36px;
        background-color: #313440;
        border: 1px solid #1b1c21;
        border-radius: 0px 0px 8px 8px;
        padding-top: 7px;
        padding-bottom: 10px;
        text-align: center;
      }
      .main-content-body {
        box-sizing: border-box;
        height: calc(100vh - 265px);
        background-color: #262831;
        border-left: 0.5px solid #1b1c21;
        border-right: 0.5px solid #1b1c21;
        padding: 0px;
      }

      .main-content-body.no-footer{
        border-radius: 0 0 8px 8px;
        border-bottom: 0.5px solid #1b1c21;
        height: calc(100vh - 230px);
      }
      
      .fullheight-no-footer{
        height: calc(100vh - 230px);
      }
      .fullheight-with-footer{
        height: calc(100vh - 370px);
      }

      .main-content-body.overflow-x-hidden {
        overflow-x: hidden;
      }
      .main-content-body.overflow-y-hidden {
        overflow-y: hidden;
      }
      .main-content-body-left{
        padding-top: 0px;
        padding-right: 0px;
        padding-bottom: 0px;
        box-sizing: border-box;
        height: calc(100vh - 260px);
        max-height: calc(100vh - 260px);
        overflow-y: auto;
    }
      .main-content-body-right{
        padding: 16px;
        box-sizing: border-box;
        height: calc(100vh - 260px);
        border-left: 1px solid #1b1c21;
      }

      .main-content-head-system-status{
        box-sizing: border-box;
        background-color: #262831;
        border-top: 1px solid #1b1c21;
        border-left: 1px solid #1b1c21;
        border-right: 1px solid #1b1c21;
        border-radius: 8px 8px 0px 0px;
        padding: 32px 16px 24px 32px;
      }
      .main-content-body-system-status{
        box-sizing: border-box;
        overflow-y: auto;
        box-sizing: border-box;
        background-color: #262831;
        border-left: 1px solid #1b1c21;
        border-right: 1px solid #1b1c21;
        border-bottom: 1px solid #1b1c21;
        border-radius: 0px 0px 8px 8px;
        padding: 0px;
      }
    `}
  </style>
);
