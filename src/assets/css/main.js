import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    font-family: 'Roboto', sans-serif;

    margin: 0;
    padding: 0;
    background: #313440;
  }
`

export const Helper = createGlobalStyle`
 .scroll-y{
    overflow-y: auto;
    overflow-x: hidden;
  }

  .has-cursor-pointer{
    cursor: pointer;
  }

  .has-w100-percent {
    width: 100%;
  }

  .has-h100-percent {
    height: 100%
  }
  
  /*helper display*/
  .has-display-flex{
    display: flex;
  }
  .has-flex-centered{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .has-flex-vertical-centered{
    display: flex;
    align-items: center;
  }
  .has-flex-horizontal-centered{
    display: flex;
    justify-content: center;
  }
  .has-flex-left{
    display: flex;
    justify-content: flex-start;
  }
  .has-flex-right{
    display: flex;
    justify-content: flex-end;
  }

  .float-left{
    float: left;
  }
  .float-right{
    float: right;
  }

  /*helper text*/
  .has-text-white{
    color: #ffffff !important;
  }
  .has-text-gold{
    color: #ffd77b !important;
  }
  .has-text-gray{
    color: #9ea1b4 !important;
  }
  .has-text-gray-black{
    color: #1b1c21;
  }
  .has-text-12 {
    font-family: Roboto;
    font-size: 12px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  }
  .has-text-14 {
    font-family: Roboto;
    font-size: 14px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: 0.5px;
  }
  .has-text-16 {
    font-family: Roboto;
    font-size: 16px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: 0.5px;
  }
  .has-text-20{
    font-family: Roboto;
    font-size: 20px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.4;
    letter-spacing: 0.2px;
  }
  .has-text-24{
    font-family: Roboto;
    font-size: 24px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
  }
  .has-text-32{
    font-family: Roboto;
    font-size: 32px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: 0.2px;
  }
  .has-text-48{
    font-family: Roboto;
    font-size: 48px !important;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: normal;
  }
  .has-text-weight-500{
    font-weight: 500;
  }

  /*helper background*/
  .has-bg-gray-black{
    background: #1b1c21 !important;
    background-color: #1b1c21 !important;
  }
  .has-bg-gray-dark{
    background: #262831 !important;
    background-color: #262831 !important;
  }
  .has-bg-gray{
    background: #313440 !important;
    background-color: #313440 !important;
  }
  .has-bg-gray-light{
    background: #454958 !important;
    background-color: #454958 !important;
  }
  .has-bg-transparent{
    background: transparent !important;
    background-color: transparent !important;
  }

  /*helper border*/
  .has-border-gray-black{
    border: 1px solid #1b1c21;
  }
  .has-border-gray-black-top{
    border-top: 1px solid #1b1c21;
  }
  .has-border-gray-black-bottom{
    border-bottom: 1px solid #1b1c21;
  }
  .has-border-gray-black-left{
    border-left: 1px solid #1b1c21;
  }
  .has-border-gray-black-right{
    border-right: 1px solid #1b1c21;
  }

  .has-border-gray-dark{
    border: 1px solid #262831;
  }
  .has-border-gray{
    border: 1px solid #313440;
  }
  .has-border-gray-light{
    border: 1px solid #454958;
  }
  .has-border-radius-8px{
    border-radius: 8px !important;
  }
  .has-border-radius-18px{
    border-radius: 18px !important;
  }

  .has-no-overflow-x{
    overflow-x: hidden !important;
  }

  .has-no-overflow-y{
    overflow-y: hidden !important;
  }

  /*Margin*/
  .m0{
    margin: 0px !important;
  }
  .mt0{
    margin-top: 0px !important;
  }
  .mb0{
    margin-bottom: 0px !important;
  }
  .ml0{
    margin-left: 0px !important;
  }
  .mr0{
    margin-right: 0px !important;
  }

  .m8px {
    margin: 8px !important;
  }
  .mt8px{
    margin-top: 8px !important;
  }
  .mb8px{
    margin-bottom: 8px !important;
  }
  .ml8px{
    margin-left: 8px !important;
  }
  .mr8px{
    margin-right: 8px !important;
  }

  .m16px {
    margin: 16px !important;
  }
  .mt16px{
    margin-top: 16px !important;
  }
  .mb16px{
    margin-bottom: 16px !important;
  }
  .ml16px{
    margin-left: 16px !important;
  }
  .mr16px{
    margin-right: 16px !important;
  }
  .mb20px{
    margin-bottom: 20px !important;
  }
  .mb25px{
    margin-bottom: 25px !important;
  }
  .mt20px{
    margin-top: 20px !important;
  }

  .m24px {
    margin: 24px !important;
  }
  .mt24px{
    margin-top: 24px !important;
  }
  .mb24px{
    margin-bottom: 24px !important;
  }
  .ml24px{
    margin-left: 24px !important;
  }
  .mr24px{
    margin-right: 24px !important;
  }

  .m32px {
    margin: 32px !important;
  }
  .mt32px{
    margin-top: 32px !important;
  }
  .mb32px{
    margin-bottom: 32px !important;
  }
  .ml32px{
    margin-left: 32px !important;
  }
  .mr32px{
    margin-right: 32px !important;
  }

  .m48px {
    margin: 48px !important;
  }
  .mt48px{
    margin-top: 48px !important;
  }
  .mb48px{
    margin-bottom: 48px !important;
  }
  .ml48px{
    margin-left: 48px !important;
  }
  .mr48px{
    margin-right: 48px !important;
  }


  /*padding*/
  .p0{
    padding: 0px !important;
  }
  .pt0{
    padding-top: 0px !important;
  }
  .pb0{
    padding-bottom: 0px !important;
  }
  .pl0{
    padding-left: 0px !important;
  }
  .pr0{
    padding-right: 0px !important;
  }

  .p5px {
    padding: 5px !important;
  }
  .pt5px{
    padding-top: 5px !important;
  }
  .pb5px{
    padding-bottom: 5px !important;
  }
  .pl5px{
    padding-left: 5px !important;
  }
  .pr5px{
    padding-right: 5px !important;
  }

  .p7px {
    padding: 7px !important;
  }
  .pt7px{
    padding-top: 7px !important;
  }
  .pb7px{
    padding-bottom: 7px !important;
  }
  .pl7px{
    padding-left: 7px !important;
  }
  .pr7px{
    padding-right: 7px !important;
  }

  .p10px {
    padding: 10px !important;
  }
  .pt10px{
    padding-top: 10px !important;
  }
  .pb10px{
    padding-bottom: 10px !important;
  }
  .pl10px{
    padding-left: 10px !important;
  }
  .pr10px{
    padding-right: 10px !important;
  }

  .p16px {
    padding: 16px !important;
  }
  .pt16px{
    padding-top: 16px !important;
  }
  .pb16px{
    padding-bottom: 16px !important;
  }
  .pl16px{
    padding-left: 16px !important;
  }
  .pr16px{
    padding-right: 16px !important;
  }
  
  .p24px {
    padding: 24px !important;
  }
  .pt24px{
    padding-top: 24px !important;
  }
  .pb24px{
    padding-bottom: 24px !important;
  }
  .pl24px{
    padding-left: 24px !important;
  }
  .pr24px{
    padding-right: 24px !important;
  }

  .p32px {
    padding: 32px !important;
  }
  .pt32px{
    padding-top: 32px !important;
  }
  .pb32px{
    padding-bottom: 32px !important;
  }
  .pl32px{
    padding-left: 32px !important;
  }
  .pr32px{
    padding-right: 32px !important;
  }

  .p64px {
    padding: 64px !important;
  }
  .pt64px{
    padding-top: 64px !important;
  }
  .pb64px{
    padding-bottom: 64px !important;
  }
  .pl64px{
    padding-left: 64px !important;
  }
  .pr64px{
    padding-right: 64px !important;
  }
  .border-right{
    border-right: 1px solid #1b1c21;
  }
  .vh-centering{
    position: relative;
  }
  .vh-centering p{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
  .vertical-center {
    vertical-align: middle;
    align-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    justify-content: center;
  }

  .is-pulled-right {
    float: right !important;
  }
`