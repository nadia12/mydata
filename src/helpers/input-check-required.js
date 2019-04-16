const checkRequired = ({ fields, required }) => {
  const notRequired = !required || required.length === 0 || !Array.isArray(required)

  return !notRequired && required.some(req => (
    (!Array.isArray(req) && (!fields[req] || `${fields[req]}`.trim() === ''))
    || (Array.isArray(req) && req.every(r => !fields[r] || `${fields[r]}`.trim() === ''))))
}

export default checkRequired
