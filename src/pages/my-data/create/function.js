import {
  ModalConfirmation,
} from 'volantis-ui'
import uuidv4 from 'uuid/v4'

import HOSTNAME from 'Config/constants/hostname'
import METHOD from 'Config/constants/request-method'

import {
  CONFIRMATION_CONTENT,
  CREATE_TYPE,
} from 'Pages/my-data/create/constant'
import {
  SET_FILES,
  POST_SENSOR_REQUEST,
  POST_SENSOR_SUCCESS,
  POST_SENSOR_ERROR,
} from 'Pages/my-data/create/action-type'

export const setFiles = (fields) => ({
  type: SET_FILES,
  payload: fields,
})

export const toggleShow = (name) => (dispatch, getState) => {
  const data = getState().__mydataCreate
  dispatch(setFiles({ ...data, show: { [name]: !show[name] }}))
}

export const renderModalError = ({ type }) => (dispatch, getState) => {
    const confirmationModalProps = { ...CONFIRMATION_CONTENT.failedSaveData };
    const { show, type } = getState().__mydataCreate
    return (
      <ModalConfirmation
        isShow={show.errorModal}
        {...confirmationModalProps}
        onCancel={() => toggleShow('errorModal')}
        // onConfirm={type === CREATE_TYPE.device ? handleCreateSensor : handleAddDatasource}
      />
    );
}

export const handleCreateSensor = () => (dispatch, getState) => {
  const { data: { step1 }, headers } = getState().__mydataCreate
  const sensorId = uuidv4();
  const props = {};
  if (step1 && typeof step1.properties !== 'undefined' && step1.properties.length > 0) {
    step1.properties.forEach(({ key, value }) => {
      if (key.trim() !== '' && value.trim() !== '') props[key] = value;
    });
  }

  const properties = {
    ...props,
    sensor_id: sensorId,
    sensor_description: step1.sensordesc,
    sensor_type: step1.sensortype.length > 0 ? step1.sensortype.map((type) => type.value) : [],
    sensor_name: step1.sensorname
  };
  const reqSensorData = {
    id: sensorId,
    ownerId: headers['V-DRIVEID'],
    name: step1.sensorname,
    type: CREATE_TYPE.sensor,
    options: null,
    status: 'WAITING_FOR_DATA',
    properties: JSON.stringify(properties)
  };
  // await this.props.createSensor({ reqSensorData, headers: { ...this.state.headers, 'V-NAME': step1.sensorname } });
  // this.setState({ token: this.props.createConnector.token || '' }); // return sensor

}

export const createSensor = ({ reqSensorData = {} }, cb = () => {}) => (dispatch, getState) => {
  // return dispatch({
  //   type: [
  //     POST_SENSOR_REQUEST,
  //     POST_SENSOR_SUCCESS,
  //     POST_SENSOR_ERROR,
  //   ],
  //   shuttle: {
  //     path: '/v1/device',
  //     method: METHOD.post,
  //     payloads: reqSensorData
  //   },
  //   endpoint: HOSTNAME.root,
  //   nextAction: (res, err) => cb(res, err)
  // })
}
export const handleAddDatasource = () => (dispatch, getState) =>{}
export const handleNextStep = () => (dispatch, getState) => {}
export const handleBackStepTypeFile = () => (dispatch, getState) => {}
export const handleBackStep = () => (dispatch, getState) => {}
export const handleChangeInput = () => (dispatch, getState) => {}
export const handleFileChange = () => (dispatch, getState) => {}
export const renderContent = () => (dispatch, getState) => {}

export const getRules = () => (dispatch, getState) => {}
export const getSampleData = () => (dispatch, getState) => {}
export const getSampleDataSql = () => (dispatch, getState) => {}
export const getSampleTable = () => (dispatch, getState) => {}
export const getSensorProperties = () => (dispatch, getState) => {}
export const handleMapTableMapping = () => (dispatch, getState) => {}
export const handleChangeTypeTableMapping = () => (dispatch, getState) => {}
export const handleDeleteTableMapping = () => (dispatch, getState) => {}
export const handleChangeProps = () => (dispatch, getState) => {}
export const handleDeleteProps = () => (dispatch, getState) => {}
export const handleAddProps = () => (dispatch, getState) => {}
