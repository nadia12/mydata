import queryString from 'query-string';
import { isInSystemFolder, jLocation } from '../local-helper';


const componentDidMount = (props) => {
  props.setAuthCookie({authCookie: 'SID_IQ'})
  props.setRootLocation() // set default if location not exist
  props.setHeaders()
  
  if(isInSystemFolder) props.handleChangeLocation(jLocation.name)
  else props.setEntityList()
}

const componentDidUpdate = (props, prevProps) => { 
}
  
export default {
  componentDidMount,
  componentDidUpdate
}