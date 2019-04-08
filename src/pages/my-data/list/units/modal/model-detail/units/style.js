import styled from 'styled-components'
import colors from 'Asset/css/colors'

export const ModalStyle = styled.div`
  width: 55vw;
`

const Title = styled.div`
  padding: 2.5rem;
  padding-bottom: 0;
`

const Content = styled.div`
  padding: 2.5rem;
  border-bottom: 1px solid ${colors.grayBlack};
  overflow-y: scroll;
  max-height: 25vw;
`

const Footer = styled.div`   
  padding: 2.5rem;
  float: right;
`
ModalStyle.Title = Title
ModalStyle.Content = Content
ModalStyle.Footer = Footer