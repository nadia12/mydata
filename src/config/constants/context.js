import cookie from 'react-cookies'

export const accessToken = () => {
  let token = null
  if (cookie.load('SID_IQ')) {
    token = cookie.load('SID_IQ')
  }

  return token
}
