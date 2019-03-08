/* eslint-disable camelcase */
// import Cookies from 'universal-cookie'
const superagent = require('superagent')
// import express from 'express'
// import { shuttle_url } from '../config'

// const app = express()

// export default class ApiCall {
//   constructor() {
//     return methods.map(method => {
//       let returned = this[method]
//       returned = ({
//         params,
//         data,
//         shuttleUrl
//       } = {}) => (
//         new Promise((resolve, reject) => {
//           const request = superagent[method](shuttleUrl)

//           if (params) {
//             request.query(params)
//           }

//           if (data) {
//             request.send({
//               ...data
//             })
//           }

//           const cbRequest = (err, response = {}) => {
//             const { body, text } = response
//             if (err) {
//               const tempBody = body || err
//               const respText = text ? JSON.parse(text) : text
//               const rejectValue = {
//                 ...tempBody,
//                 ...respText
//               }

//               return reject(rejectValue)
//             }

//             return resolve(body)
//           }
//           request.end(cbRequest)
//         },)
//       )

//       return returned
//     })
//   }

const ApiCall = () => {
  const methods = ['GET', 'post', 'put', 'patch', 'delete']
  const newMethods = methods.map(method => ({
    params,
    data,
    shuttleUrl
  } = {}) => {
    const methodPromise = new Promise((resolve, reject) => {
      const request = superagent[method](shuttleUrl)

      if (params) {
        request.query(params)
      }

      if (data) {
        request.send({
          ...data
        })
      }

      const cbRequest = (err, response = {}) => {
        const { body, text } = response
        if (err) {
          const tempBody = body || err
          const respText = text ? JSON.parse(text) : text
          const rejectValue = {
            ...tempBody,
            ...respText
          }

          return reject(rejectValue)
        }

        return resolve(body)
      }
      request.end(cbRequest)
    })

    return {
      [method]: methodPromise
    }
  })

  return newMethods
}

export default ApiCall
