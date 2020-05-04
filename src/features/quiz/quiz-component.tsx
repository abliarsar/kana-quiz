import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useStore} from 'effector-react'

import {$question, nextQuestion, userAnswered} from './models/question'
import {$statsByType} from './models/stats'
import {QuestionType} from './types'
import {$quizType} from './models/settings'


type Props = {
  answers: number | null,
}

const QuizPage = (props: Props) => {
  const { error, state, info } = useStore($question)
  const [result, setResult] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nextQuestion()
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [info])
  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (state !== 'wait') {
      setResult('')
      nextQuestion()
    }
    else {
      userAnswered(result)
    }
  }, [state, result])

  return (
    <form onSubmit={submit}>
      <div>
        <Display />
        <div>state: {state}</div>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={result}
        onChange={(e) => setResult(e.target.value)}
      />
      <button type="submit">{ state === 'wait' ? 'Ок' : 'Следующий'}</button>
      {state === 'fail' && <div>{error}</div>}
      <StatsByType />
    </form>
  )
}
export default QuizPage

const typeToIndex = {
  romaji: 0,
  hiragana: 1,
  katakana: 2,
}
const Display = () => {
  const { info, type } = useStore($question)

  const convertTypeToIndex = useCallback((type: QuestionType) => {
    const typeToIndex = {
      romaji: 0,
      hiragana: 1,
      katakana: 2,
    }
    return typeToIndex[type]
  }, [])

  return (
    <div style={{fontSize: 36}}>
      {info[convertTypeToIndex(type)]}
    </div>
  )
}

const StatsByType = () => {
  const type = useStore($quizType)
  const stats = useStore($statsByType)

  switch (type) {
    case 'kana': {
      return (
        <section>
          <div>
            <div>Статистика</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>+ {stats.romaji[0]}</div>
              <div>- {stats.romaji[1]}</div>
            </div>
          </div>
        </section>
      )
    }
    case 'romaji': {
      return  (
        <section style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <div>Хирагана</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>+ {stats.hiragana[0]}</div>
              <div>- {stats.hiragana[1]}</div>
            </div>
          </div>
          <div>
            <div>Катакана</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>+ {stats.katakana[0]}</div>
              <div>- {stats.katakana[1]}</div>
            </div>
          </div>
        </section>
      )
    }
  }
  return null
}
