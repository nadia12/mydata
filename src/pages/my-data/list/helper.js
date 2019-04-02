import moment from 'moment';
const now = moment(new Date()).format('YYYY-MM-DD');

//Entities dari request harus di setup lagi. dipanggil setelah dispatch getEntityList
export const doRefineEntities = (res, err) => {
  if (!!err || !!!res) return []
  const refinedEntity = res.map((en) => {
    if (!!!en) return
    const end = moment(en.updatedAt).format('YYYY-MM-DD');
    const isToday = now === end;
    const origUpdatedAt = new Date(en.updatedAt);
    const origSize = en.size;
    const size = en.size === 0 ? '-' : en.size;
    const labelType = '';
    const updatedAt = isToday ? `Today ${moment(en.updatedAt).format('HH:mm')}` : moment(en.updatedAt).format('DD MMM YYYY HH:mm');
    const dateModified = moment(en.updatedAt).format('MMM D, YYYY');
    return { ...en, size, updatedAt, dateModified, origSize, origUpdatedAt, labelType };
  })

  return refinedEntity
}
