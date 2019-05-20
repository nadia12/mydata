import { routes } from './config/constants'
import { withAuth } from './components/auth'
import {
  Home, Login, Error,
  MyData, MyDataCreate,
} from './pages'

const {
  root,
  login,
  myData,
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
    component: withAuth(MyData),
    exact: true,
  },
  {
    path: myData.root + myData.create,
    component: withAuth(MyDataCreate),
  },
  {
    path: `${myData.root + myData.folder}/:id`,
    component: withAuth(MyData),
    exact: true,
  },
  {
    path: `${myData.root + myData.trash}`,
    component: withAuth(MyData),
    exact: true,
  },
  // this always on bottom
  {
    component: Error,
  },
]
