import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getCookie =  ({ cookieName }) => cookies.get(cookieName)
