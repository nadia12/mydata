import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Dashboard, View } from 'volantis-xplorer'
import {
  // MyDataList,
  MyDataCreate,
} from 'volantis-mydata'
import { PipelineApp } from 'volantis-pipeline'
import styled from 'styled-components'
import { Button, Input } from 'volantis-ui'
import axios from 'axios'
import cookie from 'react-cookies'
import { host } from './config'
import { downloadToPDF, downloadToPNG } from './utils/DownloadFile'

const geoJSON = require('./id-all.geo.json')

function EditorDashboard(props) {
  const dashboardProps = {
    onSave: (res) => {
      console.log(JSON.stringify(res))
      alert('save dashboard')
    },
    onView: (res) => {
      props.history.push({
        pathname: '/view',
        state: { res }
      })
    },
    onPreview: (res) => {
      props.history.push({
        pathname: '/preview',
        state: { res }
      })
    },
    onDownloadPDF: (res) => {
      downloadToPDF(res)
    },
    onDownloadPNG: (res) => {
      downloadToPNG(res)
    },
    onChangePage: (res) => {
      console.log(res)
    },
    month: 1,
    year: 2019,
    datasetId:"02ea8c98-db24-34a3-8a77-3b13695b71e6",
    dashboardName:"Xplorer",
    geoJSON,
    serviceURL: {
      query: "/v1/query/"
    },
    ...props
  }

  return <Dashboard {...dashboardProps} />
}

const Container = styled.div`
  width: 30%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
`

function Home(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignIn = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://staging-iq-app.volantis.io:18000/api/sessions/login', { email, password });
      if (data) {
        await cookie.save('SID_IQ', data.id, { domain: '' })
        await cookie.save('DIS_IQ', data.user, { domain: '' })
        props.history.push('/my-data')
      } else {
        alert('something went wrong')
      }
    } catch(err) {
      alert('failed to login')
    }
  }

  return (
    <Container>
      <Input
        label="Email"
        name="Basic Input"
        type="email"
        value={email}
        placeholder="user@domain.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button
        label="Login"
        onClick={onSignIn}
      />
    </Container>
  );
}

function ViewDashboad(props) {
  const { res } = props.location.state
  if (res) {
    const viewProps = {
      ...res,
      serviceURL: {
        queryService: "/v1/query/sync/dataset"
      },
      history: props.history,
      geoJSON
    }
    if (props.location.pathname === '/preview') viewProps.isPreview = true
    return <View {...viewProps } />
  } else {
    props.history.goBack()
  }
}

const Pipeline = () => (
  <PipelineApp userInfo="DIS_IQ"  backTo="/my-data" linkTo={() => {}} />
)

const MyDataCreateApp = (props) => {
  const createProps = {
    userInfo: 'DIS_IQ',
    authCookie: 'SID_IQ',
    // serviceURL: {
    //   ...host,
    // },
    linkTo: ({ pathname }) => {
      props.history.push({
        pathname
      })
    },
  }

  return (
    <MyDataCreate {...createProps} />
  )
}


export default () => {
  return (
    <Router>
      <>
        <Route exact path="/" component={Home} />
        <Route path="/editor" component={EditorDashboard} />
        <Route path="/view" component={ViewDashboad} />
        <Route path="/preview" component={ViewDashboad} />
        {/* <Route path="/my-data" exact component={MyDataList} /> */}
        <Route path="/my-data/create" component={MyDataCreateApp} />
        <Route path="/pipeline" component={Pipeline} />
      </>
    </Router>
  );
}
