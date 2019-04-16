import React from 'react';

export default () => (
  <style global jsx>
    {`
      @keyframes spinAround {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(359deg);
        }
      }

      .image.is-square img,
      .image.is-square .has-ratio, .image.is-1by1 img,
      .image.is-1by1 .has-ratio, .image.is-5by4 img,
      .image.is-5by4 .has-ratio, .image.is-4by3 img,
      .image.is-4by3 .has-ratio, .image.is-3by2 img,
      .image.is-3by2 .has-ratio, .image.is-5by3 img,
      .image.is-5by3 .has-ratio, .image.is-16by9 img,
      .image.is-16by9 .has-ratio, .image.is-2by1 img,
      .image.is-2by1 .has-ratio, .image.is-3by1 img,
      .image.is-3by1 .has-ratio, .image.is-4by5 img,
      .image.is-4by5 .has-ratio, .image.is-3by4 img,
      .image.is-3by4 .has-ratio, .image.is-2by3 img,
      .image.is-2by3 .has-ratio, .image.is-3by5 img,
      .image.is-3by5 .has-ratio, .image.is-9by16 img,
      .image.is-9by16 .has-ratio, .image.is-1by2 img,
      .image.is-1by2 .has-ratio, .image.is-1by3 img,
      .image.is-1by3 .has-ratio {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }

      .image {
        display: block;
        position: relative;
      }

      .image img {
        display: block;
        height: auto;
        width: 100%;
      }

      .image img.is-rounded {
        border-radius: 290486px;
      }

      .image.is-square img,
        .image.is-square .has-ratio, .image.is-1by1 img,
        .image.is-1by1 .has-ratio, .image.is-5by4 img,
        .image.is-5by4 .has-ratio, .image.is-4by3 img,
        .image.is-4by3 .has-ratio, .image.is-3by2 img,
        .image.is-3by2 .has-ratio, .image.is-5by3 img,
        .image.is-5by3 .has-ratio, .image.is-16by9 img,
        .image.is-16by9 .has-ratio, .image.is-2by1 img,
        .image.is-2by1 .has-ratio, .image.is-3by1 img,
        .image.is-3by1 .has-ratio, .image.is-4by5 img,
        .image.is-4by5 .has-ratio, .image.is-3by4 img,
        .image.is-3by4 .has-ratio, .image.is-2by3 img,
        .image.is-2by3 .has-ratio, .image.is-3by5 img,
        .image.is-3by5 .has-ratio, .image.is-9by16 img,
        .image.is-9by16 .has-ratio, .image.is-1by2 img,
        .image.is-1by2 .has-ratio, .image.is-1by3 img,
        .image.is-1by3 .has-ratio {
        height: 100%;
        width: 100%;
      }

      .image.is-square, .image.is-1by1 {
        padding-top: 100%;
      }

      .image.is-5by4 {
        padding-top: 80%;
      }

      .image.is-4by3 {
        padding-top: 75%;
      }

      .image.is-3by2 {
        padding-top: 66.6666%;
      }

      .image.is-5by3 {
        padding-top: 60%;
      }

      .image.is-16by9 {
        padding-top: 56.25%;
      }

      .image.is-2by1 {
        padding-top: 50%;
      }

      .image.is-3by1 {
        padding-top: 33.3333%;
      }

      .image.is-4by5 {
        padding-top: 125%;
      }

      .image.is-3by4 {
        padding-top: 133.3333%;
      }

      .image.is-2by3 {
        padding-top: 150%;
      }

      .image.is-3by5 {
        padding-top: 166.6666%;
      }

      .image.is-9by16 {
        padding-top: 177.7777%;
      }

      .image.is-1by2 {
        padding-top: 200%;
      }

      .image.is-1by3 {
        padding-top: 300%;
      }

      .image.is-16x16 {
        height: 16px;
        width: 16px;
      }

      .image.is-24x24 {
        height: 24px;
        width: 24px;
      }

      .image.is-32x32 {
        height: 32px;
        width: 32px;
      }

      .image.is-48x48 {
        height: 48px;
        width: 48px;
      }

      .image.is-64x64 {
        height: 64px;
        width: 64px;
      }

      .image.is-96x96 {
        height: 96px;
        width: 96px;
      }

      .image.is-128x128 {
        height: 128px;
        width: 128px;
      }
    `}
  </style>
);
