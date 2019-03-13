import { hsl } from 'polished'
/* eslint-disable dot-notation, quote-props, key-spacing */

export default Object.freeze({
  // Colors

  'black':        hsl(0, 0, 0.04),
  'black-bis':    hsl(0, 0, 0.07),
  'black-ter':    hsl(0, 0, 0.14),

  'grey-darker':  hsl(0, 0, 0.21),
  'grey-dark':    hsl(0, 0, 0.29),
  'grey':         hsl(0, 0, 0.48),
  'grey-light':   hsl(0, 0, 0.71),
  'grey-lighter': hsl(0, 0, 0.86),

  'white-ter':    hsl(0, 0, 0.96),
  'white-bis':    hsl(0, 0, 0.98),
  'white':        hsl(0, 0, 1),

  'orange':       hsl(14, 1, 0.53),
  'yellow':       hsl(48, 1, 0.67),
  'green':        hsl(141, 0.71, 0.48),
  'turquoise':    hsl(171, 1, 0.41),
  'cyan':         hsl(204, 0.86, 0.53),
  'blue':         hsl(217, 0.71, 0.53),
  'purple':       hsl(271, 1, 0.71),
  'red':          hsl(348, 1, 0.61),

  // Typography

  'family-sans-serif': 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  'family-monospace': 'monospace',
  'render-mode': 'optimizeLegibility',

  'size-1': '3rem',
  'size-2': '2.5rem',
  'size-3': '2rem',
  'size-4': '1.5rem',
  'size-5': '1.25rem',
  'size-6': '1rem',
  'size-7': '0.75rem',

  'weight-light':     '300',
  'weight-normal':    '400',
  'weight-medium':    '500',
  'weight-semibold':  '600',
  'weight-bold':      '700',

  // Responsiveness

  // The container horizontal gap, which acts as the offset for breakpoints
  'gap': '64px',
  // 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
  'tablet': '769px',

  'widescreen-enabled': true,

  'fullhd-enabled': true,

  // Miscellaneous

  'easing': 'ease-out',
  'radius-small': '2px',
  'radius': '4px',
  'radius-large': '6px',
  'radius-rounded': '290486px',
  'speed': '86ms',

  // Flags

  'variable-columns': true,

  // Control
  'control-border-width': '1px',

  // Generic
  'body-size': '16px ',
  'body-rendering': 'optimizeLegibility',
  'body-line-height': '1.5',

  'code-padding': '0.25em 0.5em 0.25em',
  'code-weight': 'normal',
  'code-size': '0.875em',

  'hr-height': '2px',
  'hr-margin': '1.5rem 0',
})
