import React, {useState} from 'react'

import {Modal} from 'features/modal'

import QuizSettings from '../atoms/quiz-settings'


const QuizSettingsModal = () => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpened(true)}>Настройки</button>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Modal.ContentWrapper>
          <QuizSettings />
        </Modal.ContentWrapper>
      </Modal>
    </>
  )
}

export default QuizSettingsModal
