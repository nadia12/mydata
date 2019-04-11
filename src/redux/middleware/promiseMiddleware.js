export default function promiseMiddleware(api) {
  return () => next => action => {
    const {
      nextAction,
      promise,
      type,
      authCookie,
      ...rest
    } = action

    if (!promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = type

    next({ ...rest, type: REQUEST })

    function success(res) {
      next({ ...rest, payload: res, type: SUCCESS })
      if (nextAction) {
        nextAction(res, null)
      }
    }

    function error(err) {
      next({ ...rest, payload: err, type: FAILURE })
      if (nextAction) {
        nextAction(null, err)
      }
    }

    return promise(api(authCookie))
      .then(success, error)
      .catch(error)
  }
}
