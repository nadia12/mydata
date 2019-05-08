import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import rem from 'polished/lib/helpers/rem'
import styled from 'styled-components'
import {
  InfoIcon, SuccessIcon, WarningIcon, CloseIcon,
} from 'volantis-icon'

const getColor = type => {
  switch (type) {
    case 'info':
      return '#466dc4'
    case 'warning':
      return '#ffec3d'
    case 'error':
      return '#d5474f'
    default:
      return '#50c878'
  }
}

const setIcon = type => {
  switch (type) {
    case 'info':
      return <InfoIcon color={getColor(type)} />
    case 'warning':
      return <WarningIcon color={getColor(type)} />
    case 'error':
      return <CloseIcon color={getColor(type)} />
    default:
      return <SuccessIcon color={getColor(type)} />
  }
}

const AlertStyled = styled.div`
  background: #1b1c21;
  width: 100%;
  height: ${rem('56px')};
  border: 2px solid ${props => getColor(props.type)};
  border-radius: ${rem('6px')};
  display: ${props => (props.isShow ? 'block' : 'none')};
  position: absolute;
  z-index: 99999;
`

const ContentStyled = styled.div`
  padding: ${rem('16px')} ${rem('24px')};
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`

const DivStyled = styled.div`
  display: flex;
  align-items: center;
`

const IconStyled = styled(DivStyled)`
  margin-right: ${rem('16px')};
`

const Alert = ({
  isShow,
  onClose,
  children,
  type,
  timeout,
}) => {
  useEffect(() => {
    if (timeout) {
      const alertTimeout = setTimeout(() => {
        onClose()
      }, timeout * 1000)

      return () => {
        clearTimeout(alertTimeout)
      }
    }
  }, [isShow])

  return (
    <>
      <AlertStyled isShow={isShow} type={type}>
        <ContentStyled>
          <DivStyled>
            <IconStyled>{setIcon(type)}</IconStyled>
            {children}
          </DivStyled>
          <DivStyled>
            <CloseIcon color="#313440" onClick={onClose} isHover hoverColor={getColor(type)} />
          </DivStyled>
        </ContentStyled>
      </AlertStyled>
    </>
  )
}

Alert.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.any,
  type: PropTypes.oneOf(['warning', 'success', 'info', 'error']),
  /** in seconds */
  timeout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Alert.defaultProps = {
  isShow: false,
  onClose: () => null,
  children: null,
  type: 'success',
  timeout: 10,
}

export default Alert
