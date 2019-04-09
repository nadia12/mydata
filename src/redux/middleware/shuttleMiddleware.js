import config from '../../config'

export default function shuttleMiddleware() {
  return () => next => action => {
    const {
      nextAction, shuttle, authCookie, endpoint, ...rest
    } = action

    if (!shuttle || (shuttle && !shuttle.method)) {
      return next(action)
    }

    const {
      headers: headers = {},
      path: path = '',
      payloads: payload = null,
      qs: qs = null
    } = shuttle

    const { host: host = {} } = config
    const shuttleUrl = `${host[endpoint || 'root']}${path}`

    const apiParams = {
      qs,
      payload,
      headers,
      shuttleUrl
    }

    const nextParams = {
      ...rest,
      authCookie,
      promise: api => api[`${shuttle.method}`](apiParams),
      nextAction
    }

    return next(nextParams)
  }
}
