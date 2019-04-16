import Cookies from 'universal-cookie'
import superagent from 'superagent'

import Method from 'Config/constants/request-method'

const cookies = new Cookies()

export default function ApiCall(cookie) {
  const methods = Object.keys(Method)
  const caller = {}
  const SID_IQ = cookies.get(cookie)

  methods.forEach(method => {
    caller[method] = ({
      payload,
      qs,
      shuttleUrl,
      headers = {}
    } = {}) => new Promise((resolve, reject) => {
      const request = superagent[method](shuttleUrl)
      request.set('access_token', SID_IQ)
      if (!!headers && typeof headers === 'object') {
        Object.entries((headers)).forEach(([key, value]) => {
          request.set(key, value)
        })
      }

      if (qs) {
        request.query(qs)
      }

      if (!!payload && Array.isArray(payload)) {
        request.send(payload)
      }

      if (payload) {
        request.send({
          ...payload
        })
      }

      const cbRequest = (err, response = {}) => {
        const { body, text } = response
        if (err) {
          const tempBody = body || err
          const respText = text ? JSON.parse(text) : text
          const rejectValue = {
            ...tempBody,
            ...respText
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
