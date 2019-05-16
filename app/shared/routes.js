import { routes } from './config/constants'
import { withAuth } from './components/auth'
import {
  Home, Login, Error,
  MyDataList, Counter,
} from './pages'

const {
  root,
  login,
  myData,
  counter,
} = routes

export default [
  {
    path: root,
    component: Home,
    exact: true,
  },
  {
    path: login,
    component: Login,
  },
  {
    path: myData.root,
    component: withAuth(MyDataList),
  },
  {
    path: counter,
    component: withAuth(Counter),
  },

  // this always on bottom
  {
    component: Error,
  },
]
