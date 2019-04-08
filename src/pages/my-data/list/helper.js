import moment from 'moment'
import { HOSTNAME } from 'Config/constants'
import { ASSET_STATUS } from './units/table-rows/constant.js'

const now = moment(new Date()).format('YYYY-MM-DD')

// Entities dari request harus di setup lagi. dipanggil setelah dispatch getEntityList

export const doRefineEntities = (res, err) => {
  let refinedEntity = []
  const errExist = !!err
  if (!!res && !errExist) {
    refinedEntity = [...res]
    if (refinedEntity.length > 0) {
      refinedEntity = refinedEntity.map(en => {
        const end = moment(en.updatedAt).format('YYYY-MM-DD')
        const isToday = now === end
        const origUpdatedAt = new Date(en.updatedAt)
        const origSize = en.size
        const size = en.size === 0 ? '-' : en.size
        const labelType = ''
        const updatedAt = isToday ? `Today ${moment(en.updatedAt).format('HH:mm')}` : moment(en.updatedAt).format('DD MMM YYYY HH:mm')
        const dateModified = moment(en.updatedAt).format('MMM D, YYYY')

        return {
          ...en,
          size,
          updatedAt,
          dateModified,
          origSize,
          origUpdatedAt,
          labelType
        }
      })
    }
  }
  return refinedEntity
}


export const doRefinedModel = (models) => {
  const noData = models.length === 0;
  return noData ? [] : models.map((model) => {
    const endPoints = [];
    if (!!model.endpoints) {
      if (!!model.endpoints.async) {
        endPoints.push({ url: model.endpoints.async, type: 'Async' });
        endPoints.push({ url: `${HOSTNAME}/v1/predict/async/model/result/{requestId}`, type: 'Async Result' });
      }
      if (!!model.endpoints.sync) endPoints.push({ url: model.endpoints.sync, type: 'Sync' });
    }

    let updatedAt = '-';
    let createdAt = '-';
    let origUpdatedAt = '';

    if (!!model.date) {
      const end = moment(model.date).format('YYYY-MM-DD');
      const isToday = now === end;
      origUpdatedAt = new Date(model.date);
      updatedAt = isToday ? `Today ${moment(model.date).format('HH:mm')}` : moment(model.date).format('DD MMM YYYY HH:mm');
      createdAt = new Date(model.date).toLocaleDateString('en-EN', { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' });
    }
    return {
      name: model.pipeline_group_name || '',
      endPoints,
      type: 'Model',
      size: model.model_size || '-',
      origSize: model.model_size,
      updatedAt,
      origUpdatedAt,
      createdAt,
      status: ASSET_STATUS[model.fit_status] || model.fit_status,
      creatorName: model.username || '',
      id: model.fit_id,
      metricPerformance: model.metric_performance
    };
  });
};

export const doRefinedDataset = (datasets, pipelineList) => {
  console.log('masuk sini doRefinedDataset ===> ', datasets, pipelineList)
  const hasData = !!datasets && datasets.length > 0;
  let creatorName = '';

  return !hasData ? [] : datasets.map((dataset) => {
    const pipeline = ((dataset.latestDataFlow || {}).dataIntegrationMeta || {}).pipeline || {};
    const dataServingMeta = ((dataset.latestDataFlow || {}).dataServingMeta || {});
    const scheduledJob = ((dataset.latestDataFlow || {}).scheduledJob || {});
    const parsePipeline = !!pipeline && `${pipeline}`.trim() !== '' && typeof pipeline !== 'object' ? JSON.parse(pipeline) : pipeline;
    const currName = parsePipeline.name || '';
    const createdAt = parsePipeline.createdAt || '';
    const lastRun = scheduledJob.lastRun;
    const endPoints = [];
    if (!!dataServingMeta.asyncRestApiConfig) {
      const { downstreamPath } = dataServingMeta.asyncRestApiConfig;
      endPoints.push({ url: `${HOSTNAME}${downstreamPath}`, type: 'Async' });
    }

    if (!!dataServingMeta.syncRestApiConfig) {
      const { downstreamPath } = dataset.latestDataFlow.dataServingMeta.syncRestApiConfig;
      endPoints.push({ url: `${HOSTNAME}${downstreamPath}`, type: 'Sync' });
    }

    endPoints.push({ url: `${HOSTNAME}/v1/query/async/dataset/result/{request_id}`, type: 'Async result' });
    let updatedAt = '-';
    let origUpdatedAt = '';
    if (typeof lastRun !== 'undefined' && lastRun !== null) {
      const end = moment(lastRun).format('YYYY-MM-DD');
      const isToday = now === end;
      origUpdatedAt = new Date(lastRun);
      updatedAt = isToday ? `Today ${moment(lastRun).format('HH:mm')}` : moment(lastRun).format('DD MMM YYYY HH:mm');
    }
    if (typeof pipelineList.data !== 'undefined' && pipelineList.data.length > 0) {
      const currPipeline = pipelineList.data.find((pipe) => pipe.id === dataset.datasetId);
      if (currPipeline && typeof currPipeline.creator_name !== 'undefined') creatorName = currPipeline.creator_name;
    }
    const data = {
      id: dataset.datasetId,
      endPoints,
      name: currName || '',
      type: 'Dataset',
      size: '-',
      origSize: dataset.size_data_input,
      createdAt: typeof createdAt !== 'undefined' && createdAt !== null ? new Date(createdAt).toLocaleDateString('en-EN', { hour: 'numeric', minute: 'numeric', month: 'long', day: 'numeric' }) : '-',
      updatedAt,
      origUpdatedAt,
      creatorName,
      status: ASSET_STATUS[scheduledJob.lastRunStatus] || scheduledJob.lastRunStatus || ''
    };
    return data;
  });
};

