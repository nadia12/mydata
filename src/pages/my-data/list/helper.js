import moment from 'moment'
import { HOSTNAME, ASSET_STATUS, ENTITY_TYPE_LABEL } from 'Config/constants'
import filesize from 'filesize'
import { SELECTED_TYPES } from './constant'

const now = moment(new Date()).format('YYYY-MM-DD')

// Entities dari request harus di setup lagi. dipanggil setelah dispatch getEntityList
export const doRefineEntities = (res, err) => {
  let refinedEntity = []
  const errExist = !!err
  if (!!res && !errExist) {
    refinedEntity = [...res]
    if (refinedEntity.length > 0) {
      refinedEntity = refinedEntity.map((en, idx)=> {
        const end = moment(en.updatedAt).format('YYYY-MM-DD')
        const isToday = now === end
        const origUpdatedAt = new Date(en.updatedAt)
        const origSize = en.size
        const size = en.size === 0 ? '-' : filesize(en.size)
        const labelType = ENTITY_TYPE_LABEL[en.entityType] || 'ITEM'
        const updatedAt = isToday ? `Today ${moment(en.updatedAt).format('HH:mm')}` : moment(en.updatedAt).format('DD MMM YYYY HH:mm')
        const dateModified = moment(en.updatedAt).format('MMM D, YYYY')
        const selectedType = SELECTED_TYPES(en.entityType)

        return {
          ...en,
          idx,
          size,
          updatedAt,
          dateModified,
          origSize,
          origUpdatedAt,
          labelType,
          selectedType,
        }
      })
    }
  }

  return refinedEntity
}

// Perlu dihapus setelah selesai migrasi Libra v2 fix
export const doRefinedModel = (res, err) => {
  let refinedModel = []
  const errExist = !!err
  let updatedAt = '-'
  let createdAt = '-'
  let origUpdatedAt = ''

  if (!!res && !errExist) {
    const modelEndpoints = res
      .filter(model => !!model.endpoints)
      .map(exs => {
        if (exs.endpoints.async) {
          const endpoint = [{ url: `${HOSTNAME}/v1/predict/async/model/result/{requestId}`, type: 'Async Result' }]
          endpoint.push({ url: exs.endpoints.async, type: 'Async' })

          return { ...endpoint }
        }

        return { url: exs.endpoints.sync, type: 'Sync' }
      })

    refinedModel = res
      .map(exs => {
        if (exs.date) {
          const end = moment(exs.date).format('YYYY-MM-DD')
          const isToday = now === end
          origUpdatedAt = new Date(exs.date)
          updatedAt = isToday ? `Today ${moment(exs.date).format('HH:mm')}` : moment(exs.date).format('DD MMM YYYY HH:mm')
          createdAt = new Date(exs.date).toLocaleDateString('en-EN',
            {
              hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric',
            })
        }

        return {
          name: exs.pipeline_group_name || '',
          modelEndpoints,
          type: 'Model',
          size: exs.model_size || '-',
          origSize: exs.model_size,
          updatedAt,
          origUpdatedAt,
          createdAt,
          status: ASSET_STATUS[exs.fit_status] || exs.fit_status,
          creatorName: exs.username || '',
          id: exs.fit_id,
          metricPerformance: exs.metric_performance,
        }
      })
  }

  return refinedModel
}

export const doRefinedDataset = (datasets, pipelineList) => {
  let hasData = []
  let creatorName = ''

  if (datasets) {
    hasData = datasets
      .map(dataset => {
        const pipeline = ((dataset.latestDataFlow || {}).dataIntegrationMeta || {}).pipeline || {}
        const dataServingMeta = ((dataset.latestDataFlow || {}).dataServingMeta || {})
        const scheduledJob = ((dataset.latestDataFlow || {}).scheduledJob || {})
        const parsePipeline = !!pipeline && `${pipeline}`.trim() !== '' && typeof pipeline !== 'object' ? JSON.parse(pipeline) : pipeline
        const currName = parsePipeline.name || ''
        const createdAt = parsePipeline.createdAt || ''
        const { lastRun } = scheduledJob
        const endPoints = []
        if (dataServingMeta.asyncRestApiConfig) {
          const { downstreamPath } = dataServingMeta.asyncRestApiConfig
          endPoints.push({ url: `${HOSTNAME}${downstreamPath}`, type: 'Async' })
        }

        if (dataServingMeta.syncRestApiConfig) {
          const { downstreamPath } = dataset.latestDataFlow.dataServingMeta.syncRestApiConfig
          endPoints.push({ url: `${HOSTNAME}${downstreamPath}`, type: 'Sync' })
        }

        endPoints.push({ url: `${HOSTNAME}/v1/query/async/dataset/result/{request_id}`, type: 'Async result' })
        let updatedAt = '-'
        let origUpdatedAt = ''
        if (typeof lastRun !== 'undefined' && lastRun !== null) {
          const end = moment(lastRun).format('YYYY-MM-DD')
          const isToday = now === end
          origUpdatedAt = new Date(lastRun)
          updatedAt = isToday ? `Today ${moment(lastRun).format('HH:mm')}` : moment(lastRun).format('DD MMM YYYY HH:mm')
        }
        if (typeof pipelineList.data !== 'undefined' && pipelineList.data.length > 0) {
          const currPipeline = pipelineList.data.find(pipe => pipe.id === dataset.datasetId)
          if (currPipeline && typeof currPipeline.creator_name !== 'undefined') creatorName = currPipeline.creator_name
        }
        const data = {
          id: dataset.datasetId,
          endPoints,
          name: currName || '',
          type: 'Dataset',
          size: '-',
          origSize: dataset.size_data_input,
          createdAt: typeof createdAt !== 'undefined' && createdAt !== null ? new Date(createdAt).toLocaleDateString('en-EN', {
            hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric',
          }) : '-',
          updatedAt,
          origUpdatedAt,
          creatorName,
          status: ASSET_STATUS[scheduledJob.lastRunStatus] || scheduledJob.lastRunStatus || '',
        }

        return data
      })
  }

  return hasData
}
