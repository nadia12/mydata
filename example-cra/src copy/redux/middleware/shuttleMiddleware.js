import config from '../../config'

export default function shuttleMiddleware() {
  return () => next => action => {
    const {
      nextAction, shuttle, ...rest
    } = action

    if (!shuttle) {
      return next(action)
    }

    const {
      path = '',
      payloads: payload = null,
      qs = null,
      endpoint = null,
      method,
    } = shuttle

    const { host = {} } = config
    const shuttleUrl = `${host[endpoint || 'root']}${path}`

    const apiParams = {
      qs,
      payload,
      shuttleUrl,
    }
    const nextParams = {
      ...rest,
      promise: api => api[method.toLowerCase()](apiParams),
      nextAction,
    }

    return next(nextParams)
  }
}
