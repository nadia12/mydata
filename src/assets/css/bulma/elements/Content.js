/* stylelint-disable no-descending-specificity */
import styled, { css } from 'styled-components'
import Vars from '../utilities/vars'
import { block, overflow_touch } from '../utilities/mixins'
import { fromTheme } from '../utilities/functions'

Vars.addDerivedDefault(vars => ({
  'content-heading-color': vars['text-strong'],
  'content-heading-weight': vars['weight-semibold'],
  'content-heading-line-height': 1.125,

  'content-blockquote-background-color': vars['background'],
  'content-blockquote-border-left': `5px solid ${vars['border']}`,
  'content-blockquote-padding': '1.25em 1.5em',

  'content-pre-padding': '1.25em 1.5em',

  'content-table-cell-border': `1px solid ${vars['border']}`,
  'content-table-cell-border-width': '0 0 1px',
  'content-table-cell-padding': '0.5em 0.75em',
  'content-table-cell-heading-color': vars['text-strong'],
  'content-table-head-cell-border-width': '0 0 2px',
  'content-table-head-cell-color': vars['text-strong'],
  'content-table-foot-cell-border-width': '2px 0 0',
  'content-table-foot-cell-color': vars['text-strong'],
}))

const defaultProps = { theme: Vars.getVariables() }

export const ContentStyle = css`
  ${block}
  /* Inline */
  li + li {
    margin-top: 0.25em;
  }
  /* Block */
  p,
  dl,
  ol,
  ul,
  blockquote,
  pre,
  table {
    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${fromTheme('content-heading-color')};
    font-weight: ${fromTheme('content-heading-weight')};
    line-height: ${fromTheme('content-heading-line-height')};
  }
  h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
    &:not(:first-child) {
      margin-top: 1em;
    }
  }
  h2 {
    font-size: 1.75em;
    margin-bottom: 0.5714em;
    &:not(:first-child) {
      margin-top: 1.1428em;
    }
  }
  h3 {
    font-size: 1.5em;
    margin-bottom: 0.6666em;
    &:not(:first-child) {
      margin-top: 1.3333em;
    }
  }
  h4 {
    font-size: 1.25em;
    margin-bottom: 0.8em;
  }
  h5 {
    font-size: 1.125em;
    margin-bottom: 0.8888em;
  }
  h6 {
    font-size: 1em;
    margin-bottom: 1em;
  }
  blockquote {
    background-color: ${fromTheme('content-blockquote-background-color')};
    border-left: ${fromTheme('content-blockquote-border-left')};
    padding: ${fromTheme('content-blockquote-padding')};
  }
  ol {
    list-style: decimal outside;
    margin-left: 2em;
    margin-top: 1em;
  }
  ul {
    list-style: disc outside;
    margin-left: 2em;
    margin-top: 1em;
    ul {
      list-style-type: circle;
      margin-top: 0.5em;
      ul {
        list-style-type: square;
      }
    }
  }
  dd {
    margin-left: 2em;
  }
  figure {
    margin-left: 2em;
    margin-right: 2em;
    text-align: center;
    &:not(:first-child) {
      margin-top: 2em;
    }
    &:not(:last-child) {
      margin-bottom: 2em;
    }
    img {
      display: inline-block;
    }
    figcaption {
      font-style: italic;
    }
  }
  pre {
    ${overflow_touch}
    overflow-x: auto;
    padding: ${fromTheme('content-pre-padding')};
    white-space: pre;
    word-wrap: normal;
  }
  sup,
  sub {
    font-size: 75%;
  }
  table {
    width: 100%;
    td,
    th {
      border: ${fromTheme('content-table-cell-border')};
      border-width: ${fromTheme('content-table-cell-border-width')};
      padding: ${fromTheme('content-table-cell-padding')};
      vertical-align: top;
    }
    th {
      color: ${fromTheme('content-table-cell-heading-color')};
      text-align: left;
    }
    thead {
      td,
      th {
        border-width: ${fromTheme('content-table-head-cell-border-width')};
        color: ${fromTheme('content-table-head-cell-color')};
      }
    }
    tfoot
      td,
      th {
        border-width: ${fromTheme('content-table-foot-cell-border-width')};
        color: ${fromTheme('content-table-foot-cell-color')};
      }
    tbody {
      tr {
        &:last-child {
          td,
          th {
            border-bottom-width: 0;
          }
        }
      }
    }
  }
  /* Sizes */
  &.is-small {
    font-size: ${fromTheme('size-small')};
  }
  &.is-medium {
    font-size: ${fromTheme('size-medium')};
  }
  &.is-large {
    font-size: ${fromTheme('size-large')};
  }
`

const Content = styled.div`${ContentStyle}`
Content.defaultProps = defaultProps

export default Content
