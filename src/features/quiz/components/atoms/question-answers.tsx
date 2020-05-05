import React, {useMemo, useState} from 'react'
import {useStore} from 'effector-react'

import {pickRandom} from 'lib/array/pick-random'
import {QUESTIONS_LIST} from 'lib/kana-syllabary'
import {shuffle} from 'lib/array/shuffle'

import {$question, userAnswered} from '../../models/question'
import { $quizType } from '../../models/settings'
import styled from 'styled-components'


type Props = {
  count: number,
  result: string,
  setResult: (v: string) => void,
}

const Answers = ({ count, result, setResult }: Props) => {
  const { info, state } = useStore($question)
  const answerType = useStore($quizType)

  const options = useMemo(() => {
    const questions = QUESTIONS_LIST.filter(item => item.group[0] === info.group[0])
    const correct = questions.find(data => data.name === info.name)!

    const wrong = pickRandom(questions, count).filter(i => i !== correct).slice(0, count - 1)

    const answers = shuffle([...wrong, correct])
    return answers.map( ({data}) => answerType === 'kana' ? data[1] : data[0])
  }, [ answerType, count, info ])

  return (
    <Styles>
      {options.map(data => (
        <Button
          key={data}
          type="button"
          disabled={state !== 'wait'}
          onClick={() => {
            userAnswered(data)
            setResult(data)
          }}
        >
          {data}
        </Button>
      ))}
    </Styles>
  )
}

export default Answers

const Styles = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Button = styled.button`
  width: calc(33% - 2px);
  font-size: 20px;
  margin: 1px;
  font-weight: bold;
`
