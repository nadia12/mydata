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

      .progress:not(:last-child) {
        margin-bottom: 1.5rem;
      }

      .progress {
        -moz-appearance: none;
        -webkit-appearance: none;
        border: none;
        border-radius: 290486px;
        display: block;
        height: 1rem;
        overflow: hidden;
        padding: 0;
        width: 100%;
      }

      .progress::-webkit-progress-bar {
        background-color: #dbdbdb;
      }

      .progress::-webkit-progress-value {
        background-color: #4a4a4a;
      }

      .progress::-moz-progress-bar {
        background-color: #4a4a4a;
      }

      .progress::-ms-fill {
        background-color: #4a4a4a;
        border: none;
      }

      .progress:indeterminate {
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-name: moveIndeterminate;
        animation-timing-function: linear;
        background-color: #dbdbdb;
        background-image: linear-gradient(to right, #4a4a4a 30%, #dbdbdb 30%);
        background-position: top left;
        background-repeat: no-repeat;
        background-size: 150% 150%;
      }

      .progress:indeterminate::-webkit-progress-bar {
        background-color: transparent;
      }

      .progress:indeterminate::-moz-progress-bar {
        background-color: transparent;
      }

      .progress.is-white::-webkit-progress-value {
        background-color: white;
      }

      .progress.is-white::-moz-progress-bar {
        background-color: white;
      }

      .progress.is-white::-ms-fill {
        background-color: white;
      }

      .progress.is-white:indeterminate {
        background-image: linear-gradient(to right, white 30%, #dbdbdb 30%);
      }

      .progress.is-black::-webkit-progress-value {
        background-color: #0a0a0a;
      }

      .progress.is-black::-moz-progress-bar {
        background-color: #0a0a0a;
      }

      .progress.is-black::-ms-fill {
        background-color: #0a0a0a;
      }

      .progress.is-black:indeterminate {
        background-image: linear-gradient(to right, #0a0a0a 30%, #dbdbdb 30%);
      }

      .progress.is-light::-webkit-progress-value {
        background-color: whitesmoke;
      }

      .progress.is-light::-moz-progress-bar {
        background-color: whitesmoke;
      }

      .progress.is-light::-ms-fill {
        background-color: whitesmoke;
      }

      .progress.is-light:indeterminate {
        background-image: linear-gradient(to right, whitesmoke 30%, #dbdbdb 30%);
      }

      .progress.is-dark::-webkit-progress-value {
        background-color: #363636;
      }

      .progress.is-dark::-moz-progress-bar {
        background-color: #363636;
      }

      .progress.is-dark::-ms-fill {
        background-color: #363636;
      }

      .progress.is-dark:indeterminate {
        background-image: linear-gradient(to right, #363636 30%, #dbdbdb 30%);
      }

      .progress.is-primary::-webkit-progress-value {
        background-color: #00d1b2;
      }

      .progress.is-primary::-moz-progress-bar {
        background-color: #00d1b2;
      }

      .progress.is-primary::-ms-fill {
        background-color: #00d1b2;
      }

      .progress.is-primary:indeterminate {
        background-image: linear-gradient(to right, #00d1b2 30%, #dbdbdb 30%);
      }

      .progress.is-link::-webkit-progress-value {
        background-color: #3273dc;
      }

      .progress.is-link::-moz-progress-bar {
        background-color: #3273dc;
      }

      .progress.is-link::-ms-fill {
        background-color: #3273dc;
      }

      .progress.is-link:indeterminate {
        background-image: linear-gradient(to right, #3273dc 30%, #dbdbdb 30%);
      }

      .progress.is-info::-webkit-progress-value {
        background-color: #209cee;
      }

      .progress.is-info::-moz-progress-bar {
        background-color: #209cee;
      }

      .progress.is-info::-ms-fill {
        background-color: #209cee;
      }

      .progress.is-info:indeterminate {
        background-image: linear-gradient(to right, #209cee 30%, #dbdbdb 30%);
      }

      .progress.is-success::-webkit-progress-value {
        background-color: #23d160;
      }

      .progress.is-success::-moz-progress-bar {
        background-color: #23d160;
      }

      .progress.is-success::-ms-fill {
        background-color: #23d160;
      }

      .progress.is-success:indeterminate {
        background-image: linear-gradient(to right, #23d160 30%, #dbdbdb 30%);
      }

      .progress.is-warning::-webkit-progress-value {
        background-color: #ffdd57;
      }

      .progress.is-warning::-moz-progress-bar {
        background-color: #ffdd57;
      }

      .progress.is-warning::-ms-fill {
        background-color: #ffdd57;
      }

      .progress.is-warning:indeterminate {
        background-image: linear-gradient(to right, #ffdd57 30%, #dbdbdb 30%);
      }

      .progress.is-danger::-webkit-progress-value {
        background-color: #ff3860;
      }

      .progress.is-danger::-moz-progress-bar {
        background-color: #ff3860;
      }

      .progress.is-danger::-ms-fill {
        background-color: #ff3860;
      }

      .progress.is-danger:indeterminate {
        background-image: linear-gradient(to right, #ff3860 30%, #dbdbdb 30%);
      }

      .progress.is-small {
        height: 0.75rem;
      }

      .progress.is-medium {
        height: 1.25rem;
      }

      .progress.is-large {
        height: 1.5rem;
      }

      @keyframes moveIndeterminate {
        from {
          background-position: 200% 0;
        }

        to {
          background-position: -200% 0;
        }
      }
    `}
  </style>
);
