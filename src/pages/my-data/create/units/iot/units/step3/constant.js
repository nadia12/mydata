export const TOKEN_CONTENT = {
  HTTP: {
    METHOD: 'POST',
    'CONTENT-TYPE': 'application/json',
    'REQUEST BODY': 'the telemetry data in json format'
  },
  CoAP: {
    METHOD: 'POST',
    'CONTENT-TYPE': 'application/json',
    'REQUEST BODY': 'the telemetry data in json format'
  },
  MQTT: {
    PAYLOAD: 'the telemetry data in json format'
  }
}

export const labelToken = ['HTTP', 'CoAP', 'MQTT']
