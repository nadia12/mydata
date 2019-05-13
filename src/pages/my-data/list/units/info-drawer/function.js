import { getAccuracyDetail, setValue } from 'Pages/my-data/list/reducer'
import { MODEL_ACCURACY } from './constant'

export const refinedMetricPerformance = metricPerformance => {
  let key = ''
  let value = 0
  let accuracyContent = ''
  let isPercentage = false
  let renderAccuracy = false
  let accuracyValue = 0
  let rotateNum = 0

  if (!!metricPerformance) {
    key = Object.keys(metricPerformance)[0] || ''
    value = Object.values(metricPerformance)[0] || 0
    accuracyContent = MODEL_ACCURACY[key]
    isPercentage = !!accuracyContent && accuracyContent.type === 'percentage'
  }

  if (!!accuracyContent) {
    renderAccuracy = true
    accuracyValue = ((100 * +value - accuracyContent.bottom_limit) / (accuracyContent.top_limit - accuracyContent.bottom_limit)).toFixed(2)
    rotateNum = Math.ceil(accuracyValue / 100 * 180)
  }

  return {
    mpKey: key,
    mpValue: value,
    renderAccuracy,
    accuracyValue,
    rotateNum,
    isPercentage,
  }
}

export const getInfoAccuracy = assetId => (dispatch, getState) => {
  const {
    volantisMyData: { _mydataList: { headers } },
    volantisConstant: {
      cookie: { auth: authCookie },
      service: { endpoint: { emmaDirectory } },
    },
  } = getState()

  const pathAccuracyDetail = `${emmaDirectory}/${headers['V-DRIVEID']}/entity/${assetId}`

  dispatch(getAccuracyDetail(pathAccuracyDetail, authCookie, (res, err) => {
    if (!err) {
      const { metricPerformance } = JSON.parse(res.serviceData)

      if (!!metricPerformance) {
        const refined = refinedMetricPerformance(metricPerformance)
        dispatch(setValue('assetDetail', { show: true, mp: refined }))
      }
    }
  }))
}
