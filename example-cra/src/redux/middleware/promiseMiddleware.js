export default function promiseMiddleware(api) {
  return () => next => action => {
    const {
      nextAction,
      promise,
      type,
      ...rest
    } = action

    if (!promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = type

    let nextPayload = { ...rest, type: REQUEST }
    
    if (REQUEST.startsWith('XPLORER_')) {
      nextPayload = { type: REQUEST, payload: { ...rest } }
    }
    // next({ type: REQUEST, payload: { ...rest }  })

    // function success(res) {
    //   next({ payload: { ...res, ...rest }, type: SUCCESS })
    //   if (nextAction) {
    //     nextAction(res, null)
    //   }
    // }

    next(nextPayload)

    function success(res) {
      let nextPayloadSuccess = { ...rest, payload: res, type: SUCCESS }
      if (REQUEST.startsWith('XPLORER_')) {
        nextPayloadSuccess = { payload: { ...res, ...rest }, type: SUCCESS }
      }
      next(nextPayloadSuccess)
      if (nextAction) {
        nextAction(res, null)
      }
    }

    function error(err) {
      next({ payload: { ...err, ...rest }, type: FAILURE })
      if (nextAction) {
        nextAction(null, err)
      }
    }

    return promise(api())
      .then(success, error)
      .catch(error)
  }
}
