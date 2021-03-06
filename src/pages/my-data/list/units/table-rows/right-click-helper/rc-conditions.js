/**
 * === RIGHT CLICK CONDITIONS OF SHOWING MENUS ===
 * EXPORTED function:
 * - mappedConditions() ==> you can see condition list in here.
 * - mappedFolders(),
 * - mappedSensorGroups(),
 * - countSelected()
 * Called all on functions on file rc-menus.js for mapping
 */

import {
  DATASOURCE_STATUS,
  ASSET_STATUS,
  LOCATIONS,
  UI_ENTITY_TYPES,
  FILE_TYPES,
} from 'Config/constants'
import { checkPath } from 'Config/lib/url-helper'
import { isInSensorGroup } from 'Config/lib/local-helper'

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
  + count.connector
  + count.parquet) > 0
)

const hasSensorSelected = count => (count.sensor + count.sensorgroup > 0)

const assetSuccessStatus = [ASSET_STATUS.SUCCESS, ASSET_STATUS.DONE, ASSET_STATUS.UPDATE_SUCCESS]
const datasourceSuccessStatus = [
  DATASOURCE_STATUS.SYNCRONIZING,
  DATASOURCE_STATUS.SUCCESS,
  DATASOURCE_STATUS.ERROR,
  DATASOURCE_STATUS.SYNC_FAILED,
  DATASOURCE_STATUS.SYNC_SUCCESS,
]

const assetsSuccess = selectedAsset => (
  selectedAsset.filter(et => assetSuccessStatus.includes(et.status)).length
)

const selectedFolderIds = selectedFolders => selectedFolders.map(fd => fd.id)

export const mappedFolders = (selected, allFolders) => (
  allFolders.length ? allFolders
    .filter(et => !selectedFolderIds(selected.folder).includes(et.id))
    .map(et => ({ label: et.name, value: et.id })) : []
)

export const mappedSensorGroups = entities => (
  entities
    .filter(et => et.uiEntityType === UI_ENTITY_TYPES.SENSOR_GROUP && et.type === FILE_TYPES.ITEM)
    .map(et => ({ label: et.name, value: et.id }))
)

const totalOneItem = count => (count.sensor
  + count.folder
  + count.sensorgroup
  + count.datasource
  + count.dashboard
  + count.asset
  + count.connector
  + count.pipeline
  + count.parquet === 1)

const showInfo = count => {
  const selectOneItem = count.sensor === 1
                        || count.sensorgroup === 1
                        || count.datasource === 1
                        || count.dashboard === 1
                        || count.asset === 1
                        || count.connector === 1
                        || count.pipeline === 1
                        || count.parquet === 1
                        || count.folder === 1

  return selectOneItem && totalOneItem(count)
}

const arraySelected = selected => [...Object.values(selected).flatMap(select => select)]

const showMoveToTrash = count => (
  hasSelectedItem(count)
)

const showSync = count => (
  count.sensor === 0
  && count.sensorgroup === 0
  && count.datasource === 0
  && count.dashboard === 0
  && count.asset === 0
  && count.folder === 0
  && count.connector === 1
  // && false // reminder: remove false if sync request has no error from BE.
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
  + count.sensorgroup
  + count.parquet) > 0
)

const showMoveToFolder = (count, mFolders) => hasSelectedItem(count) && !!mFolders.length

const showEditPipeline = count => count.pipeline === 1

const sqlTypes = [UI_ENTITY_TYPES.SQL_DATABASE, UI_ENTITY_TYPES.SQL_TABLE]
const sensorTypes = [UI_ENTITY_TYPES.SENSOR, UI_ENTITY_TYPES.SENSOR_GROUP]
const modelTypes = [UI_ENTITY_TYPES.MODEL]
const datasetTypes = [UI_ENTITY_TYPES.DATASET]

const includesTypes = uiEntityType => (
  [sqlTypes, sensorTypes, modelTypes, datasetTypes].flat(2).includes(uiEntityType)
)

const includesTypeStatus = selected => (
  arraySelected(selected).some(et => !!et
                                        && includesTypes(et.uiEntityType)
                                        && assetSuccessStatus.includes(et.status))
)

const showCreateApp = (count, selected) => (
  // (count.asset === 1 || count.datasource === 1 || count.folder === 1)
  (count.asset === 1 || count.datasource === 1 || count.folder === 1)
  && !!includesTypeStatus(selected)
)

const showPreview = count => {
  const selectOneDatasource = count.datasource === 1

  return selectOneDatasource && totalOneItem(count)
}

const includesConnectorStatus = selected => datasourceSuccessStatus.includes(arraySelected(selected)[0].status)
const includesTypeConnector = selected => arraySelected(selected)[0].uiEntityType === UI_ENTITY_TYPES.CONNECTOR

const showEditConfiguration = (count, selected) => (
  (count.connector === 1) && includesTypeConnector(selected) && includesConnectorStatus(selected)
)

export const mappedConditions = (
  count, selected, mFolders, mSensorGroups,
) => {
  const inTrash = checkPath(LOCATIONS.TRASH)
  const inSensorGroup = isInSensorGroup()

  const mappeds = {
    editDashboard: !inTrash && showEditDashboard(count),
    pipeline: !inTrash && showAddToPipeline(count) && !hasSensorSelected(count),
    pipelineSensor: !inTrash && showAddToPipeline(count) && hasSensorSelected(count),
    createApp: !inTrash && showCreateApp(count, selected),
    pipelineEdit: !inTrash && showEditPipeline(count),
    info: showInfo(count),
    sync: !inTrash && showSync(count),
    moveToFolder: !inTrash && showMoveToFolder(count, mFolders),
    sensorgroup: !inTrash && !inSensorGroup && showAddToSensorGroup(count, selected.sensor, mSensorGroups),
    asset: showDetailAssets(count, selected),
    moveToTrash: !inTrash && showMoveToTrash(count, selected),
    delete: inTrash && showRestoreItem(count),
    restore: inTrash && showRestoreItem(count),
    editConfiguration: !inTrash && showEditConfiguration(count, selected),
    preview: !inTrash && showPreview(count),
  }

  return mappeds
}
