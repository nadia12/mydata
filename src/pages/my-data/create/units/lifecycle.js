import { currentUser } from 'Helpers/context';

function componentDidMount(props) {
  const user = currentUser();
  const headers = {
    'V-DRIVEID': user.owner_id,
    'V-CREATORNAME': user.name,
    'V-CREATORID': user.id,
    'V-PARENTID': locationExist ? JSON.parse(location).entityId : LOCATIONS.ROOT
  };
  const type = (window.location.search.split('?')[1] || `type=${CREATE_TYPE.type}`).split('=')[1];
}
function componentDidUpdate() {}
function componentWillUnmount() {}

export default {
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount
}