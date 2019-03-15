import config from '../../config'

export default function shuttleMiddleware() {
  return () => next => action => {
    const {
      nextAction, shuttle, authCookie, ...rest
    } = action
    console.log('ini shuttle', action)

    if (!shuttle || shuttle && !shuttle.method) {
      return next(action)
    }

    const {
      path = '',
      payload = null,
      qs = null,
      endpoint = null
    } = shuttle

    const { host = {} } = config


    const shuttleUrl = `${host[endpoint || 'root']}${path}`

    const apiParams = {
      qs,
      payload,
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
