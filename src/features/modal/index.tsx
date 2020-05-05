import React, {useCallback} from 'react'
import {createPortal} from 'react-dom'
import styled from 'styled-components'


type Props = {
  opened: boolean,
  onClose: () => void,
  children: JSX.Element,
}

const root = document.getElementById('modal-root')

export const Modal = (props: Props) => {
  if (!props.opened || !root) return null

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return
    props.onClose()
  }, [])

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      {props.children}
    </ModalOverlay>,
    root
  )
}

const ContentWrapper = styled.div`
  display: inline-block;
  background: white;
  padding: 10px;
  border-radius: 5px;
`

Modal.ContentWrapper = ContentWrapper

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0, .5);
  cursor: pointer;
`
