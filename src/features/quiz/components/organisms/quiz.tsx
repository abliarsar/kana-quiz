import React, { useEffect } from 'react'
import styled from 'styled-components'

import { nextQuestion } from '../../models/question'

import StatsByGlyphType from '../molecules/stats-by-glyph-type'
import Question from '../molecules/question'
import QuizSettings from '../atoms/quiz-settings'


type Props = {
  answers: number | null,
  className?: string,
}

const Quiz = (props: Props) => {

  useEffect(() => {
    nextQuestion()
  }, [])

  return (
    <Styles className={props.className}>
      <Question answers={props.answers} />
      <StatsByGlyphType />
      <QuizSettings />
    </Styles>
  )
}

export default Quiz

const Styles = styled.div`
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
