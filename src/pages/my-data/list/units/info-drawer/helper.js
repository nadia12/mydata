/* eslint-disable prefer-destructuring */
export const selectedByType = selecteds => {
  let item = {}
  const {
    sensorgroup,
    sensor,
    datasource,
    folder,
    asset,
    dashboard,
    connector,
  } = selecteds

  if (sensorgroup.length === 1) item = sensorgroup[0]
  else if (sensor.length === 1) item = sensor[0]
  else if (datasource.length === 1) item = datasource[0]
  else if (folder.length === 1) item = folder[0]
  else if (asset.length === 1) item = asset[0]
  else if (dashboard.length === 1) item = dashboard[0]
  else if (dashboard.length === 1) item = dashboard[0]
  else if (connector.length === 1) item = connector[0]

  return item
}
