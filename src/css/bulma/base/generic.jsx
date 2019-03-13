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

    html {
      background-color: white;
      font-size: 16px;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      min-width: 300px;
      overflow-x: hidden;
      overflow-y: scroll;
      text-rendering: optimizeLegibility;
      text-size-adjust: 100%;
    }

    article,
    aside,
    figure,
    footer,
    header,
    hgroup,
    section {
      display: block;
    }

    body,
    button,
    input,
    select,
    textarea {
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    }

    code,
    pre {
      -moz-osx-font-smoothing: auto;
      -webkit-font-smoothing: auto;
      font-family: monospace;
    }

    body {
      color: #4a4a4a;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
    }

    a {
      color: #3273dc;
      cursor: pointer;
      text-decoration: none;
    }

    a strong {
      color: currentColor;
    }

    a:hover {
      color: #363636;
    }

    code {
      background-color: whitesmoke;
      color: #ff3860;
      font-size: 0.875em;
      font-weight: normal;
      padding: 0.25em 0.5em 0.25em;
    }

    hr {
      background-color: whitesmoke;
      border: none;
      display: block;
      height: 2px;
      margin: 1.5rem 0;
    }

    img {
      height: auto;
      max-width: 100%;
    }

    input[type="checkbox"],
    input[type="radio"] {
      vertical-align: baseline;
    }

    small {
      font-size: 0.875em;
    }

    span {
      font-style: inherit;
      font-weight: inherit;
    }

    strong {
      color: #363636;
      font-weight: 700;
    }

    fieldset {
      border: none;
    }

    pre {
      -webkit-overflow-scrolling: touch;
      background-color: whitesmoke;
      color: #4a4a4a;
      font-size: 0.875em;
      overflow-x: auto;
      padding: 1.25rem 1.5rem;
      white-space: pre;
      word-wrap: normal;
    }

    pre code {
      background-color: transparent;
      color: currentColor;
      font-size: 1em;
      padding: 0;
    }

    table td,
    table th {
      text-align: left;
      vertical-align: top;
    }

    table th {
      color: #363636;
    }
    `}
  </style>
);
