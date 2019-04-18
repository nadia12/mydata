import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import ReactTooltip from 'volantis-tooltips'
// import SyntaxHighlighter from 'react-syntax-highlighter'

import {
  ModelSampleStyled,
  ModelSampleHeaderStyled,
  ModelSampleContentStyled,
  LeftStyled,
  RightStyled,
  ModelSampleTitleStyled,
  ModelSampleBoxStyled,
} from './style'

import { Subtitle, Button, Snippet } from 'volantis-ui'

// import { getRequest, otherRequest } from 'Helpers/request';
import { PlayCircleIcon } from 'volantis-icon'
// import { StyleBulma, StyleComponent } from 'PageComponents/css';

const getTryModelURL = '/manages/assets/ml-models/try-model'
const getSampleModelURL = '/manages/assets/ml-studios/sample-data'

const isValidJSON = (input) => {
  try {
    const jsonObject = JSON.parse(input)
    if (typeof jsonObject !== 'object' && !Array.isArray(jsonObject)) return { isJSON: false }
    return { isJSON: true, data: jsonObject }
  } catch (e) {
    return { isJSON: false }
  }
};

const ModelSample = (props) => {
  const { webAPI, assetId } = props
  const { outputContent, setOutputContent } = useState({})
  const { isValid, setIsValid } = useState(false)
  const { inputContent, setInputContent } = useState(`"${webAPI}${getSampleModelURL}/${assetId}"`)
  const { tryLoading, setTryLoading } = useState(false)

  const isValidNotLoading = isValid && !tryLoading
  return (
    <ModelSampleStyled>
      <ModelSampleHeaderStyled>
        <Subtitle size="big" type="secondary">MODEL SAMPLE</Subtitle>
      </ModelSampleHeaderStyled>
      <ModelSampleContentStyled>
        <LeftStyled>
          <ModelSampleTitleStyled>
            <Subtitle size="normal" type="secondary">INPUT</Subtitle>
            <Button
              label="Run"
              theme="no-border"
              size="compact"
              icon={(props) => <PlayCircleIcon {...props} width="16" />}
            />
          </ModelSampleTitleStyled>
          <ModelSampleBoxStyled>
            <Snippet>https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg</Snippet>
          </ModelSampleBoxStyled>
        </LeftStyled>
        <RightStyled>
          <ModelSampleTitleStyled>
            <Subtitle size="normal" type="secondary">OUTPUT</Subtitle>
          </ModelSampleTitleStyled>
          <ModelSampleBoxStyled>
            <Snippet>
              {JSON.stringify(
                {
                  "url": "https://cdn-images-1.medium.com/max/1600/1*mONNI1lG9VuiqovpnYqicA.jpeg",
                  "confidence": 1,
                  "animal": true
                }
              )}
            </Snippet>
          </ModelSampleBoxStyled>
        </RightStyled>
      </ModelSampleContentStyled>
    </ModelSampleStyled>
  )
}

ModelSample.propTypes = {
  webAPI: PropTypes.string.isRequired,
  assetId: PropTypes.string.isRequired,
}

export default ModelSample

// class TryModel extends React.Component {

//   componentDidMount() {
//     this.handleTryRun();
//   }

//   getTryOutput = async (data) => {
//     const req = await otherRequest({
//       url: `${this.props.webAPI}${getTryModelURL}`,
//       headers: { accept: 'application/json' },
//       data: {
//         data,
//         fit_id: this.props.assetId
//       }
//     });

//     if (req.data && req.data.sample_data) {
//       this.setState({ outputContent: req.data.sample_data, tryLoading: false, isValid: true });
//     } else this.setState({ outputContent: {}, tryLoading: false, isValid: true });
//   }

//   validateTryInput = async () => {
//     const { inputContent } = this.state;
//     let checkJSON = isValidJSON(inputContent);
//     let data = inputContent;
//     let error;

//     if (!checkJSON.isJSON) {
//       if (inputContent.toLowerCase().trim().startsWith('http') || inputContent.toLowerCase().trim().startsWith('"http')) {
//         try {
//           const req = await getRequest({
//             url: `${inputContent.replace(/^\"/, '').replace(/\"$/, '')}`, //eslint-disable-line
//             headers: { accept: 'application/json' }
//           });

//           if (req.data) {
//             checkJSON = isValidJSON(JSON.stringify(req.data));
//             if (!checkJSON.isJSON) {
//               error = 'type';
//             } else data = checkJSON.data;
//           }
//         } catch (ex) {
//           error = 'request';
//         }
//       } else {
//         error = 'type';
//       }
//     } else {
//       data = checkJSON.data;
//     }
//     if (error) this.setState({ tryLoading: false, outputContent: { error: `Invalid ${error}` } });
//     else this.getTryOutput(data);
//   }

//   handleTryChange = (e) => {
//     const inputContent = e.target.value || '';

//     this.setState({ inputContent, isValid: inputContent.length > 0 });
//   }

//   handleTryRun = () => {
//     this.setState({ tryLoading: true }, () => this.validateTryInput());
//   }

//   render() {
//     const {
//       isValid, inputContent, outputContent, tryLoading
//     } = this.state;

//     const isValidNotLoading = isValid && !tryLoading;

//     return (
//       <div className="box-tab-content padding-top0 padding-bottom0 mb2rem">
//         <StyleBulma column columns />
//         <StyleComponent tryModel />
//         <div className="column is-12 is-uppercase pd-left1">MODEL SAMPLE</div>
//         <div className="border-bottom" />
//         <div className="columns is-fullwidth margin-auto align-items pb1">
//           <div className="column padding-bottom0">
//             <div className="align-items">
//               INPUT&nbsp;
//               <div data-tip="true" data-for="try-tooltip"><InfoIcon size="20" color="#9EA1B4" /></div>
//               <ReactTooltip place="right" type="dark" data-id="tooltip" effect="solid" id="try-tooltip" delayHide={50} delayShow={50} delayUpdate={500}>
//                 <div className="ml-tooltip align-items">
//                   <span className="grey-color">
//                     {'(Insert the model\'s input format data/description)'}
//                   </span>
//                 </div>
//               </ReactTooltip>
//               { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <div className={`has-text-right is-text-glow run-action ${isValidNotLoading ? '' : 'not-allowed'}`} onClick={isValidNotLoading ? this.handleTryRun : null} role="button" tabIndex="0" style={{ width: '90%' }}>
//                 <span className="pointer"><PlayIcon size="20" color="#ffd77b" /></span>
//                 <span className="pointer" style={{ color: '#ffd77b' }}>Run</span>
//               </div>
//               <br />
//             </div>
//             <pre className="try-pre">
//               <textarea className="try-textarea" onChange={this.handleTryChange} value={inputContent} />
//             </pre>
//           </div>
//           <div className="column padding-bottom0 try-model-output">
//             <div style={{ height: '2rem', paddingTop: '.3em', paddingBottom: '.1em' }}>OUTPUT</div>
//             <SyntaxHighlighter language="json" showLineNumbers>
//               {JSON.stringify(outputContent && outputContent.sample_data ? outputContent.sample_data : outputContent, null, 4)}
//             </SyntaxHighlighter>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// TryModel.propTypes = {
//   assetId: PropTypes.string
// };

// TryModel.defaultProps = {
//   assetId: null
// };

// export default TryModel;
