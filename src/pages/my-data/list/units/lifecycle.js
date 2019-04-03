import queryString from 'query-string';


const componentDidMount = (props) => {
  props.setAuthCookie({authCookie: 'SID_IQ'})
  props.setHeaders()
  props.setEntityList()
  props.setRootLocation()
  // props.getPermission()
  // props.get
  // const params = queryString.parse(window.location.search);

  // Object.keys(params).forEach((key) => {
  //   window.localStorage.setItem(key, params[key]);
  // });

  // props.setBreadcrumb()
  // props.setSortProps()

  
  // let jBreadcrumb = [];
  // const location = window.localStorage.getItem('MYDATA.location');
  // const breadcrumb = window.localStorage.getItem('MYDATA.breadcrumb');

  // const locationExist = typeof location !== 'undefined' && !!location;
  // const breadcrumbExist = typeof breadcrumb !== 'undefined' && !!breadcrumb;
  // if (!locationExist) {
  //   window.localStorage.setItem('MYDATA.location', JSON.stringify({ parentId: LOCATIONS.ROOT, name: LOCATIONS.ROOT, entityId: LOCATIONS.ROOT, path: '' }));
  //   window.localStorage.setItem('MYDATA.breadcrumb', JSON.stringify([{ name: LOCATIONS.ROOT, parentId: LOCATIONS.ROOT, label: 'My Data', entityId: LOCATIONS.ROOT, path: '' }]));
  // }
  // if (breadcrumbExist) jBreadcrumb = JSON.parse(breadcrumb);

}

const componentDidUpdate = (props, prevProps) => { 
  const didFetchEntityList = !!props._mydataList.entities && prevProps._mydataList.entities !== props._mydataList.entities;
 
  if (didFetchEntityList) {
    const { entities, sort } = props._mydataList;
    const connectorIds = entities.map((et) => (et.id));
    props.handleSort(sort.activeField);
    props.postConnectorData(connectorIds);
  }

}
  
export default {
  componentDidMount,
  componentDidUpdate
}