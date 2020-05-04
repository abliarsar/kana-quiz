import React, { useEffect } from 'react'

import { nextQuestion } from './models/question'
import StatsByGlyphType from './components/molecules/stats-by-glyph-type'
import Question from './components/molecules/question'


type Props = {
  answers: number | null,
}

const QuizPage = (props: Props) => {

  useEffect(() => {
    nextQuestion()
  }, [])

  return (
    <>
      <Question answers={5} />
      <StatsByGlyphType />
    </>
  )
}
export default QuizPage

