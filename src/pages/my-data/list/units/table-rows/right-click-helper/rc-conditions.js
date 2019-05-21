
import {
  DATASOURCE_STATUS,
  ASSET_STATUS,
  LOCATIONS,
  UI_ENTITY_TYPES,
  FILE_TYPES,
} from 'Config/constants'
import { checkPath } from 'Config/lib/url-helper'
import { isInSensorGroup } from 'Config/lib/local-helper'

const assetSuccessStatus = [ASSET_STATUS.SUCCESS, ASSET_STATUS.DONE, ASSET_STATUS.UPDATE_SUCCESS]

const isSelectedAllError = selectedDatasource => {
  const arraySelected = [...Object.values(selectedDatasource)]

  return !arraySelected.findIndex(select => select.status !== DATASOURCE_STATUS.ERROR) > -1
}

export const countSelected = selected => {
  const countByType = {
    datasource: selected.datasource.length,
    asset: selected.asset.length,
    dashboard: selected.dashboard.length,
    connector: selected.connector.length,
    sensor: selected.sensor.length,
    sensorgroup: selected.sensorgroup.length,
    folder: selected.folder.length,
    pipeline: selected.pipeline.length,
    parquet: selected.parquet.length,
  }

  return countByType
}

const hasSelectedItem = count => (
  (count.sensor
  + count.folder
  + count.datasource
  + count.asset
  + count.sensorgroup
  + count.dashboard
  + count.pipeline
  + count.connector) > 0
)

const hasSensorSelected = count => (count.sensor + count.sensorgroup > 0)

const assetsSuccess = selectedAsset => (
  selectedAsset.filter(et => assetSuccessStatus.includes(et.status)).length
)

const datasetsSuccess = selectedAsset => (
  selectedAsset.some(et => !!et && et.uiEntityType === UI_ENTITY_TYPES.DATASET
    && (assetSuccessStatus.includes(et.status)))
)

const selectedFolderIds = (count, selectedFolders) => (count.folder ? selectedFolders.map(fd => fd.id) : [])

export const mappedFolders = (count, selected, entities) => {
  const ids = selectedFolderIds(count, selected.folders)

  const mappeds = entities.length ? entities
    .filter(et => et.uiEntityType === UI_ENTITY_TYPES.FOLDER && !ids.includes(et.id))
    .map(et => ({ label: et.name, value: et.id })) : []

  return mappeds
}

export const mappedSensorGroups = entities => (
  entities.length ? entities
    .filter(et => et.uiEntityType === UI_ENTITY_TYPES.SENSOR_GROUP && et.type === FILE_TYPES.ITEM)
    .map(et => ({ label: et.name, value: et.id })) : []
)

const showInfo = count => {
  const selectOneItem = count.sensor === 1
                        || count.sensorgroup === 1
                        || count.datasource === 1
                        || count.dashboard === 1
                        || count.asset === 1
                        || count.connector === 1
                        || count.pipeline === 1
                        || count.parquet === 1

  const totalOneItem = (count.sensor
                        + count.sensorgroup
                        + count.datasource
                        + count.dashboard
                        + count.asset
                        + count.connector
                        + count.pipeline
                        + count.parquet === 1)

  return selectOneItem && totalOneItem
}

const showMoveToTrash = (count, selectedDatasource) => (
  (count.asset || count.dashboard || count.datasource || count.connector)
  && count.sensor === 0
  && count.folder === 0
  && count.asset === 0
  && count.sensorgroup === 0
  && isSelectedAllError(selectedDatasource)
)

const showSync = count => (
  count.sensor === 0
  && count.sensorgroup === 0
  && count.datasource === 0
  && count.dashboard === 0
  && count.asset === 0
  && count.folder === 0
  && count.connector === 1
  && false // reminder: remove false if sync request has no error from BE.
)

const showAddToSensorGroup = (count, selectedSensors, mSensorGroups) => (
  count.sensor
  && count.sensorgroup === 0
  && count.datasource === 0
  && !!mSensorGroups.length
  && selectedSensors.every(sensor => sensor.type === selectedSensors[0].type)
)

const showRestoreItem = count => hasSelectedItem(count)

const showEditDashboard = count => count.dashboard === 1

const showDetailAssets = (count, selected) => count.asset === 1 && assetsSuccess(selected.asset) === 1
const showAddToPipeline = count => (
  (count.sensor
  + count.folder
  + count.datasource
  + count.asset
  + count.sensorgroup) > 0
)

const showMoveToFolder = (count, mFolders) => hasSelectedItem(count) && !!mFolders.length

const showEditPipeline = (count, selected) => (
  (count.sensor + count.folder + count.datasource + count.asset + count.sensorgroup === 1)
  && datasetsSuccess(selected.asset)
)

const inTrash = checkPath(LOCATIONS.TRASH)
const inSensorGroup = isInSensorGroup()

export const mappedConditions = (
  count, selected, mFolders, mSensorGroups,
) => {
  const mappeds = {
    editDashboard: !inTrash && showEditDashboard(count),
    pipeline: !inTrash && showAddToPipeline(count) && !hasSensorSelected(count),
    pipelineSensor: !inTrash && showAddToPipeline(count) && hasSensorSelected(count),
    createApp: !inTrash && showDetailAssets(count, selected),
    pipelineEdit: !inTrash && showEditPipeline(count, selected),
    info: showInfo(count),
    sync: !inTrash && showSync(count),
    moveToFolder: !inTrash && showMoveToFolder(count, mFolders),
    sensorgroup: !inTrash && !inSensorGroup && showAddToSensorGroup(count, selected.sensor, mSensorGroups),
    asset: showDetailAssets(count, selected),
    delete: !inTrash && showMoveToTrash(count, selected.datasource),
    restore: inTrash && showRestoreItem(count),
  }

  return mappeds
}
