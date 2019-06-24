import _ from 'lodash'

const data = thLength => _.range(0, thLength).reduce((obj, index) => {
  const newObj = obj
  newObj[index] = 'loading'

  return newObj
}, {})

const dummyData = thLength => [...Array(20)].map(() => (data(thLength)))

export default dummyData
