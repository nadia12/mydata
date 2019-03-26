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

      .column {
        display: block;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        padding: 0.75rem;
      }

      .columns.is-mobile > .column.is-narrow {
        flex: none;
      }

      .columns.is-mobile > .column.is-full {
        flex: none;
        width: 100%;
      }

      .columns.is-mobile > .column.is-three-quarters {
        flex: none;
        width: 75%;
      }

      .columns.is-mobile > .column.is-two-thirds {
        flex: none;
        width: 66.6666%;
      }

      .columns.is-mobile > .column.is-half {
        flex: none;
        width: 50%;
      }

      .columns.is-mobile > .column.is-one-third {
        flex: none;
        width: 33.3333%;
      }

      .columns.is-mobile > .column.is-one-quarter {
        flex: none;
        width: 25%;
      }

      .columns.is-mobile > .column.is-one-fifth {
        flex: none;
        width: 20%;
      }

      .columns.is-mobile > .column.is-two-fifths {
        flex: none;
        width: 40%;
      }

      .columns.is-mobile > .column.is-three-fifths {
        flex: none;
        width: 60%;
      }

      .columns.is-mobile > .column.is-four-fifths {
        flex: none;
        width: 80%;
      }

      .columns.is-mobile > .column.is-offset-three-quarters {
        margin-left: 75%;
      }

      .columns.is-mobile > .column.is-offset-two-thirds {
        margin-left: 66.6666%;
      }

      .columns.is-mobile > .column.is-offset-half {
        margin-left: 50%;
      }

      .columns.is-mobile > .column.is-offset-one-third {
        margin-left: 33.3333%;
      }

      .columns.is-mobile > .column.is-offset-one-quarter {
        margin-left: 25%;
      }

      .columns.is-mobile > .column.is-offset-one-fifth {
        margin-left: 20%;
      }

      .columns.is-mobile > .column.is-offset-two-fifths {
        margin-left: 40%;
      }

      .columns.is-mobile > .column.is-offset-three-fifths {
        margin-left: 60%;
      }

      .columns.is-mobile > .column.is-offset-four-fifths {
        margin-left: 80%;
      }

      .columns.is-mobile > .column.is-1 {
        flex: none;
        width: 8.33333%;
      }

      .columns.is-mobile > .column.is-offset-1 {
        margin-left: 8.33333%;
      }

      .columns.is-mobile > .column.is-2 {
        flex: none;
        width: 16.66667%;
      }

      .columns.is-mobile > .column.is-offset-2 {
        margin-left: 16.66667%;
      }

      .columns.is-mobile > .column.is-3 {
        flex: none;
        width: 25%;
      }

      .columns.is-mobile > .column.is-offset-3 {
        margin-left: 25%;
      }

      .columns.is-mobile > .column.is-4 {
        flex: none;
        width: 33.33333%;
      }

      .columns.is-mobile > .column.is-offset-4 {
        margin-left: 33.33333%;
      }

      .columns.is-mobile > .column.is-5 {
        flex: none;
        width: 41.66667%;
      }

      .columns.is-mobile > .column.is-offset-5 {
        margin-left: 41.66667%;
      }

      .columns.is-mobile > .column.is-6 {
        flex: none;
        width: 50%;
      }

      .columns.is-mobile > .column.is-offset-6 {
        margin-left: 50%;
      }

      .columns.is-mobile > .column.is-7 {
        flex: none;
        width: 58.33333%;
      }

      .columns.is-mobile > .column.is-offset-7 {
        margin-left: 58.33333%;
      }

      .columns.is-mobile > .column.is-8 {
        flex: none;
        width: 66.66667%;
      }

      .columns.is-mobile > .column.is-offset-8 {
        margin-left: 66.66667%;
      }

      .columns.is-mobile > .column.is-9 {
        flex: none;
        width: 75%;
      }

      .columns.is-mobile > .column.is-offset-9 {
        margin-left: 75%;
      }

      .columns.is-mobile > .column.is-10 {
        flex: none;
        width: 83.33333%;
      }

      .columns.is-mobile > .column.is-offset-10 {
        margin-left: 83.33333%;
      }

      .columns.is-mobile > .column.is-11 {
        flex: none;
        width: 91.66667%;
      }

      .columns.is-mobile > .column.is-offset-11 {
        margin-left: 91.66667%;
      }

      .columns.is-mobile > .column.is-12 {
        flex: none;
        width: 100%;
      }

      .columns.is-mobile > .column.is-offset-12 {
        margin-left: 100%;
      }

      @media screen and (max-width: 768px) {
        .column.is-narrow-mobile {
          flex: none;
        }

        .column.is-full-mobile {
          flex: none;
          width: 100%;
        }

        .column.is-three-quarters-mobile {
          flex: none;
          width: 75%;
        }

        .column.is-two-thirds-mobile {
          flex: none;
          width: 66.6666%;
        }

        .column.is-half-mobile {
          flex: none;
          width: 50%;
        }

        .column.is-one-third-mobile {
          flex: none;
          width: 33.3333%;
        }

        .column.is-one-quarter-mobile {
          flex: none;
          width: 25%;
        }

        .column.is-one-fifth-mobile {
          flex: none;
          width: 20%;
        }

        .column.is-two-fifths-mobile {
          flex: none;
          width: 40%;
        }

        .column.is-three-fifths-mobile {
          flex: none;
          width: 60%;
        }

        .column.is-four-fifths-mobile {
          flex: none;
          width: 80%;
        }

        .column.is-offset-three-quarters-mobile {
          margin-left: 75%;
        }

        .column.is-offset-two-thirds-mobile {
          margin-left: 66.6666%;
        }

        .column.is-offset-half-mobile {
          margin-left: 50%;
        }

        .column.is-offset-one-third-mobile {
          margin-left: 33.3333%;
        }

        .column.is-offset-one-quarter-mobile {
          margin-left: 25%;
        }

        .column.is-offset-one-fifth-mobile {
          margin-left: 20%;
        }

        .column.is-offset-two-fifths-mobile {
          margin-left: 40%;
        }

        .column.is-offset-three-fifths-mobile {
          margin-left: 60%;
        }

        .column.is-offset-four-fifths-mobile {
          margin-left: 80%;
        }

        .column.is-1-mobile {
          flex: none;
          width: 8.33333%;
        }

        .column.is-offset-1-mobile {
          margin-left: 8.33333%;
        }

        .column.is-2-mobile {
          flex: none;
          width: 16.66667%;
        }

        .column.is-offset-2-mobile {
          margin-left: 16.66667%;
        }

        .column.is-3-mobile {
          flex: none;
          width: 25%;
        }

        .column.is-offset-3-mobile {
          margin-left: 25%;
        }

        .column.is-4-mobile {
          flex: none;
          width: 33.33333%;
        }

        .column.is-offset-4-mobile {
          margin-left: 33.33333%;
        }

        .column.is-5-mobile {
          flex: none;
          width: 41.66667%;
        }

        .column.is-offset-5-mobile {
          margin-left: 41.66667%;
        }

        .column.is-6-mobile {
          flex: none;
          width: 50%;
        }

        .column.is-offset-6-mobile {
          margin-left: 50%;
        }

        .column.is-7-mobile {
          flex: none;
          width: 58.33333%;
        }

        .column.is-offset-7-mobile {
          margin-left: 58.33333%;
        }

        .column.is-8-mobile {
          flex: none;
          width: 66.66667%;
        }

        .column.is-offset-8-mobile {
          margin-left: 66.66667%;
        }

        .column.is-9-mobile {
          flex: none;
          width: 75%;
        }

        .column.is-offset-9-mobile {
          margin-left: 75%;
        }

        .column.is-10-mobile {
          flex: none;
          width: 83.33333%;
        }

        .column.is-offset-10-mobile {
          margin-left: 83.33333%;
        }

        .column.is-11-mobile {
          flex: none;
          width: 91.66667%;
        }

        .column.is-offset-11-mobile {
          margin-left: 91.66667%;
        }

        .column.is-12-mobile {
          flex: none;
          width: 100%;
        }

        .column.is-offset-12-mobile {
          margin-left: 100%;
        }
      }

      @media screen and (min-width: 769px), print {
        .column.is-narrow, .column.is-narrow-tablet {
          flex: none;
        }

        .column.is-full, .column.is-full-tablet {
          flex: none;
          width: 100%;
        }

        .column.is-three-quarters, .column.is-three-quarters-tablet {
          flex: none;
          width: 75%;
        }

        .column.is-two-thirds, .column.is-two-thirds-tablet {
          flex: none;
          width: 66.6666%;
        }

        .column.is-half, .column.is-half-tablet {
          flex: none;
          width: 50%;
        }

        .column.is-one-third, .column.is-one-third-tablet {
          flex: none;
          width: 33.3333%;
        }

        .column.is-one-quarter, .column.is-one-quarter-tablet {
          flex: none;
          width: 25%;
        }

        .column.is-one-fifth, .column.is-one-fifth-tablet {
          flex: none;
          width: 20%;
        }

        .column.is-two-fifths, .column.is-two-fifths-tablet {
          flex: none;
          width: 40%;
        }

        .column.is-three-fifths, .column.is-three-fifths-tablet {
          flex: none;
          width: 60%;
        }

        .column.is-four-fifths, .column.is-four-fifths-tablet {
          flex: none;
          width: 80%;
        }

        .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {
          margin-left: 75%;
        }

        .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {
          margin-left: 66.6666%;
        }

        .column.is-offset-half, .column.is-offset-half-tablet {
          margin-left: 50%;
        }

        .column.is-offset-one-third, .column.is-offset-one-third-tablet {
          margin-left: 33.3333%;
        }

        .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {
          margin-left: 25%;
        }

        .column.is-offset-one-fifth, .column.is-offset-one-fifth-tablet {
          margin-left: 20%;
        }

        .column.is-offset-two-fifths, .column.is-offset-two-fifths-tablet {
          margin-left: 40%;
        }

        .column.is-offset-three-fifths, .column.is-offset-three-fifths-tablet {
          margin-left: 60%;
        }

        .column.is-offset-four-fifths, .column.is-offset-four-fifths-tablet {
          margin-left: 80%;
        }

        .column.is-1, .column.is-1-tablet {
          flex: none;
          width: 8.33333%;
        }

        .column.is-offset-1, .column.is-offset-1-tablet {
          margin-left: 8.33333%;
        }

        .column.is-2, .column.is-2-tablet {
          flex: none;
          width: 16.66667%;
        }

        .column.is-offset-2, .column.is-offset-2-tablet {
          margin-left: 16.66667%;
        }

        .column.is-3, .column.is-3-tablet {
          flex: none;
          width: 25%;
        }

        .column.is-offset-3, .column.is-offset-3-tablet {
          margin-left: 25%;
        }

        .column.is-4, .column.is-4-tablet {
          flex: none;
          width: 33.33333%;
        }

        .column.is-offset-4, .column.is-offset-4-tablet {
          margin-left: 33.33333%;
        }

        .column.is-5, .column.is-5-tablet {
          flex: none;
          width: 41.66667%;
        }

        .column.is-offset-5, .column.is-offset-5-tablet {
          margin-left: 41.66667%;
        }

        .column.is-6, .column.is-6-tablet {
          flex: none;
          width: 50%;
        }

        .column.is-offset-6, .column.is-offset-6-tablet {
          margin-left: 50%;
        }

        .column.is-7, .column.is-7-tablet {
          flex: none;
          width: 58.33333%;
        }

        .column.is-offset-7, .column.is-offset-7-tablet {
          margin-left: 58.33333%;
        }

        .column.is-8, .column.is-8-tablet {
          flex: none;
          width: 66.66667%;
        }

        .column.is-offset-8, .column.is-offset-8-tablet {
          margin-left: 66.66667%;
        }

        .column.is-9, .column.is-9-tablet {
          flex: none;
          width: 75%;
        }

        .column.is-offset-9, .column.is-offset-9-tablet {
          margin-left: 75%;
        }

        .column.is-10, .column.is-10-tablet {
          flex: none;
          width: 83.33333%;
        }

        .column.is-offset-10, .column.is-offset-10-tablet {
          margin-left: 83.33333%;
        }

        .column.is-11, .column.is-11-tablet {
          flex: none;
          width: 91.66667%;
        }

        .column.is-offset-11, .column.is-offset-11-tablet {
          margin-left: 91.66667%;
        }

        .column.is-12, .column.is-12-tablet {
          flex: none;
          width: 100%;
        }

        .column.is-offset-12, .column.is-offset-12-tablet {
          margin-left: 100%;
        }
      }

      @media screen and (max-width: 1087px) {
        .column.is-narrow-touch {
          flex: none;
        }

        .column.is-full-touch {
          flex: none;
          width: 100%;
        }

        .column.is-three-quarters-touch {
          flex: none;
          width: 75%;
        }

        .column.is-two-thirds-touch {
          flex: none;
          width: 66.6666%;
        }

        .column.is-half-touch {
          flex: none;
          width: 50%;
        }

        .column.is-one-third-touch {
          flex: none;
          width: 33.3333%;
        }

        .column.is-one-quarter-touch {
          flex: none;
          width: 25%;
        }

        .column.is-one-fifth-touch {
          flex: none;
          width: 20%;
        }

        .column.is-two-fifths-touch {
          flex: none;
          width: 40%;
        }

        .column.is-three-fifths-touch {
          flex: none;
          width: 60%;
        }

        .column.is-four-fifths-touch {
          flex: none;
          width: 80%;
        }

        .column.is-offset-three-quarters-touch {
          margin-left: 75%;
        }

        .column.is-offset-two-thirds-touch {
          margin-left: 66.6666%;
        }

        .column.is-offset-half-touch {
          margin-left: 50%;
        }

        .column.is-offset-one-third-touch {
          margin-left: 33.3333%;
        }

        .column.is-offset-one-quarter-touch {
          margin-left: 25%;
        }

        .column.is-offset-one-fifth-touch {
          margin-left: 20%;
        }

        .column.is-offset-two-fifths-touch {
          margin-left: 40%;
        }

        .column.is-offset-three-fifths-touch {
          margin-left: 60%;
        }

        .column.is-offset-four-fifths-touch {
          margin-left: 80%;
        }

        .column.is-1-touch {
          flex: none;
          width: 8.33333%;
        }

        .column.is-offset-1-touch {
          margin-left: 8.33333%;
        }

        .column.is-2-touch {
          flex: none;
          width: 16.66667%;
        }

        .column.is-offset-2-touch {
          margin-left: 16.66667%;
        }

        .column.is-3-touch {
          flex: none;
          width: 25%;
        }

        .column.is-offset-3-touch {
          margin-left: 25%;
        }

        .column.is-4-touch {
          flex: none;
          width: 33.33333%;
        }

        .column.is-offset-4-touch {
          margin-left: 33.33333%;
        }

        .column.is-5-touch {
          flex: none;
          width: 41.66667%;
        }

        .column.is-offset-5-touch {
          margin-left: 41.66667%;
        }

        .column.is-6-touch {
          flex: none;
          width: 50%;
        }

        .column.is-offset-6-touch {
          margin-left: 50%;
        }

        .column.is-7-touch {
          flex: none;
          width: 58.33333%;
        }

        .column.is-offset-7-touch {
          margin-left: 58.33333%;
        }

        .column.is-8-touch {
          flex: none;
          width: 66.66667%;
        }

        .column.is-offset-8-touch {
          margin-left: 66.66667%;
        }

        .column.is-9-touch {
          flex: none;
          width: 75%;
        }

        .column.is-offset-9-touch {
          margin-left: 75%;
        }

        .column.is-10-touch {
          flex: none;
          width: 83.33333%;
        }

        .column.is-offset-10-touch {
          margin-left: 83.33333%;
        }

        .column.is-11-touch {
          flex: none;
          width: 91.66667%;
        }

        .column.is-offset-11-touch {
          margin-left: 91.66667%;
        }

        .column.is-12-touch {
          flex: none;
          width: 100%;
        }

        .column.is-offset-12-touch {
          margin-left: 100%;
        }
      }

      @media screen and (min-width: 1088px) {
        .column.is-narrow-desktop {
          flex: none;
        }

        .column.is-full-desktop {
          flex: none;
          width: 100%;
        }

        .column.is-three-quarters-desktop {
          flex: none;
          width: 75%;
        }

        .column.is-two-thirds-desktop {
          flex: none;
          width: 66.6666%;
        }

        .column.is-half-desktop {
          flex: none;
          width: 50%;
        }

        .column.is-one-third-desktop {
          flex: none;
          width: 33.3333%;
        }

        .column.is-one-quarter-desktop {
          flex: none;
          width: 25%;
        }

        .column.is-one-fifth-desktop {
          flex: none;
          width: 20%;
        }

        .column.is-two-fifths-desktop {
          flex: none;
          width: 40%;
        }

        .column.is-three-fifths-desktop {
          flex: none;
          width: 60%;
        }

        .column.is-four-fifths-desktop {
          flex: none;
          width: 80%;
        }

        .column.is-offset-three-quarters-desktop {
          margin-left: 75%;
        }

        .column.is-offset-two-thirds-desktop {
          margin-left: 66.6666%;
        }

        .column.is-offset-half-desktop {
          margin-left: 50%;
        }

        .column.is-offset-one-third-desktop {
          margin-left: 33.3333%;
        }

        .column.is-offset-one-quarter-desktop {
          margin-left: 25%;
        }

        .column.is-offset-one-fifth-desktop {
          margin-left: 20%;
        }

        .column.is-offset-two-fifths-desktop {
          margin-left: 40%;
        }

        .column.is-offset-three-fifths-desktop {
          margin-left: 60%;
        }

        .column.is-offset-four-fifths-desktop {
          margin-left: 80%;
        }

        .column.is-1-desktop {
          flex: none;
          width: 8.33333%;
        }

        .column.is-offset-1-desktop {
          margin-left: 8.33333%;
        }

        .column.is-2-desktop {
          flex: none;
          width: 16.66667%;
        }

        .column.is-offset-2-desktop {
          margin-left: 16.66667%;
        }

        .column.is-3-desktop {
          flex: none;
          width: 25%;
        }

        .column.is-offset-3-desktop {
          margin-left: 25%;
        }

        .column.is-4-desktop {
          flex: none;
          width: 33.33333%;
        }

        .column.is-offset-4-desktop {
          margin-left: 33.33333%;
        }

        .column.is-5-desktop {
          flex: none;
          width: 41.66667%;
        }

        .column.is-offset-5-desktop {
          margin-left: 41.66667%;
        }

        .column.is-6-desktop {
          flex: none;
          width: 50%;
        }

        .column.is-offset-6-desktop {
          margin-left: 50%;
        }

        .column.is-7-desktop {
          flex: none;
          width: 58.33333%;
        }

        .column.is-offset-7-desktop {
          margin-left: 58.33333%;
        }

        .column.is-8-desktop {
          flex: none;
          width: 66.66667%;
        }

        .column.is-offset-8-desktop {
          margin-left: 66.66667%;
        }

        .column.is-9-desktop {
          flex: none;
          width: 75%;
        }

        .column.is-offset-9-desktop {
          margin-left: 75%;
        }

        .column.is-10-desktop {
          flex: none;
          width: 83.33333%;
        }

        .column.is-offset-10-desktop {
          margin-left: 83.33333%;
        }

        .column.is-11-desktop {
          flex: none;
          width: 91.66667%;
        }

        .column.is-offset-11-desktop {
          margin-left: 91.66667%;
        }

        .column.is-12-desktop {
          flex: none;
          width: 100%;
        }

        .column.is-offset-12-desktop {
          margin-left: 100%;
        }
      }

      @media screen and (min-width: 1280px) {
        .column.is-narrow-widescreen {
          flex: none;
        }

        .column.is-full-widescreen {
          flex: none;
          width: 100%;
        }

        .column.is-three-quarters-widescreen {
          flex: none;
          width: 75%;
        }

        .column.is-two-thirds-widescreen {
          flex: none;
          width: 66.6666%;
        }

        .column.is-half-widescreen {
          flex: none;
          width: 50%;
        }

        .column.is-one-third-widescreen {
          flex: none;
          width: 33.3333%;
        }

        .column.is-one-quarter-widescreen {
          flex: none;
          width: 25%;
        }

        .column.is-one-fifth-widescreen {
          flex: none;
          width: 20%;
        }

        .column.is-two-fifths-widescreen {
          flex: none;
          width: 40%;
        }

        .column.is-three-fifths-widescreen {
          flex: none;
          width: 60%;
        }

        .column.is-four-fifths-widescreen {
          flex: none;
          width: 80%;
        }

        .column.is-offset-three-quarters-widescreen {
          margin-left: 75%;
        }

        .column.is-offset-two-thirds-widescreen {
          margin-left: 66.6666%;
        }

        .column.is-offset-half-widescreen {
          margin-left: 50%;
        }

        .column.is-offset-one-third-widescreen {
          margin-left: 33.3333%;
        }

        .column.is-offset-one-quarter-widescreen {
          margin-left: 25%;
        }

        .column.is-offset-one-fifth-widescreen {
          margin-left: 20%;
        }

        .column.is-offset-two-fifths-widescreen {
          margin-left: 40%;
        }

        .column.is-offset-three-fifths-widescreen {
          margin-left: 60%;
        }

        .column.is-offset-four-fifths-widescreen {
          margin-left: 80%;
        }

        .column.is-1-widescreen {
          flex: none;
          width: 8.33333%;
        }

        .column.is-offset-1-widescreen {
          margin-left: 8.33333%;
        }

        .column.is-2-widescreen {
          flex: none;
          width: 16.66667%;
        }

        .column.is-offset-2-widescreen {
          margin-left: 16.66667%;
        }

        .column.is-3-widescreen {
          flex: none;
          width: 25%;
        }

        .column.is-offset-3-widescreen {
          margin-left: 25%;
        }

        .column.is-4-widescreen {
          flex: none;
          width: 33.33333%;
        }

        .column.is-offset-4-widescreen {
          margin-left: 33.33333%;
        }

        .column.is-5-widescreen {
          flex: none;
          width: 41.66667%;
        }

        .column.is-offset-5-widescreen {
          margin-left: 41.66667%;
        }

        .column.is-6-widescreen {
          flex: none;
          width: 50%;
        }

        .column.is-offset-6-widescreen {
          margin-left: 50%;
        }

        .column.is-7-widescreen {
          flex: none;
          width: 58.33333%;
        }

        .column.is-offset-7-widescreen {
          margin-left: 58.33333%;
        }

        .column.is-8-widescreen {
          flex: none;
          width: 66.66667%;
        }

        .column.is-offset-8-widescreen {
          margin-left: 66.66667%;
        }

        .column.is-9-widescreen {
          flex: none;
          width: 75%;
        }

        .column.is-offset-9-widescreen {
          margin-left: 75%;
        }

        .column.is-10-widescreen {
          flex: none;
          width: 83.33333%;
        }

        .column.is-offset-10-widescreen {
          margin-left: 83.33333%;
        }

        .column.is-11-widescreen {
          flex: none;
          width: 91.66667%;
        }

        .column.is-offset-11-widescreen {
          margin-left: 91.66667%;
        }

        .column.is-12-widescreen {
          flex: none;
          width: 100%;
        }

        .column.is-offset-12-widescreen {
          margin-left: 100%;
        }
      }

      @media screen and (min-width: 1472px) {
        .column.is-narrow-fullhd {
          flex: none;
        }

        .column.is-full-fullhd {
          flex: none;
          width: 100%;
        }

        .column.is-three-quarters-fullhd {
          flex: none;
          width: 75%;
        }

        .column.is-two-thirds-fullhd {
          flex: none;
          width: 66.6666%;
        }

        .column.is-half-fullhd {
          flex: none;
          width: 50%;
        }

        .column.is-one-third-fullhd {
          flex: none;
          width: 33.3333%;
        }

        .column.is-one-quarter-fullhd {
          flex: none;
          width: 25%;
        }

        .column.is-one-fifth-fullhd {
          flex: none;
          width: 20%;
        }

        .column.is-two-fifths-fullhd {
          flex: none;
          width: 40%;
        }

        .column.is-three-fifths-fullhd {
          flex: none;
          width: 60%;
        }

        .column.is-four-fifths-fullhd {
          flex: none;
          width: 80%;
        }

        .column.is-offset-three-quarters-fullhd {
          margin-left: 75%;
        }

        .column.is-offset-two-thirds-fullhd {
          margin-left: 66.6666%;
        }

        .column.is-offset-half-fullhd {
          margin-left: 50%;
        }

        .column.is-offset-one-third-fullhd {
          margin-left: 33.3333%;
        }

        .column.is-offset-one-quarter-fullhd {
          margin-left: 25%;
        }

        .column.is-offset-one-fifth-fullhd {
          margin-left: 20%;
        }

        .column.is-offset-two-fifths-fullhd {
          margin-left: 40%;
        }

        .column.is-offset-three-fifths-fullhd {
          margin-left: 60%;
        }

        .column.is-offset-four-fifths-fullhd {
          margin-left: 80%;
        }

        .column.is-1-fullhd {
          flex: none;
          width: 8.33333%;
        }

        .column.is-offset-1-fullhd {
          margin-left: 8.33333%;
        }

        .column.is-2-fullhd {
          flex: none;
          width: 16.66667%;
        }

        .column.is-offset-2-fullhd {
          margin-left: 16.66667%;
        }

        .column.is-3-fullhd {
          flex: none;
          width: 25%;
        }

        .column.is-offset-3-fullhd {
          margin-left: 25%;
        }

        .column.is-4-fullhd {
          flex: none;
          width: 33.33333%;
        }

        .column.is-offset-4-fullhd {
          margin-left: 33.33333%;
        }

        .column.is-5-fullhd {
          flex: none;
          width: 41.66667%;
        }

        .column.is-offset-5-fullhd {
          margin-left: 41.66667%;
        }

        .column.is-6-fullhd {
          flex: none;
          width: 50%;
        }

        .column.is-offset-6-fullhd {
          margin-left: 50%;
        }

        .column.is-7-fullhd {
          flex: none;
          width: 58.33333%;
        }

        .column.is-offset-7-fullhd {
          margin-left: 58.33333%;
        }

        .column.is-8-fullhd {
          flex: none;
          width: 66.66667%;
        }

        .column.is-offset-8-fullhd {
          margin-left: 66.66667%;
        }

        .column.is-9-fullhd {
          flex: none;
          width: 75%;
        }

        .column.is-offset-9-fullhd {
          margin-left: 75%;
        }

        .column.is-10-fullhd {
          flex: none;
          width: 83.33333%;
        }

        .column.is-offset-10-fullhd {
          margin-left: 83.33333%;
        }

        .column.is-11-fullhd {
          flex: none;
          width: 91.66667%;
        }

        .column.is-offset-11-fullhd {
          margin-left: 91.66667%;
        }

        .column.is-12-fullhd {
          flex: none;
          width: 100%;
        }

        .column.is-offset-12-fullhd {
          margin-left: 100%;
        }
      }

      .columns {
        margin-left: -0.75rem;
        margin-right: -0.75rem;
        margin-top: -0.75rem;
      }

      .columns:last-child {
        margin-bottom: -0.75rem;
      }

      .columns:not(:last-child) {
        margin-bottom: calc(1.5rem - 0.75rem);
      }

      .columns.is-centered {
        justify-content: center;
      }

      .columns.is-gapless {
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
      }

      .columns.is-gapless > .column {
        margin: 0;
        padding: 0 !important;
      }

      .columns.is-gapless:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .columns.is-gapless:last-child {
        margin-bottom: 0;
      }

      .columns.is-mobile {
        display: flex;
      }

      .columns.is-multiline {
        flex-wrap: wrap;
      }

      .columns.is-vcentered {
        align-items: center;
      }

      @media screen and (min-width: 769px), print {
        .columns:not(.is-desktop) {
          display: flex;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-desktop {
          display: flex;
        }
      }

      .columns.is-variable {
        --columnGap: 0.75rem;
        margin-left: calc(-1 * var(--columnGap));
        margin-right: calc(-1 * var(--columnGap));
      }

      .columns.is-variable .column {
        padding-left: var(--columnGap);
        padding-right: var(--columnGap);
      }

      .columns.is-variable.is-0 {
        --columnGap: 0rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-0-mobile {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-0-tablet {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-0-tablet-only {
          --columnGap: 0rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-0-touch {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-0-desktop {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-0-desktop-only {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-0-widescreen {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-0-widescreen-only {
          --columnGap: 0rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-0-fullhd {
          --columnGap: 0rem;
        }
      }

      .columns.is-variable.is-1 {
        --columnGap: 0.25rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-1-mobile {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-1-tablet {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-1-tablet-only {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-1-touch {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-1-desktop {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-1-desktop-only {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-1-widescreen {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-1-widescreen-only {
          --columnGap: 0.25rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-1-fullhd {
          --columnGap: 0.25rem;
        }
      }

      .columns.is-variable.is-2 {
        --columnGap: 0.5rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-2-mobile {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-2-tablet {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-2-tablet-only {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-2-touch {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-2-desktop {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-2-desktop-only {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-2-widescreen {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-2-widescreen-only {
          --columnGap: 0.5rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-2-fullhd {
          --columnGap: 0.5rem;
        }
      }

      .columns.is-variable.is-3 {
        --columnGap: 0.75rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-3-mobile {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-3-tablet {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-3-tablet-only {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-3-touch {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-3-desktop {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-3-desktop-only {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-3-widescreen {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-3-widescreen-only {
          --columnGap: 0.75rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-3-fullhd {
          --columnGap: 0.75rem;
        }
      }

      .columns.is-variable.is-4 {
        --columnGap: 1rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-4-mobile {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-4-tablet {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-4-tablet-only {
          --columnGap: 1rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-4-touch {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-4-desktop {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-4-desktop-only {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-4-widescreen {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-4-widescreen-only {
          --columnGap: 1rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-4-fullhd {
          --columnGap: 1rem;
        }
      }

      .columns.is-variable.is-5 {
        --columnGap: 1.25rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-5-mobile {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-5-tablet {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-5-tablet-only {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-5-touch {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-5-desktop {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-5-desktop-only {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-5-widescreen {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-5-widescreen-only {
          --columnGap: 1.25rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-5-fullhd {
          --columnGap: 1.25rem;
        }
      }

      .columns.is-variable.is-6 {
        --columnGap: 1.5rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-6-mobile {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-6-tablet {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-6-tablet-only {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-6-touch {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-6-desktop {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-6-desktop-only {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-6-widescreen {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-6-widescreen-only {
          --columnGap: 1.5rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-6-fullhd {
          --columnGap: 1.5rem;
        }
      }

      .columns.is-variable.is-7 {
        --columnGap: 1.75rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-7-mobile {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-7-tablet {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-7-tablet-only {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-7-touch {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-7-desktop {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-7-desktop-only {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-7-widescreen {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-7-widescreen-only {
          --columnGap: 1.75rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-7-fullhd {
          --columnGap: 1.75rem;
        }
      }

      .columns.is-variable.is-8 {
        --columnGap: 2rem;
      }

      @media screen and (max-width: 768px) {
        .columns.is-variable.is-8-mobile {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .columns.is-variable.is-8-tablet {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 769px) and (max-width: 1087px) {
        .columns.is-variable.is-8-tablet-only {
          --columnGap: 2rem;
        }
      }

      @media screen and (max-width: 1087px) {
        .columns.is-variable.is-8-touch {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 1088px) {
        .columns.is-variable.is-8-desktop {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 1088px) and (max-width: 1279px) {
        .columns.is-variable.is-8-desktop-only {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 1280px) {
        .columns.is-variable.is-8-widescreen {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 1280px) and (max-width: 1471px) {
        .columns.is-variable.is-8-widescreen-only {
          --columnGap: 2rem;
        }
      }

      @media screen and (min-width: 1472px) {
        .columns.is-variable.is-8-fullhd {
          --columnGap: 2rem;
        }
      }
    `}
  </style>
);
