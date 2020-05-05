import React from 'react'
import {useStore} from 'effector-react'

import {$question} from '../../models/question'
import {$quizType} from '../../models/settings'
import styled from 'styled-components'
import classNames from 'classnames'


const QuestionGlyph = () => {
  const { info, state } = useStore($question)
  const type = useStore($quizType)

  const index = type == 'kana' ? 0 : 1

  return (
    <Styles className={classNames(state, { pad: type == 'romaji' })}>
      {info.data[index]}
    </Styles>
  )
}

export default QuestionGlyph

const Styles = styled.div`
  font-size: 70px;
  text-align: center;
  font-weight: bolder;
  border: 2px solid #333;
  border-radius: 5px;
  &.done {
    border-color: forestgreen;
  }
  &.fail {
   border-color: darkred;
  }
  &.pad {
    padding-bottom: 10px;
  }
`
