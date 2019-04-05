import moment from 'moment'
import { HOSTNAME } from 'Config/constants'

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
  console.log('getRefinedModel =====>', models)
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
      // status: ASSET_STATUS[model.fit_status] || model.fit_status,
      creatorName: model.username || '',
      id: model.fit_id,
      metricPerformance: model.metric_performance
    };
  });
};
