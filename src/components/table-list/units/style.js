import styled from 'styled-components'

export const TableListStyle = styled.table`
  width: 100%;
  background: #262831 !important;
  color: #9ea1b4 !important;
  border-collapse: collapse;
  table-layout: fixed;

  th{
    border-bottom: 1px solid #1b1c21;
    border-right:  1px solid #1b1c21;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: 0.2px;
    color: #9ea1b4 !important;
    padding: 14px 12px;
    box-sizing: border-box;
    height: 48px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }

  th:last-child{
    border-right: none;
  }
  
  td{
    border-bottom: 1px solid #1b1c21;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: 0.3px;
    padding: 13px 12px 14px 12px;
    box-sizing: border-box;
    min-height: 48px;
  }
  th:first-child, td:first-child{
    padding-left: 36px;
  }
  th:last-child, td:last-child{
    padding-right: 36px;
  }
  tr {
    cursor: pointer;
  }
  tr.is-active td{
    background-color: #FFD77B;
    color: #262831; 
  }
  /* table fix header */
  .fix-header th, .fix-header th{
    width: 280px;
  }
  .fix-header th{
    padding: 0px;
    border: none;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }
  .fix-header th div.header{
    position: absolute;
    height: 48px;
    width: 280px;
    box-sizing: border-box;
    padding: 14px 12px;
    border-bottom: 1px solid #1b1c21;
    border-right:  1px solid #1b1c21;
    background-color: #262831 !important;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  }
  .fix-header th:first-child div.header{
    padding-left: 36px;
  }
  .fix-header div.header{
    padding-right: 36px;
    border-right: none;
  }
  /* fix header */

  .is-selectable tr {
    cursor: ${props => (props.isSelectable ? 'pointer' : 'none')};
  }

  .table-info-detail tr td{
    padding-top: 16px;
  }
  .table-info-detail tr:first-child td{
    padding-top: 0px;
  }
  .table-info-detail tr td.left{
    font-size: 12px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: 0.4px;
    text-transform: uppercase !important;
  }
  .table-info-detail tr td.right{
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: 0.3px;
  }

  .has-no-border td{
    border: none;
  }
  .has-no-padding-left td{
    padding-left: 0px;
  }
  .has-no-padding-right td{
    padding-left: 0px;
  }


  .table-header {
    vertical-align: middle !important;
    font-weight: bold !important;
  }
  tr:last-child {
    border-bottom: none !important;
  }

  .table-content > td {
    padding: 0px !important;
  }

  .table-content > tr {
    padding: 0px !important;
  }

  .table-content > td:last-child {
    border-bottom: none;
  }

  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .table-icon {
    vertical-align: middle;
    align-content: center;
    display: inline-flex;
    align-items: center;
    width: auto;
  }
  .table-icon svg{
    margin-right: 0.5em;
  }
  .icon-selected :global(svg > g > g > path){
    fill: #1b1c21;
  }
  .is-active > td {
    color: rgba(0, 0, 0, 0.87) !important;
  }
  td {
    color: #9ea1b4 !important;
  }

  .fit-table {
    margin-right: 0;
  }

  .main-content-body-left {
    overflow: unset;
  }

  .table-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .style-icon {
    width: 24px;
    height: 24px;
  }

  .thead-icon {
    vertical-align: middle;
    align-content: center;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
  }

`
