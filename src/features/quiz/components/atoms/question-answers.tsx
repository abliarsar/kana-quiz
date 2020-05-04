import React, {useMemo} from 'react'
import {useStore} from 'effector-react'

import {pickRandom} from 'lib/array/pick-random'
import {QUESTIONS_LIST} from 'lib/kana-syllabary'
import {shuffle} from 'lib/array/shuffle'

import {$question, userAnswered} from '../../models/question'
import { $quizType } from '../../models/settings'


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

    const wrong = pickRandom(questions, count).filter(i => i !== correct)

    const answers = shuffle([...wrong, correct])
    return answers.map( ({data}) => answerType === 'kana' ? data[1] : data[0])
  }, [ answerType, count, info ])

  return (
    <div>
      {options.map(data => (
        <label key={data}>
          <input
            type="radio"
            value={data}
            disabled={state !== 'wait'}
            checked={result === data}
            name="glyph-option"
            onClick={() => {
              userAnswered(data)
              setResult(data)
            }}
          />
          <span>{data}</span>
        </label>
      ))}
    </div>
  )
}

export default Answers

