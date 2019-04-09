import Cookies from 'universal-cookie'
import { MODEL_ACCURACY } from './constant'

export const refinedMetricPerformance = () => (dispatch, getState) => {
  const { metricPerformance } = getState()._mydataList.selected.asset[0]

  let key = ''
  let value = 0
  let accuracyContent = {}
  let isPercentage = false
  let tooltipExt = ''
  let renderAccuracy = false
  let accuracyValue = 0
  let rotateNum = 0

  if (!!metricPerformance) {
    key = Object.keys(metricPerformance)[0] || ''
    value = Object.values(metricPerformance)[0] || 0
    accuracyContent = MODEL_ACCURACY[key]
    isPercentage = !!accuracyContent && accuracyContent.type === 'percentage'

    if (!!accuracyContent) {
      renderAccuracy = true
      accuracyValue = ((100 * +value - accuracyContent.bottom_limit) / (accuracyContent.top_limit - accuracyContent.bottom_limit)).toFixed(2)
      rotateNum = Math.ceil(accuracyValue / 100 * 180)

      // tooltipExt = (
      //   <span className="grey-color">
      //     {`Minimum Value: ${accuracyContent.bottom_limit}`}
      //     <br />
      //     {`Maximum Value: ${accuracyContent.top_limit}`}
      //   </span>
      // );
    }
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

export const getAccessToken = () => (dispatch, getState) => {
  const { authCookie } = getState()._mydataList
  const cookies = new Cookies()

  return cookies.get(authCookie)
}
