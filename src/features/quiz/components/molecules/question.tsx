import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useStore} from 'effector-react'
import styled from 'styled-components'

import {$question, nextQuestion, userAnswered} from '../../models/question'
import {$isQuestionsListEmpty} from '../../models/settings'
import QuestionGlyph from '../atoms/question-glyph'
import Answers from '../atoms/question-answers'


type Props = {
  answers: number | null,
}

const Question = ({ answers }: Props) => {
  const { error, state, info } = useStore($question)
  const isEmpty = useStore($isQuestionsListEmpty)
  const [result, setResult] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const nextQuestionButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (state !== 'wait') {
      nextQuestionButtonRef.current?.focus()
    }
  }, [state])

  useEffect(() => {
    setResult('')
    inputRef.current?.focus()
  }, [info])

  const submit = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    e.preventDefault()

    if (state == 'wait') {
      if (answers !== null) return
      return userAnswered(result)
    }
    if (isEmpty) return
    nextQuestion()
  }, [state, result, answers, isEmpty])

  return (
    <Form onKeyPress={submit}>
      <QuestionGlyph />
      {answers != null && (
        <Answers count={answers} result={result} setResult={setResult} />
      )}
      {answers == null && (
        <Input
          disabled={state !== 'wait'}
          ref={inputRef}
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      )}
      <Status className={state}>
        {state === 'fail' && <div>{error}</div>}
        {state === 'done' && <div>Верно!</div>}
      </Status>
      {isEmpty && (
        <Status className="fail">
          Выберите хотя бы одну категорию
        </Status>
      )}
      <div>
        {answers == null && (
          <Button
            type="button"
            disabled={state !== 'wait'}
            onClick={() => userAnswered(result)}
          >
            Ответить
          </Button>
        )}
        <Button
          ref={nextQuestionButtonRef}
          type="button"
          disabled={isEmpty}
          onClick={() => nextQuestion()}
        >
          Следующий вопрос
        </Button>
      </div>
    </Form>
  )
}

export default Question

const Form = styled.form`
  margin: 10px;
`
const Input = styled.input`
  display: block;
  margin: 10px auto;
  line-height: 1.5;
  font-size: 18px;
  max-width: 100px;
  border-radius: 5px;
  border: 1px solid #333;
  text-align: center;
  padding: 0 5px;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px aquamarine;
  }
`

const Status = styled.div`
  height: 30px;
  text-align: center;
  &.fail {
    color: darkred;
  }
  &.done {
    color: forestgreen;
  }
`

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 10px;
  font-size: 18px;
  &[disabled] {
    opacity: .5;
  }
  border-radius: 5px;
  border: 1px solid #333;
`
