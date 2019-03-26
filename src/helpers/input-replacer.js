const REGEX = {
  dotNumeric: /[^\.0-9]/gi,
  specialAlphaNumeric: /[^ A-Z0-9\/\\\:!@#\$%\^\&*\)\(+=._-]/gi,
  alphaNumeric: /[^ A-Z0-9]/gi,
  numeric: /[^0-9]/gi,
  alpha: /[^a-z]/gi
}

const inputReplacer = ({
  replacer = '', value = '', valueReplace = ''
}) => !!REGEX[replacer] ? value.replace(REGEX[replacer], valueReplace) : value

export default inputReplacer
