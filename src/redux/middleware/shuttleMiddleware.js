import config from '../../config'

export default function shuttleMiddleware() {
  return () => next => action => {
    const { nextAction, shuttle, ...rest } = action

    if (!shuttle) {
      return next(action)
    }

    const { shuttle_url: shuttleUrl = '' } = config

    const apiParams = {
      data: shuttle,
      shuttleUrl
    }
    const nextParams = {
      ...rest,
      promise: api => api[shuttle.method](apiParams),
      // console.log('api shuttle =====>', api)
      nextAction
    }

    // console.log('nextPar ====>', action, nextParams, shuttle.method)

    return next(nextParams)
  }
}
