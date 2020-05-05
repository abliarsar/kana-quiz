import React, {useEffect} from 'react'
import {RouteComponentProps} from 'react-router'

import {Quiz, setQuizType} from 'features/quiz'
import {QuizType} from 'features/quiz/types'

const QuizWithInput = (props: RouteComponentProps<{ answerType: QuizType }>) => {

  useEffect(() => {
    setQuizType(props.match.params.answerType)
  }, [])

  return (
    <Quiz answers={null} />
  )
}

export default QuizWithInput
