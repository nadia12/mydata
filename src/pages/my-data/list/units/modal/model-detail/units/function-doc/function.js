import React from 'react'
import { ALPHABET } from './constant'

export const getTrs = () => (dispatch, getState) => {
  const queryBuilders = getState()._mydataList.functionDoc.query_builders

  let tr = []
  if (!!queryBuilders && queryBuilders.length > 0) {
    let currTr = 0
    queryBuilders.forEach((query, idx) => {
      if (query) {
        const { name, query_params: { params } } = query
        if (params && params.length > 0) {
          let currLen = 1
          let datas = []

          /*
            1. tr
              a = [A..Z] QueryParams
            2. nextTrn
              a. tdParams => contains <TD> for the next <TR>
                i. description + additionalDescription
                  IF availableValues THEN
                    param = property
                  ELSEIF paramName in [querySpec || filter] THEN
s
                  ENDIF
                ii. name
                iii. required

          */

          // 1. a => TITLE PER KEYS
          const TITLE = `${ALPHABET[currTr]}. ${name || ''}`
          tr.push(<tr key={`title-${idx}`}><th colSpan="4" className="is-uppercase" style={{ color: '#9EA1B4' }}>{TITLE}</th></tr>)
          params.forEach((param, paramIdx) => {
            if (param && (typeof param.isHidden === 'undefined' || param.isHidden === null || !param.isHidden)) {
              const {
                name: paramName, description, required, available_values: availableValues, children: child1,
              } = param
              const nextTr = []
              const tdParams = []
              let additionalDescription = ''

              tdParams.push(<td key={`no-${idx}-${paramIdx}`} className="no">{currLen}</td>)
              tdParams.push(<td key={`name-${idx}-${paramIdx}`} className="name">{paramName}</td>)

              if (availableValues) {
                const { vertices: availableVertices, edges: availableEdges } = availableValues
                const isAvailableValuesArray = Array.isArray(availableValues)
                const hasAvailableVertices = availableVertices && availableVertices.length > 0
                const hasAvailableEdges = availableEdges && availableEdges.length > 0
                const isAvailableVerticesArray = hasAvailableVertices && Array.isArray(availableVertices) && availableVertices.length > 0 && typeof availableVertices[0] !== 'object'
                const isAvailableEdgesArray = hasAvailableEdges && Array.isArray(availableEdges) && availableEdges.length > 0 && typeof availableEdges[0] !== 'object'

                additionalDescription = (
                  <>
                    {isAvailableValuesArray && (<p>{`Available Values: ${availableValues.length > 0 ? availableValues.join(', ') : 'N/A'}`}</p>)}
                    {isAvailableVerticesArray && (<p>{`Available Vertices: ${availableVertices && availableVertices.length > 0 ? availableVertices.join(', ') : 'N/A'}`}</p>)}
                    {isAvailableEdgesArray && (<p>{`Available Edges: ${availableEdges && availableEdges.length > 0 ? availableEdges.join(', ') : 'N/A'}`}</p>)}
                    {/* {hasAvailableVertices && !isAvailableVerticesArray && this.renderVertexEdge({ type: 'Vertices', data: availableVertices })}
                    {hasAvailableEdges && !isAvailableEdgesArray && this.renderVertexEdge({ type: 'Edges', data: availableEdges })} */}
                  </>
                )
              } else if (paramName === 'querySpec' || paramName === 'filter') {
                if (child1 && child1.length > 0) {
                  if (child1) {
                    child1.forEach(((child1Param, j) => {
                      if (child1Param) {
                        const {
                          name: c1Name, description: c1Description, required: c1Required, available_values: c1AvailableValues, children: child2,
                        } = child1Param
                        let nextTrParam = []
                        currLen += 1
                        nextTrParam.push(<td key={`idx-no-${idx}-${paramIdx}-${j}`} className="no">{currLen}</td>)
                        nextTrParam.push(<td key={`idx-name-${idx}-${paramIdx}-${j}`} className="name" name="name">{`${paramName}.${c1Name}`}</td>)
                        nextTrParam.push(
                          <td name="description" key={`idx-description-${idx}-${paramIdx}-${j}`}>
                            {c1Description}
                            <br />
                            {
                              c1AvailableValues && Array.isArray(c1AvailableValues) && (
                                <>
                                  Available Values
                                  <br />
                                  {c1AvailableValues && c1AvailableValues.length > 0 ? c1AvailableValues.join(', ') : 'N/A'}
                                </>
                              )
                            }
                          </td>
                        )
                        nextTrParam.push(<td key={`idx-required-${idx}-${paramIdx}-${j}`} style={{ textAlign: 'right' }}>{c1Required ? 'Required' : 'Optional'}</td>)
                        nextTr.push(<tr key={`idx-tr-${idx}-${paramIdx}-${j}`}>{nextTrParam}</tr>)
                        if (child2 && child2.length > 0 && Array.isArray(child2)) {
                          child2.forEach((child2Param, cIdx) => {
                            if (child2Param) {
                              const {
                                name: c2Name, description: c2Description, required: c2Required, available_values: c2AvailableValues,
                              } = child2Param
                              currLen += 1
                              nextTrParam = []
                              nextTrParam.push(<td key={`idx-no-${idx}-${paramIdx}-${cIdx}`} className="no">{currLen}</td>)
                              nextTrParam.push(<td key={`idx-name-${idx}-${paramIdx}-${cIdx}`} className="name" name="name">{`${paramName}.${c1Name}.${c2Name || ''}`}</td>)
                              nextTrParam.push(
                                <td name="description" key={`idx-description-${idx}-${paramIdx}-${cIdx}`}>
                                  {c2Description}
                                  <br />
                                  {
                                    c2AvailableValues && Array.isArray(c2AvailableValues) && (
                                      <>
                                        Available Values
                                        <br />
                                        {c2AvailableValues && c2AvailableValues.length > 0 ? c2AvailableValues.join(', ') : 'N/A'}
                                      </>
                                    )
                                  }
                                  {
                                    c2AvailableValues && !Array.isArray(c2AvailableValues) && (
                                      <>
                                        {
                                          c2Name === 'property' && (
                                            <>
                                              {/* {c2AvailableValues.vertices && c2AvailableValues.vertices.length > 0 && this.renderVertexEdge({ type: 'Vertices', data: c2AvailableValues.vertices })}
                                              {c2AvailableValues.edges && c2AvailableValues.edges.length > 0 && this.renderVertexEdge({ type: 'Edges', data: c2AvailableValues.edges })} */}
                                            </>
                                          )
                                        }
                                      </>
                                    )
                                  }
                                </td>
                              )
                              nextTrParam.push(<td key={`td-required-${idx}-${paramIdx}-${j}-${cIdx}`} style={{ textAlign: 'right' }}>{c2Required ? 'Required' : 'Optional'}</td>)
                              nextTr.push(<tr key={`tr-idx-child-${idx}-${paramIdx}-${j}-${cIdx}`}>{nextTrParam}</tr>)
                            }
                          })
                        }
                      }
                    }))
                  }
                }
              }
              tdParams.push(
                <td key="description">
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                  {/* {description} */}
                  {additionalDescription}
                </td>
              )
              tdParams.push(<td key="required" style={{ textAlign: 'right' }}>{required ? 'Required' : 'Optional'}</td>)
              currLen += 1
              datas.push(<tr>{tdParams}</tr>)
              if (nextTr && nextTr.length > 0) {
                datas = datas.concat(...nextTr)
              }
            }
          })
          tr = tr.concat(datas)
          currTr += 1
        }
      }
    })
  } else return null
  if (tr.length === 0) return null

  return tr
}
