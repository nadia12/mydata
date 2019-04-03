// sort masih dihandle via FE.(14 Feb 19)

const compare = (key, order = 'asc') => {
  return (a, b) => {
    let comparison = 0;

    // not sorting if property not found
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    // --- end --

    const varA = (typeof a[key] === 'string') ? a[key].toLowerCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toLowerCase() : b[key];

    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return order === 'desc' ? (comparison * -1) : comparison;
  };
};

const sortColumn = ({ name, entities, sortType, entityType }) => {
  // dispatch(doLoading(GET_SORTED_ENTITIES, 'getSortedEntitesState'));
  const newSortedEntites = entities.sort(compare(name, sortType));
  return newSortedEntites
  // return dispatch(doSuccess(GET_SORTED_ENTITIES, 'getSortedEntitesState', entityType, newSortedEntites));
};

export default sortColumn