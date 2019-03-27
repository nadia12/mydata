import config from '../../config'

export default function shuttleMiddleware() {
  return () => next => action => {
    const {
      nextAction, shuttle, authCookie, endpoint, ...rest
    } = action

    if (!shuttle || shuttle && !shuttle.method) {
      return next(action)
    }

    const {
      path: path = '',
      payloads: payload = null,
      qs: qs = null,
    } = shuttle

    const { host: host = {} } = config

    const shuttleUrl = `${host[endpoint || 'root']}${path}`

    const apiParams = {
      qs,
      payload,
      shuttleUrl
    }
    console.log("shuttle 11==>", shuttle)
    console.log("apiParams 11==>", apiParams)
    const nextParams = {
      ...rest,
      authCookie,
      promise: api => api[`${shuttle.method}`](apiParams),
      nextAction
    }
    return next(nextParams)
  }
}
