# volantis-mydata

## Step to publish npm
1. npm build 
2. npm login --registry=http://repo.volantis.io/repository/npm/
3. package.json > update version number 
4. npm publish

## How to Use
1. yarn add volantis-mydata
2. 
```
import ReactDOM from 'react-dom'
import { MyDataCreate, MyDataList, reducer } from 'volantis-mydata'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const rootReducers = combineReducers({ volantisMyData: combineReducers(reducer) })

const store = createStore(rootReducers)

const myDataProps = {
  linkTo: (backTo) => {
    // back to specified route
    console.log(backTo)
  },
}

ReactDOM.render((<Provider store={store()}><MyDataCreate {...myDataProps} /></Provider>), mountNode)
```

## How to Test in local
1. npm install
2. npm run build
3. in folder my-data > git clone volantis-iq > branch join-app
4. in folder volantis-iq
package.json part depedencies, replace react, react-dom, redux, redux-thunk, styled-components, volantis-mydata-ssr, volantis-ui
```
"dependencies": {
    // other depedencies ......
    "react": "link:../node_modules/react",
    "react-dom": "link:../node_modules/react-dom",
    "react-redux": "link:../node_modules/react-redux",
    "redux": "link:../node_modules/redux",
    "redux-thunk": "link:../node_modules/redux-thunk",
    "styled-components": "link:../node_modules/styled-components",
    "volantis-mydata-ssr": "link:..",
    "volantis-ui": "link:../node_modules/volantis-ui",
  }
```
```
npm install
```
```
npm link react react-dom redux redux-thunk styled-components volantis-mydata-ssr volantis-ui
```
4. npm start
