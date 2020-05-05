import React, { useEffect } from 'react'
import styled from 'styled-components'

import { nextQuestion } from '../../models/question'

import StatsByGlyphType from '../molecules/stats-by-glyph-type'
import Question from '../molecules/question'
import QuizSettingsModal from '../molecules/quiz-setting-modal'
import QuizSettings from '../atoms/quiz-settings'
import StatsByGlyph from '../molecules/stats-by-glyph'


type Props = {
  answers: number | null,
  className?: string,
}

const Quiz = (props: Props) => {

  useEffect(() => {
    nextQuestion()
  }, [])

  return (
    <FlexRow>
      <div>
        <QuizSettings />
      </div>
      <Styles className={props.className}>
        <QuizSettingsModal />
        <Question answers={props.answers} />
        <StatsByGlyphType />
      </Styles>
      <div>
        <StatsByGlyph />
      </div>
    </FlexRow>
  )
}

export default Quiz

const Styles = styled.div`
  min-width: 300px;
  max-width: 400px;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const FlexRow = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 12px;
  & > * {
    width: 400px;
  }
`
