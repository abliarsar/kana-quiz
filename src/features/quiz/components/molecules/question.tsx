import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useStore} from 'effector-react'

import {$question, nextQuestion, userAnswered} from '../../models/question'
import QuestionGlyph from '../atoms/question-glyph'
import Answers from '../atoms/question-answers'


type Props = {
  answers: number | null,
}

const Question = ({ answers }: Props) => {
  const { error, state, info } = useStore($question)
  const [result, setResult] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [info])

  const submit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    if (answers != null) return
    if (state == 'wait') return userAnswered(result)

    setResult('')
    nextQuestion()

  }, [state, result, answers])

  return (
    <form onSubmit={submit}>
      <QuestionGlyph />
      {answers != null && (
        <Answers count={answers} result={result} setResult={setResult} />
      )}
      {answers == null && (
        <input
          ref={inputRef}
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      )}
      {state === 'fail' && <div>{error}</div>}
      <div>
        {answers == null && <button type="submit" disabled={state !== 'wait'}>OK</button>}
        <button type="button" onClick={() => nextQuestion()}>Следующий вопрос</button>
      </div>
    </form>
  )
}
export default Question


