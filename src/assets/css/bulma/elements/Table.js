/* stylelint-disable no-descending-specificity */
import styled, { css } from 'styled-components'
import Vars from '../utilities/vars'
import { block, overflow_touch } from '../utilities/mixins'
import { fromTheme } from '../utilities/functions'

Vars.addDerivedDefault(vars => ({
  'table-color': vars['grey-darker'],
  'table-background-color': vars['white'],

  'table-cell-border': `1px solid ${vars['grey-lighter']}`,
  'table-cell-border-width': '0 0 1px',
  'table-cell-padding': '0.5em 0.75em',
  'table-cell-heading-color': vars['text-strong'],

  'table-head-cell-border-width': '0 0 2px',
  'table-head-cell-color': vars['text-strong'],
  'table-foot-cell-border-width': '2px 0 0',
  'table-foot-cell-color': vars['text-strong'],

  'table-row-hover-background-color': vars['white-bis'],

  'table-row-active-background-color': vars['primary'],
  'table-row-active-color': vars['primary-invert'],

  'table-striped-row-even-background-color': vars['white-bis'],
  'table-striped-row-even-hover-background-color': vars['white-ter'],
}))

const colorClasses = props => Object.entries(props.theme.colors).reduce((acc, [name, [color, color_invert]]) => css`
  ${acc}
  &.is-${name} {
    background-color: ${color};
    border-color: ${color};
    color: ${color_invert};
  }
`, '')

const Table = styled.table`
  ${block}
  background-color: ${fromTheme('table-background-color')};
  color: ${fromTheme('table-color')};
  td,
  th {
    border: ${fromTheme('table-cell-border')};
    border-width: ${fromTheme('table-cell-border-width')};
    padding: ${fromTheme('table-cell-padding')};
    vertical-align: top;
    /* Colors */
    ${colorClasses}
    /* Modifiers */
    &.is-narrow {
      white-space: nowrap;
      width: 1%;
    }
    &.is-selected {
      background-color: ${fromTheme('table-row-active-background-color')};
      color: ${fromTheme('table-row-active-color')};
      a,
      strong {
        color: currentColor;
      }
    }
  }
  th {
    color: ${fromTheme('table-cell-heading-color')};
    text-align: left;
  }
  tr {
    &.is-selected {
      background-color: ${fromTheme('table-row-active-background-color')};
      color: ${fromTheme('table-row-active-color')};
      a,
      strong {
        color: currentColor;
      }
      td,
      th {
        border-color: ${fromTheme('table-row-active-color')};
        color: currentColor;
      }
    }
  }
  thead {
    td,
    th {
      border-width: ${fromTheme('table-head-cell-border-width')};
      color: ${fromTheme('table-head-cell-color')};
    }
  }
  tfoot {
    td,
    th {
      border-width: ${fromTheme('table-foot-cell-border-width')};
      color: ${fromTheme('table-foot-cell-color')};
    }
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
  /* Modifiers */
  &.is-bordered {
    td,
    th {
      border-width: 1px;
    }
    tr {
      &:last-child {
        td,
        th {
          border-bottom-width: 1px;
        }
      }
    }
  }
  &.is-fullwidth {
    width: 100%;
  }
  &.is-hoverable {
    tbody {
      tr:not(.is-selected) {
        &:hover {
          background-color: ${fromTheme('table-row-hover-background-color')};
        }
      }
    }
    &.is-striped {
      tbody {
        tr:not(.is-selected) {
          &:hover {
            background-color: ${fromTheme('table-striped-row-even-hover-background-color')};
          }
        }
      }
    }
  }
  &.is-narrow {
    td,
    th {
      padding: 0.25em 0.5em;
    }
  }
  &.is-striped {
    tbody {
      tr:not(.is-selected) {
        &:nth-child(even) {
          background-color: ${fromTheme('table-striped-row-even-background-color')};
        }
      }
    }
  }
`
Table.defaultProps = { theme: Vars.getVariables() }

export const TableContainer = styled.div`
  ${block}
  ${overflow_touch}
  overflow: auto;
  overflow-y: hidden;
  max-width: 100%;
`

export default Table
