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

      .file {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .select:not(.is-multiple):not(.is-loading)::after {
        border: 3px solid transparent;
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: 0.625em;
        margin-top: -0.4375em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
        transform-origin: center;
        width: 0.625em;
      }

      .select.is-loading::after, .control.is-loading::after {
        animation: spinAround 500ms infinite linear;
        border: 2px solid #dbdbdb;
        border-radius: 290486px;
        border-right-color: transparent;
        border-top-color: transparent;
        content: "";
        display: block;
        height: 1em;
        position: relative;
        width: 1em;
      }

      .input,
      .textarea, .select select, .file-cta,
      .file-name {
        -moz-appearance: none;
        -webkit-appearance: none;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 4px;
        box-shadow: none;
        display: inline-flex;
        font-size: 1rem;
        height: 2.25em;
        justify-content: flex-start;
        line-height: 1.5;
        padding-bottom: calc(0.375em - 1px);
        padding-left: calc(0.625em - 1px);
        padding-right: calc(0.625em - 1px);
        padding-top: calc(0.375em - 1px);
        position: relative;
        vertical-align: top;
      }

      .input:focus,
        .textarea:focus, .select select:focus, .file-cta:focus,
        .file-name:focus, .is-focused.input,
        .is-focused.textarea, .select select.is-focused, .is-focused.file-cta,
        .is-focused.file-name, .input:active,
        .textarea:active, .select select:active, .file-cta:active,
        .file-name:active, .is-active.input,
        .is-active.textarea, .select select.is-active, .is-active.file-cta,
        .is-active.file-name {
        outline: none;
      }

      [disabled].input,
        [disabled].textarea, .select select[disabled], [disabled].file-cta,
        [disabled].file-name,
        fieldset[disabled] .input,
        fieldset[disabled]
        .textarea,
        fieldset[disabled] .select select, .select
        fieldset[disabled] select,
        fieldset[disabled] .file-cta,
        fieldset[disabled]
        .file-name {
        cursor: not-allowed;
      }

      .input,
      .textarea {
        background-color: white;
        border-color: #dbdbdb;
        color: #363636;
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
        max-width: 100%;
        width: 100%;
      }

      .input::-moz-placeholder,
        .textarea::-moz-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .input::-webkit-input-placeholder,
        .textarea::-webkit-input-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .input:-moz-placeholder,
        .textarea:-moz-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .input:-ms-input-placeholder,
        .textarea:-ms-input-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .input:hover, .input.is-hovered,
        .textarea:hover,
        .textarea.is-hovered {
        border-color: #b5b5b5;
      }

      .input:focus, .input.is-focused, .input:active, .input.is-active,
        .textarea:focus,
        .textarea.is-focused,
        .textarea:active,
        .textarea.is-active {
        border-color: #3273dc;
        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
      }

      .input[disabled],
        fieldset[disabled] .input,
        .textarea[disabled],
        fieldset[disabled]
        .textarea {
        background-color: whitesmoke;
        border-color: whitesmoke;
        box-shadow: none;
        color: #7a7a7a;
      }

      .input[disabled]::-moz-placeholder,
          fieldset[disabled] .input::-moz-placeholder,
          .textarea[disabled]::-moz-placeholder,
          fieldset[disabled]
          .textarea::-moz-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .input[disabled]::-webkit-input-placeholder,
          fieldset[disabled] .input::-webkit-input-placeholder,
          .textarea[disabled]::-webkit-input-placeholder,
          fieldset[disabled]
          .textarea::-webkit-input-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .input[disabled]:-moz-placeholder,
          fieldset[disabled] .input:-moz-placeholder,
          .textarea[disabled]:-moz-placeholder,
          fieldset[disabled]
          .textarea:-moz-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .input[disabled]:-ms-input-placeholder,
          fieldset[disabled] .input:-ms-input-placeholder,
          .textarea[disabled]:-ms-input-placeholder,
          fieldset[disabled]
          .textarea:-ms-input-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .input[readonly],
        .textarea[readonly] {
        box-shadow: none;
      }

      .input.is-white,
        .textarea.is-white {
        border-color: white;
      }

      .input.is-white:focus, .input.is-white.is-focused, .input.is-white:active, .input.is-white.is-active,
          .textarea.is-white:focus,
          .textarea.is-white.is-focused,
          .textarea.is-white:active,
          .textarea.is-white.is-active {
        box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
      }

      .input.is-black,
        .textarea.is-black {
        border-color: #0a0a0a;
      }

      .input.is-black:focus, .input.is-black.is-focused, .input.is-black:active, .input.is-black.is-active,
          .textarea.is-black:focus,
          .textarea.is-black.is-focused,
          .textarea.is-black:active,
          .textarea.is-black.is-active {
        box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
      }

      .input.is-light,
        .textarea.is-light {
        border-color: whitesmoke;
      }

      .input.is-light:focus, .input.is-light.is-focused, .input.is-light:active, .input.is-light.is-active,
          .textarea.is-light:focus,
          .textarea.is-light.is-focused,
          .textarea.is-light:active,
          .textarea.is-light.is-active {
        box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
      }

      .input.is-dark,
        .textarea.is-dark {
        border-color: #363636;
      }

      .input.is-dark:focus, .input.is-dark.is-focused, .input.is-dark:active, .input.is-dark.is-active,
          .textarea.is-dark:focus,
          .textarea.is-dark.is-focused,
          .textarea.is-dark:active,
          .textarea.is-dark.is-active {
        box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
      }

      .input.is-primary,
        .textarea.is-primary {
        border-color: #00d1b2;
      }

      .input.is-primary:focus, .input.is-primary.is-focused, .input.is-primary:active, .input.is-primary.is-active,
          .textarea.is-primary:focus,
          .textarea.is-primary.is-focused,
          .textarea.is-primary:active,
          .textarea.is-primary.is-active {
        box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
      }

      .input.is-link,
        .textarea.is-link {
        border-color: #3273dc;
      }

      .input.is-link:focus, .input.is-link.is-focused, .input.is-link:active, .input.is-link.is-active,
          .textarea.is-link:focus,
          .textarea.is-link.is-focused,
          .textarea.is-link:active,
          .textarea.is-link.is-active {
        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
      }

      .input.is-info,
        .textarea.is-info {
        border-color: #209cee;
      }

      .input.is-info:focus, .input.is-info.is-focused, .input.is-info:active, .input.is-info.is-active,
          .textarea.is-info:focus,
          .textarea.is-info.is-focused,
          .textarea.is-info:active,
          .textarea.is-info.is-active {
        box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25);
      }

      .input.is-success,
        .textarea.is-success {
        border-color: #23d160;
      }

      .input.is-success:focus, .input.is-success.is-focused, .input.is-success:active, .input.is-success.is-active,
          .textarea.is-success:focus,
          .textarea.is-success.is-focused,
          .textarea.is-success:active,
          .textarea.is-success.is-active {
        box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);
      }

      .input.is-warning,
        .textarea.is-warning {
        border-color: #ffdd57;
      }

      .input.is-warning:focus, .input.is-warning.is-focused, .input.is-warning:active, .input.is-warning.is-active,
          .textarea.is-warning:focus,
          .textarea.is-warning.is-focused,
          .textarea.is-warning:active,
          .textarea.is-warning.is-active {
        box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
      }

      .input.is-danger,
        .textarea.is-danger {
        border-color: #ff3860;
      }

      .input.is-danger:focus, .input.is-danger.is-focused, .input.is-danger:active, .input.is-danger.is-active,
          .textarea.is-danger:focus,
          .textarea.is-danger.is-focused,
          .textarea.is-danger:active,
          .textarea.is-danger.is-active {
        box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);
      }

      .input.is-small,
        .textarea.is-small {
        border-radius: 2px;
        font-size: 0.75rem;
      }

      .input.is-medium,
        .textarea.is-medium {
        font-size: 1.25rem;
      }

      .input.is-large,
        .textarea.is-large {
        font-size: 1.5rem;
      }

      .input.is-fullwidth,
        .textarea.is-fullwidth {
        display: block;
        width: 100%;
      }

      .input.is-inline,
        .textarea.is-inline {
        display: inline;
        width: auto;
      }

      .input.is-rounded {
        border-radius: 290486px;
        padding-left: 1em;
        padding-right: 1em;
      }

      .input.is-static {
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
        padding-left: 0;
        padding-right: 0;
      }

      .textarea {
        display: block;
        max-width: 100%;
        min-width: 100%;
        padding: 0.625em;
        resize: vertical;
      }

      .textarea:not([rows]) {
        max-height: 600px;
        min-height: 120px;
      }

      .textarea[rows] {
        height: initial;
      }

      .textarea.has-fixed-size {
        resize: none;
      }

      .checkbox,
      .radio {
        cursor: pointer;
        display: inline-block;
        line-height: 1.25;
        position: relative;
      }

      .checkbox input,
        .radio input {
        cursor: pointer;
      }

      .checkbox:hover,
        .radio:hover {
        color: #363636;
      }

      .checkbox[disabled],
        fieldset[disabled] .checkbox,
        .radio[disabled],
        fieldset[disabled]
        .radio {
        color: #7a7a7a;
        cursor: not-allowed;
      }

      .radio + .radio {
        margin-left: 0.5em;
      }

      .select {
        display: inline-block;
        max-width: 100%;
        position: relative;
        vertical-align: top;
      }

      .select:not(.is-multiple) {
        height: 2.25em;
      }

      .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #3273dc;
        right: 1.125em;
        z-index: 4;
      }

      .select.is-rounded select {
        border-radius: 290486px;
        padding-left: 1em;
      }

      .select select {
        background-color: white;
        border-color: #dbdbdb;
        color: #363636;
        cursor: pointer;
        display: block;
        font-size: 1em;
        max-width: 100%;
        outline: none;
      }

      .select select::-moz-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .select select::-webkit-input-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .select select:-moz-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .select select:-ms-input-placeholder {
        color: rgba(54, 54, 54, 0.3);
      }

      .select select:hover, .select select.is-hovered {
        border-color: #b5b5b5;
      }

      .select select:focus, .select select.is-focused, .select select:active, .select select.is-active {
        border-color: #3273dc;
        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
      }

      .select select[disabled],
          fieldset[disabled] .select select {
        background-color: whitesmoke;
        border-color: whitesmoke;
        box-shadow: none;
        color: #7a7a7a;
      }

      .select select[disabled]::-moz-placeholder,
            fieldset[disabled] .select select::-moz-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .select select[disabled]::-webkit-input-placeholder,
            fieldset[disabled] .select select::-webkit-input-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .select select[disabled]:-moz-placeholder,
            fieldset[disabled] .select select:-moz-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .select select[disabled]:-ms-input-placeholder,
            fieldset[disabled] .select select:-ms-input-placeholder {
        color: rgba(122, 122, 122, 0.3);
      }

      .select select::-ms-expand {
        display: none;
      }

      .select select[disabled]:hover,
          fieldset[disabled] .select select:hover {
        border-color: whitesmoke;
      }

      .select select:not([multiple]) {
        padding-right: 2.5em;
      }

      .select select[multiple] {
        height: auto;
        padding: 0;
      }

      .select select[multiple] option {
        padding: 0.5em 1em;
      }

      .select:not(.is-multiple):not(.is-loading):hover::after {
        border-color: #363636;
      }

      .select.is-white:not(:hover)::after {
        border-color: white;
      }

      .select.is-white select {
        border-color: white;
      }

      .select.is-white select:hover, .select.is-white select.is-hovered {
        border-color: #f2f2f2;
      }

      .select.is-white select:focus, .select.is-white select.is-focused, .select.is-white select:active, .select.is-white select.is-active {
        box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
      }

      .select.is-black:not(:hover)::after {
        border-color: #0a0a0a;
      }

      .select.is-black select {
        border-color: #0a0a0a;
      }

      .select.is-black select:hover, .select.is-black select.is-hovered {
        border-color: black;
      }

      .select.is-black select:focus, .select.is-black select.is-focused, .select.is-black select:active, .select.is-black select.is-active {
        box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
      }

      .select.is-light:not(:hover)::after {
        border-color: whitesmoke;
      }

      .select.is-light select {
        border-color: whitesmoke;
      }

      .select.is-light select:hover, .select.is-light select.is-hovered {
        border-color: #e8e8e8;
      }

      .select.is-light select:focus, .select.is-light select.is-focused, .select.is-light select:active, .select.is-light select.is-active {
        box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
      }

      .select.is-dark:not(:hover)::after {
        border-color: #363636;
      }

      .select.is-dark select {
        border-color: #363636;
      }

      .select.is-dark select:hover, .select.is-dark select.is-hovered {
        border-color: #292929;
      }

      .select.is-dark select:focus, .select.is-dark select.is-focused, .select.is-dark select:active, .select.is-dark select.is-active {
        box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
      }

      .select.is-primary:not(:hover)::after {
        border-color: #00d1b2;
      }

      .select.is-primary select {
        border-color: #00d1b2;
      }

      .select.is-primary select:hover, .select.is-primary select.is-hovered {
        border-color: #00b89c;
      }

      .select.is-primary select:focus, .select.is-primary select.is-focused, .select.is-primary select:active, .select.is-primary select.is-active {
        box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
      }

      .select.is-link:not(:hover)::after {
        border-color: #3273dc;
      }

      .select.is-link select {
        border-color: #3273dc;
      }

      .select.is-link select:hover, .select.is-link select.is-hovered {
        border-color: #2366d1;
      }

      .select.is-link select:focus, .select.is-link select.is-focused, .select.is-link select:active, .select.is-link select.is-active {
        box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
      }

      .select.is-info:not(:hover)::after {
        border-color: #209cee;
      }

      .select.is-info select {
        border-color: #209cee;
      }

      .select.is-info select:hover, .select.is-info select.is-hovered {
        border-color: #118fe4;
      }

      .select.is-info select:focus, .select.is-info select.is-focused, .select.is-info select:active, .select.is-info select.is-active {
        box-shadow: 0 0 0 0.125em rgba(32, 156, 238, 0.25);
      }

      .select.is-success:not(:hover)::after {
        border-color: #23d160;
      }

      .select.is-success select {
        border-color: #23d160;
      }

      .select.is-success select:hover, .select.is-success select.is-hovered {
        border-color: #20bc56;
      }

      .select.is-success select:focus, .select.is-success select.is-focused, .select.is-success select:active, .select.is-success select.is-active {
        box-shadow: 0 0 0 0.125em rgba(35, 209, 96, 0.25);
      }

      .select.is-warning:not(:hover)::after {
        border-color: #ffdd57;
      }

      .select.is-warning select {
        border-color: #ffdd57;
      }

      .select.is-warning select:hover, .select.is-warning select.is-hovered {
        border-color: #ffd83d;
      }

      .select.is-warning select:focus, .select.is-warning select.is-focused, .select.is-warning select:active, .select.is-warning select.is-active {
        box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
      }

      .select.is-danger:not(:hover)::after {
        border-color: #ff3860;
      }

      .select.is-danger select {
        border-color: #ff3860;
      }

      .select.is-danger select:hover, .select.is-danger select.is-hovered {
        border-color: #ff1f4b;
      }

      .select.is-danger select:focus, .select.is-danger select.is-focused, .select.is-danger select:active, .select.is-danger select.is-active {
        box-shadow: 0 0 0 0.125em rgba(255, 56, 96, 0.25);
      }

      .select.is-small {
        border-radius: 2px;
        font-size: 0.75rem;
      }

      .select.is-medium {
        font-size: 1.25rem;
      }

      .select.is-large {
        font-size: 1.5rem;
      }

      .select.is-disabled::after {
        border-color: #7a7a7a;
      }

      .select.is-fullwidth {
        width: 100%;
      }

      .select.is-fullwidth select {
        width: 100%;
      }

      .select.is-loading::after {
        margin-top: 0;
        position: absolute;
        right: 0.625em;
        top: 0.625em;
        transform: none;
      }

      .select.is-loading.is-small:after {
        font-size: 0.75rem;
      }

      .select.is-loading.is-medium:after {
        font-size: 1.25rem;
      }

      .select.is-loading.is-large:after {
        font-size: 1.5rem;
      }

      .file {
        align-items: stretch;
        display: flex;
        justify-content: flex-start;
        position: relative;
      }

      .file.is-white .file-cta {
        background-color: white;
        border-color: transparent;
        color: #0a0a0a;
      }

      .file.is-white:hover .file-cta, .file.is-white.is-hovered .file-cta {
        background-color: #f9f9f9;
        border-color: transparent;
        color: #0a0a0a;
      }

      .file.is-white:focus .file-cta, .file.is-white.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);
        color: #0a0a0a;
      }

      .file.is-white:active .file-cta, .file.is-white.is-active .file-cta {
        background-color: #f2f2f2;
        border-color: transparent;
        color: #0a0a0a;
      }

      .file.is-black .file-cta {
        background-color: #0a0a0a;
        border-color: transparent;
        color: white;
      }

      .file.is-black:hover .file-cta, .file.is-black.is-hovered .file-cta {
        background-color: #040404;
        border-color: transparent;
        color: white;
      }

      .file.is-black:focus .file-cta, .file.is-black.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);
        color: white;
      }

      .file.is-black:active .file-cta, .file.is-black.is-active .file-cta {
        background-color: black;
        border-color: transparent;
        color: white;
      }

      .file.is-light .file-cta {
        background-color: whitesmoke;
        border-color: transparent;
        color: #363636;
      }

      .file.is-light:hover .file-cta, .file.is-light.is-hovered .file-cta {
        background-color: #eeeeee;
        border-color: transparent;
        color: #363636;
      }

      .file.is-light:focus .file-cta, .file.is-light.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);
        color: #363636;
      }

      .file.is-light:active .file-cta, .file.is-light.is-active .file-cta {
        background-color: #e8e8e8;
        border-color: transparent;
        color: #363636;
      }

      .file.is-dark .file-cta {
        background-color: #363636;
        border-color: transparent;
        color: whitesmoke;
      }

      .file.is-dark:hover .file-cta, .file.is-dark.is-hovered .file-cta {
        background-color: #2f2f2f;
        border-color: transparent;
        color: whitesmoke;
      }

      .file.is-dark:focus .file-cta, .file.is-dark.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);
        color: whitesmoke;
      }

      .file.is-dark:active .file-cta, .file.is-dark.is-active .file-cta {
        background-color: #292929;
        border-color: transparent;
        color: whitesmoke;
      }

      .file.is-primary .file-cta {
        background-color: #00d1b2;
        border-color: transparent;
        color: #fff;
      }

      .file.is-primary:hover .file-cta, .file.is-primary.is-hovered .file-cta {
        background-color: #00c4a7;
        border-color: transparent;
        color: #fff;
      }

      .file.is-primary:focus .file-cta, .file.is-primary.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
        color: #fff;
      }

      .file.is-primary:active .file-cta, .file.is-primary.is-active .file-cta {
        background-color: #00b89c;
        border-color: transparent;
        color: #fff;
      }

      .file.is-link .file-cta {
        background-color: #3273dc;
        border-color: transparent;
        color: #fff;
      }

      .file.is-link:hover .file-cta, .file.is-link.is-hovered .file-cta {
        background-color: #276cda;
        border-color: transparent;
        color: #fff;
      }

      .file.is-link:focus .file-cta, .file.is-link.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);
        color: #fff;
      }

      .file.is-link:active .file-cta, .file.is-link.is-active .file-cta {
        background-color: #2366d1;
        border-color: transparent;
        color: #fff;
      }

      .file.is-info .file-cta {
        background-color: #209cee;
        border-color: transparent;
        color: #fff;
      }

      .file.is-info:hover .file-cta, .file.is-info.is-hovered .file-cta {
        background-color: #1496ed;
        border-color: transparent;
        color: #fff;
      }

      .file.is-info:focus .file-cta, .file.is-info.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(32, 156, 238, 0.25);
        color: #fff;
      }

      .file.is-info:active .file-cta, .file.is-info.is-active .file-cta {
        background-color: #118fe4;
        border-color: transparent;
        color: #fff;
      }

      .file.is-success .file-cta {
        background-color: #23d160;
        border-color: transparent;
        color: #fff;
      }

      .file.is-success:hover .file-cta, .file.is-success.is-hovered .file-cta {
        background-color: #22c65b;
        border-color: transparent;
        color: #fff;
      }

      .file.is-success:focus .file-cta, .file.is-success.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(35, 209, 96, 0.25);
        color: #fff;
      }

      .file.is-success:active .file-cta, .file.is-success.is-active .file-cta {
        background-color: #20bc56;
        border-color: transparent;
        color: #fff;
      }

      .file.is-warning .file-cta {
        background-color: #ffdd57;
        border-color: transparent;
        color: rgba(0, 0, 0, 0.7);
      }

      .file.is-warning:hover .file-cta, .file.is-warning.is-hovered .file-cta {
        background-color: #ffdb4a;
        border-color: transparent;
        color: rgba(0, 0, 0, 0.7);
      }

      .file.is-warning:focus .file-cta, .file.is-warning.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);
        color: rgba(0, 0, 0, 0.7);
      }

      .file.is-warning:active .file-cta, .file.is-warning.is-active .file-cta {
        background-color: #ffd83d;
        border-color: transparent;
        color: rgba(0, 0, 0, 0.7);
      }

      .file.is-danger .file-cta {
        background-color: #ff3860;
        border-color: transparent;
        color: #fff;
      }

      .file.is-danger:hover .file-cta, .file.is-danger.is-hovered .file-cta {
        background-color: #ff2b56;
        border-color: transparent;
        color: #fff;
      }

      .file.is-danger:focus .file-cta, .file.is-danger.is-focused .file-cta {
        border-color: transparent;
        box-shadow: 0 0 0.5em rgba(255, 56, 96, 0.25);
        color: #fff;
      }

      .file.is-danger:active .file-cta, .file.is-danger.is-active .file-cta {
        background-color: #ff1f4b;
        border-color: transparent;
        color: #fff;
      }

      .file.is-small {
        font-size: 0.75rem;
      }

      .file.is-medium {
        font-size: 1.25rem;
      }

      .file.is-medium .file-icon .fa {
        font-size: 21px;
      }

      .file.is-large {
        font-size: 1.5rem;
      }

      .file.is-large .file-icon .fa {
        font-size: 28px;
      }

      .file.has-name .file-cta {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      .file.has-name .file-name {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

      .file.has-name.is-empty .file-cta {
        border-radius: 4px;
      }

      .file.has-name.is-empty .file-name {
        display: none;
      }

      .file.is-boxed .file-label {
        flex-direction: column;
      }

      .file.is-boxed .file-cta {
        flex-direction: column;
        height: auto;
        padding: 1em 3em;
      }

      .file.is-boxed .file-name {
        border-width: 0 1px 1px;
      }

      .file.is-boxed .file-icon {
        height: 1.5em;
        width: 1.5em;
      }

      .file.is-boxed .file-icon .fa {
        font-size: 21px;
      }

      .file.is-boxed.is-small .file-icon .fa {
        font-size: 14px;
      }

      .file.is-boxed.is-medium .file-icon .fa {
        font-size: 28px;
      }

      .file.is-boxed.is-large .file-icon .fa {
        font-size: 35px;
      }

      .file.is-boxed.has-name .file-cta {
        border-radius: 4px 4px 0 0;
      }

      .file.is-boxed.has-name .file-name {
        border-radius: 0 0 4px 4px;
        border-width: 0 1px 1px;
      }

      .file.is-centered {
        justify-content: center;
      }

      .file.is-fullwidth .file-label {
        width: 100%;
      }

      .file.is-fullwidth .file-name {
        flex-grow: 1;
        max-width: none;
      }

      .file.is-right {
        justify-content: flex-end;
      }

      .file.is-right .file-cta {
        border-radius: 0 4px 4px 0;
      }

      .file.is-right .file-name {
        border-radius: 4px 0 0 4px;
        border-width: 1px 0 1px 1px;
        order: -1;
      }

      .file-label {
        align-items: stretch;
        display: flex;
        cursor: pointer;
        justify-content: flex-start;
        overflow: hidden;
        position: relative;
      }

      .file-label:hover .file-cta {
        background-color: #eeeeee;
        color: #363636;
      }

      .file-label:hover .file-name {
        border-color: #d5d5d5;
      }

      .file-label:active .file-cta {
        background-color: #e8e8e8;
        color: #363636;
      }

      .file-label:active .file-name {
        border-color: #cfcfcf;
      }

      .file-input {
        height: 100%;
        left: 0;
        opacity: 0;
        outline: none;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .file-cta,
      .file-name {
        border-color: #dbdbdb;
        border-radius: 4px;
        font-size: 1em;
        padding-left: 1em;
        padding-right: 1em;
        white-space: nowrap;
      }

      .file-cta {
        background-color: whitesmoke;
        color: #4a4a4a;
      }

      .file-name {
        border-color: #dbdbdb;
        border-style: solid;
        border-width: 1px 1px 1px 0;
        display: block;
        max-width: 16em;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
      }

      .file-icon {
        align-items: center;
        display: flex;
        height: 1em;
        justify-content: center;
        margin-right: 0.5em;
        width: 1em;
      }

      .file-icon .fa {
        font-size: 14px;
      }

      .label {
        color: #363636;
        display: block;
        font-size: 1rem;
        font-weight: 700;
      }

      .label:not(:last-child) {
        margin-bottom: 0.5em;
      }

      .label.is-small {
        font-size: 0.75rem;
      }

      .label.is-medium {
        font-size: 1.25rem;
      }

      .label.is-large {
        font-size: 1.5rem;
      }

      .help {
        display: block;
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }

      .help.is-white {
        color: white;
      }

      .help.is-black {
        color: #0a0a0a;
      }

      .help.is-light {
        color: whitesmoke;
      }

      .help.is-dark {
        color: #363636;
      }

      .help.is-primary {
        color: #00d1b2;
      }

      .help.is-link {
        color: #3273dc;
      }

      .help.is-info {
        color: #209cee;
      }

      .help.is-success {
        color: #23d160;
      }

      .help.is-warning {
        color: #ffdd57;
      }

      .help.is-danger {
        color: #ff3860;
      }

      .field:not(:last-child) {
        margin-bottom: 0.75rem;
      }

      .field.has-addons {
        display: flex;
        justify-content: flex-start;
      }

      .field.has-addons .control:not(:last-child) {
        margin-right: -1px;
      }

      .field.has-addons .control:not(:first-child):not(:last-child) .button,
        .field.has-addons .control:not(:first-child):not(:last-child) .input,
        .field.has-addons .control:not(:first-child):not(:last-child) .select select {
        border-radius: 0;
      }

      .field.has-addons .control:first-child:not(:only-child) .button,
        .field.has-addons .control:first-child:not(:only-child) .input,
        .field.has-addons .control:first-child:not(:only-child) .select select {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      .field.has-addons .control:last-child:not(:only-child) .button,
        .field.has-addons .control:last-child:not(:only-child) .input,
        .field.has-addons .control:last-child:not(:only-child) .select select {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

      .field.has-addons .control .button:not([disabled]):hover, .field.has-addons .control .button:not([disabled]).is-hovered,
        .field.has-addons .control .input:not([disabled]):hover,
        .field.has-addons .control .input:not([disabled]).is-hovered,
        .field.has-addons .control .select select:not([disabled]):hover,
        .field.has-addons .control .select select:not([disabled]).is-hovered {
        z-index: 2;
      }

      .field.has-addons .control .button:not([disabled]):focus, .field.has-addons .control .button:not([disabled]).is-focused, .field.has-addons .control .button:not([disabled]):active, .field.has-addons .control .button:not([disabled]).is-active,
        .field.has-addons .control .input:not([disabled]):focus,
        .field.has-addons .control .input:not([disabled]).is-focused,
        .field.has-addons .control .input:not([disabled]):active,
        .field.has-addons .control .input:not([disabled]).is-active,
        .field.has-addons .control .select select:not([disabled]):focus,
        .field.has-addons .control .select select:not([disabled]).is-focused,
        .field.has-addons .control .select select:not([disabled]):active,
        .field.has-addons .control .select select:not([disabled]).is-active {
        z-index: 3;
      }

      .field.has-addons .control .button:not([disabled]):focus:hover, .field.has-addons .control .button:not([disabled]).is-focused:hover, .field.has-addons .control .button:not([disabled]):active:hover, .field.has-addons .control .button:not([disabled]).is-active:hover,
          .field.has-addons .control .input:not([disabled]):focus:hover,
          .field.has-addons .control .input:not([disabled]).is-focused:hover,
          .field.has-addons .control .input:not([disabled]):active:hover,
          .field.has-addons .control .input:not([disabled]).is-active:hover,
          .field.has-addons .control .select select:not([disabled]):focus:hover,
          .field.has-addons .control .select select:not([disabled]).is-focused:hover,
          .field.has-addons .control .select select:not([disabled]):active:hover,
          .field.has-addons .control .select select:not([disabled]).is-active:hover {
        z-index: 4;
      }

      .field.has-addons .control.is-expanded {
        flex-grow: 1;
      }

      .field.has-addons.has-addons-centered {
        justify-content: center;
      }

      .field.has-addons.has-addons-right {
        justify-content: flex-end;
      }

      .field.has-addons.has-addons-fullwidth .control {
        flex-grow: 1;
        flex-shrink: 0;
      }

      .field.is-grouped {
        display: flex;
        justify-content: flex-start;
      }

      .field.is-grouped > .control {
        flex-shrink: 0;
      }

      .field.is-grouped > .control:not(:last-child) {
        margin-bottom: 0;
        margin-right: 0.75rem;
      }

      .field.is-grouped > .control.is-expanded {
        flex-grow: 1;
        flex-shrink: 1;
      }

      .field.is-grouped.is-grouped-centered {
        justify-content: center;
      }

      .field.is-grouped.is-grouped-right {
        justify-content: flex-end;
      }

      .field.is-grouped.is-grouped-multiline {
        flex-wrap: wrap;
      }

      .field.is-grouped.is-grouped-multiline > .control:last-child, .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {
        margin-bottom: 0.75rem;
      }

      .field.is-grouped.is-grouped-multiline:last-child {
        margin-bottom: -0.75rem;
      }

      .field.is-grouped.is-grouped-multiline:not(:last-child) {
        margin-bottom: 0;
      }

      @media screen and (min-width: 769px), print {
        .field.is-horizontal {
          display: flex;
        }
      }

      .field-label .label {
        font-size: inherit;
      }

      @media screen and (max-width: 768px) {
        .field-label {
          margin-bottom: 0.5rem;
        }
      }

      @media screen and (min-width: 769px), print {
        .field-label {
          flex-basis: 0;
          flex-grow: 1;
          flex-shrink: 0;
          margin-right: 1.5rem;
          text-align: right;
        }

        .field-label.is-small {
          font-size: 0.75rem;
          padding-top: 0.375em;
        }

        .field-label.is-normal {
          padding-top: 0.375em;
        }

        .field-label.is-medium {
          font-size: 1.25rem;
          padding-top: 0.375em;
        }

        .field-label.is-large {
          font-size: 1.5rem;
          padding-top: 0.375em;
        }
      }

      .field-body .field .field {
        margin-bottom: 0;
      }

      @media screen and (min-width: 769px), print {
        .field-body {
          display: flex;
          flex-basis: 0;
          flex-grow: 5;
          flex-shrink: 1;
        }

        .field-body .field {
          margin-bottom: 0;
        }

        .field-body > .field {
          flex-shrink: 1;
        }

        .field-body > .field:not(.is-narrow) {
          flex-grow: 1;
        }

        .field-body > .field:not(:last-child) {
          margin-right: 0.75rem;
        }
      }

      .control {
        box-sizing: border-box;
        clear: both;
        font-size: 1rem;
        position: relative;
        text-align: left;
      }

      .control.has-icons-left .input:focus ~ .icon,
        .control.has-icons-left .select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon,
        .control.has-icons-right .select:focus ~ .icon {
        color: #7a7a7a;
      }

      .control.has-icons-left .input.is-small ~ .icon,
        .control.has-icons-left .select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon,
        .control.has-icons-right .select.is-small ~ .icon {
        font-size: 0.75rem;
      }

      .control.has-icons-left .input.is-medium ~ .icon,
        .control.has-icons-left .select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon,
        .control.has-icons-right .select.is-medium ~ .icon {
        font-size: 1.25rem;
      }

      .control.has-icons-left .input.is-large ~ .icon,
        .control.has-icons-left .select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon,
        .control.has-icons-right .select.is-large ~ .icon {
        font-size: 1.5rem;
      }

      .control.has-icons-left .icon, .control.has-icons-right .icon {
        color: #dbdbdb;
        height: 2.25em;
        pointer-events: none;
        position: absolute;
        top: 0;
        width: 2.25em;
        z-index: 4;
      }

      .control.has-icons-left .input,
        .control.has-icons-left .select select {
        padding-left: 2.25em;
      }

      .control.has-icons-left .icon.is-left {
        left: 0;
      }

      .control.has-icons-right .input,
        .control.has-icons-right .select select {
        padding-right: 2.25em;
      }

      .control.has-icons-right .icon.is-right {
        right: 0;
      }

      .control.is-loading::after {
        position: absolute !important;
        right: 0.625em;
        top: 0.625em;
        z-index: 4;
      }

      .control.is-loading.is-small:after {
        font-size: 0.75rem;
      }

      .control.is-loading.is-medium:after {
        font-size: 1.25rem;
      }

      .control.is-loading.is-large:after {
        font-size: 1.5rem;
      }
    `}
  </style>
);
