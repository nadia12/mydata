import styled from 'styled-components'

export const FunctionDocStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #1b1c21;;
  margin-bottom: 24px;
  border-radius: 8px;
  background-color: #313440;
  text-align: left;

  .name{
    color: #00bdce;
  }

  .table-function td:first-child {
    padding: 1.4em;
  }

  .table-function {
    background-color: #313440;
    border-radius: 8px;
    color: #9ea1b4
  }
  .table-function{
    border: none !important;
  }

  .table-function thead th{
    padding: .1rem 1rem 0;
  }

  .table-function > tbody > tr {
    color: #9ea1b4;
  }
  
  .table-function th {
    padding-left: 1em;  
    line-height: 2.5;
    font-size: 15px;
    border: 1px solid #1b1c21;;
    border-width: 0 0 1px;
    padding: 0.5em 1rem;
    vertical-align: top;
    font-weight: normal;
  }

  .table-function td, .table-function th {
    border-bottom: 1px solid #1b1c21 !important;
  }

  .table-function tbody th{
    line-height: 1.5;
    font-weight: normal;
  }

  .table-function tbody td:last-child{
    padding-right: 1.3rem;
  }
  .table-function tbody td:nth-child(2){
    width: 20%;
  }
`
