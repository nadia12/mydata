export const selectedByType = selecteds => {
  let item = {}
  const {
    sensorgroup,
    sensor,
    datasource,
    folder,
    asset,
    dashboard,
  } = selecteds

  if (sensorgroup.length === 1) item = sensorgroup[0]
  if (sensor.length === 1) item = sensor[0]
  if (datasource.length === 1) item = datasource[0]
  if (folder.length === 1) item = folder[0]
  if (asset.length === 1) item = asset[0]
  if (dashboard.length === 1) item = dashboard[0]

  return item
}
