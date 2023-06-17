import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Trans } from '@lingui/react';

import { IQuestion, QuestionState, QuizType } from 'features/quiz/types';
import QuestionGlyph from './glyph';
import Answers from './answers';


type Props = {
  quizType: QuizType
  answers: number | null,
  question: IQuestion | null,
  onSubmitUserAnswer: (answer: string) => void;
  onNextQuestion: () => void;
}

const Question = ({ answers, question, onNextQuestion, onSubmitUserAnswer, quizType }: Props) => {
  const { error, state, info } = question || {};
  const isEmpty = question == null;
  const [result, setResult] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const nextQuestionButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (state !== QuestionState.in_progress) {
      nextQuestionButtonRef.current?.focus()
    }
  }, [state])

  useEffect(() => {
    setResult('')
    inputRef.current?.focus()
  }, [info])

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    e.preventDefault()

    if (state == QuestionState.in_progress) {
      if (answers !== null) return
      return onSubmitUserAnswer(result)
    }
    onNextQuestion()
  }

  return (
    <Form onKeyPress={handleEnterKeyPress}>
      {question && <QuestionGlyph type={quizType} question={question} />}
      {answers != null && question != null && (
        <Answers
          answersCount={answers}
          question={question}
          quizType={quizType}
          onAnswerClick={(answer) => {
            if (question?.state !== QuestionState.in_progress) return;
            console.log(answer)
            onSubmitUserAnswer(answer)
          }}
        />
      )}
      {answers == null && (
        <Input
          disabled={state !==  QuestionState.in_progress}
          ref={inputRef}
          type="text"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      )}
      <Status className={classNames({
        wrong: state === QuestionState.wrong,
        correct: state === QuestionState.correct,
      })}>
        {state === QuestionState.wrong && <div>{error}</div>}
        {state === QuestionState.correct && <div><Trans id="Y19rjb" /></div>}
      </Status>
      {isEmpty && (
        <Status className="wrong">
          <Trans id="iG55Fl" />
        </Status>
      )}
      <ButtonContainer>
        {answers == null && (
          <Button
            type="button"
            disabled={state !== QuestionState.in_progress}
            onClick={() => onSubmitUserAnswer(result)}
          >
            <Trans id="9MvIiy" />
          </Button>
        )}
        <Button
          ref={nextQuestionButtonRef}
          type="button"
          disabled={isEmpty}
          onClick={() => onNextQuestion()}
        >
          <Trans id="tsIrIK" />
        </Button>
      </ButtonContainer>
    </Form>
  )
}

export default Question

const Form = styled.form`
  padding-bottom: 0.625rem;
  margin: 0 auto;
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
  background: var(--white-color);
  color: var(--black-color);
  &:focus {
    outline: none;
    box-shadow: 0 0 3px aquamarine;
  }
  &:disabled {
    opacity: 0.5;
  }
`

const Status = styled.div`
  height: 2rem;
  text-align: center;
  font-weight: 500;
  &.wrong {
    color: var(--error-color);
  }
  &.correct {
    color: var(--success-color);
  }
`

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 0.625rem;
  font-size: 1rem;
  cursor: pointer;
  background: var(--white-color);
  color: var(--black-color);
  &[disabled] {
    opacity: .5;
  }
  border-radius: 5px;
  border: 1px solid #333;
  
  &:only-child {
    margin: 0 auto;
  }
`

const ButtonContainer = styled.div`
  display: flex;
`
