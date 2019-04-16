import React from 'react';

export default () => (
  <style global jsx>
    {`
      /* wizard */
      .wizard-head {
        padding: 32px;
        background: #262831;
        border: 1px solid #1b1c21;
        border-radius: 8px 8px 0px 0px;
      }
      .wizard-foot {
        padding: 16px 32px;
        text-align: right;
        background: #262831;
        border: 1px solid #1b1c21;
        border-radius: 0px 0px 8px 8px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

      }
      .wizard-body{
        height: calc(100vh - 292px);
        background: #262831;
      }
      .wizard-body-left{
        padding:32px;
        height: calc(100vh - 292px);
        overflow: auto;
        background: #262831;
        border-left: 1px solid #1b1c21;
        border-right: 1px solid #1b1c21;
        float: left;
        width: 30%;
      }
      .wizard-body-right{
        padding:32px;
        height: calc(100vh - 292px);
        overflow: auto;
        background: #262831;
        border-right: 1px solid #1b1c21;
        float: left;
        width: 70%;
        box-sizing: border-box;
      }
      .wizard-control ul{
        list-style-type: none;
        padding: 0px;
        margin: 0px;
      }
      .wizard-control ul li{
        margin-top: 48px;
      }
      .wizard-control ul li:first-child{
        margin-top: 0px;
      }
      .wizard-control .control-item .control-item-box{
        display: flex;
	      align-items: center;
      }
      .wizard-control .control-item .box-number {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: 0.1px;
        color: #1b1c21;
        height: 24px;
        width: 24px;
        border-radius: 12px;
        background: #9ea1b4;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
      }
      .wizard-control .control-item.clickable {
        cursor: pointer;
      }
      .wizard-control .control-item.is-active .box-number {
        background: #FFD77B !Important;
      }
      .wizard-control .control-item .box-text {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: 0.1px;
        color: #9ea1b4;
        float: left;
      }
      .wizard-control .control-item.is-active .box-text {
        color: #FFD77B !Important;
      }
    `}
  </style>
);
