import styled from 'styled-components'
import COLORS from 'Asset/css/colors'

export const BoxTable = styled.div`
  border: 1px solid ${COLORS.grayBlack};
  border-radius: 4px;
  padding: 0px;
  width: 100%;
  height: 230px;
  background-color: ${COLORS.grayLight};
`

export const BoxTableContent = styled.div`
  border-radius: 4px;
  background-color: ${COLORS.grayLight};
  height: 200px;
  overflow: auto;
`

export const TblProps = styled.table`
  width: 100%;
  padding: 0px;
  margin: 0px;

  tbody {
    min-height: 100%;
  }

  td {
    min-width: 150px;
    border-bottom: 1px solid ${COLORS.grayBlack};
    border-right: 1px solid ${COLORS.grayBlack};
  }

  td:nth-child(2) {
    border-bottom: 1px solid ${COLORS.grayBlack};
  }

  td:nth-child(1) div div {
    border-style: none;
  }

  td:last-child {
    border-right: none;
  }

  tr {
    padding-bottom: 1px;
  }

  > tbody > tr > td > div > div {
    border-style: none;
  }  
  
  input {
    width: 100%;
    border: none;
    background: ${COLORS.grayLight};
    color: ${COLORS.white};
    outline: none;
  }
`

export const BoxTableFooter = styled.div`
  border-top: 1px solid #1b1c21;
  width: 100%;
  height: 30px;
  text-align: right;
  border-radius: 0 0 4px 4px;
`

export const ButtonFooter = styled.div`
  display: inline-block;
  padding: .15rem;
`
