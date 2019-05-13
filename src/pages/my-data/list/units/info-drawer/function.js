import { getAccuracyDetail, setValue } from 'Pages/my-data/list/reducer'
import { MODEL_ACCURACY } from './constant'

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

      if (metricPerformance) {
        const [key, value] = Object.entries(metricPerformance)[0]
        const valueType = MODEL_ACCURACY[key]
        const format = (valueType === 'percentage') ? '%' : ''
        const formattedValue = `${(+value).toFixed(2)}${format}`

        return dispatch(setValue('formattedValue', formattedValue))
      }
    }
  }))
}
