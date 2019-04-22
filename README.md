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
