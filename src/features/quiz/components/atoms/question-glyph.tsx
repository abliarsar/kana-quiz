import React from 'react'
import {useStore} from 'effector-react'

import {$question} from '../../models/question'
import {$quizType} from '../../models/settings'


const QuestionGlyph = () => {
  const { info } = useStore($question)
  const type = useStore($quizType)

  const index = type == 'kana' ? 0 : 1

  return (
    <div style={{fontSize: 36}}>
      {info.data[index]}
    </div>
  )
}

export default QuestionGlyph
