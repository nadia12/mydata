import Cookies from 'universal-cookie'

const superagent = require('superagent')

const cookies = new Cookies()

export default function ApiCall() {
  const methods = ['get', 'post', 'put', 'patch', 'delete']
  const caller = {}
  const SID_IQ = cookies.get('SID_IQ')

  methods.forEach(method => {
    caller[method] = ({
      payload,
      qs,
      shuttleUrl,
      headers,
    } = {}) => new Promise((resolve, reject) => {
      const request = superagent[method](shuttleUrl)
      request.set('access_token', SID_IQ)

      if (!!headers && typeof headers === 'object') {
        Object.entries(headers).forEach(([key, value]) => {
          request.set(key, value)
        })
      }

      if (qs) {
        request.query(qs)
      }

      if (shuttleUrl.includes('http://iq.volantis.io/api')) {
        request.query(SID_IQ)
      }

      if (payload) {
        request.send({
          ...payload,
        })
      }

      const cbRequest = (err, response = {}) => {
        const { body, text } = response
        if (err) {
          const tempBody = body || err
          const respText = text ? JSON.parse(text) : text
          const rejectValue = {
            ...tempBody,
            ...respText,
          }

          return reject(rejectValue)
        }

        return resolve(body)
      }
      request.end(cbRequest)
    })
  })

  return caller
}
