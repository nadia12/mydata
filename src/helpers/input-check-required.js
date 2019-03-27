const checkRequired = (fields, required) => {
  const notRequired = typeof required === 'undefined' || required === null || required.length === 0 || !Array.isArray(required)
  return !notRequired && required.some((req) => (
    (!Array.isArray(req) && (typeof fields[req] === 'undefined' || `${fields[req]}`.trim() === ''))
    || (Array.isArray(req) && req.every((r) => typeof fields[r] === 'undefined' || `${fields[r]}`.trim() === ''))))
}

export default checkRequired
