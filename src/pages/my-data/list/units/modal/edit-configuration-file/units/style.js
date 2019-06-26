import styled from 'styled-components'
import rem from 'polished/lib/helpers/rem'

export const EditConfigurationFileStyle = styled.div`
  width: ${rem('300px')};
  height: ${rem('330px')};

  h1{
    margin-bottom: 2rem;
    margin-top: 0;
  }
  
  .btn-a-href-new-folder {
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
    text-align: center;
    #1b1c21-space: nowrap;
    border-radius: 6px;
    padding-left: 1em;
    padding-right: 1em;
    font: 1rem 'Roboto',sans-serif;
    width: fit-content;
    cursor: pointer;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
`

export const DivInputStyle = styled.div`
  width: ${rem('300px')};
  margin-bottom: 0.5rem;
`

export const TextStyle = styled.div`
  height: ${rem('80px')};
  width: ${rem('300px')};
  margin-bottom: 1rem;
`
