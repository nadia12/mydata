import styled from 'styled-components'

export const InfoDrawerStyle = styled.div`
  padding: 0;
  color: #9ea1b4;

  .table-info-detail {
    width: 100%;
  }

  .header-table-info {
    border-bottom: 1px solid #1b1c21;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    padding: 0.79em;
    padding-right: 0;
    line-height: 1.7;
  }

  .th-info {
    display: inline-block;
    vertical-align: middle;
    align-self: center;
    padding-right: .75rem;
    margin-left: 26px;
  }

  .folder-path {
    display: flex;
    align-items: flex-end;
  }

  td{
    padding: 0.7rem;
  }
`

export const AccuracyStyle = styled.td`
  position: relative;
  left: 19%;
  padding-top: 0.7rem;
`
