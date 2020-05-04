import {attach, combine, createEffect, createEvent, createStore, sample} from 'effector'

import {randomInt} from 'lib/array/random-int'

import {QuestionState, QuestionType, QuizType, SymbolInfo} from '../types'
import {$questionsList, $quizType} from './settings'



export const $questionId = createStore(0)
export const $questionInfo = combine($questionId, $questionsList, (id, list) => list[id])
export const $questionState = createStore<QuestionState>('wait')
export const $questionError = createStore<string | null>(null)

export const $question = combine({
  info: $questionInfo,
  state: $questionState,
  error: $questionError,
  id: $questionId,
})

export const nextQuestion = createEvent()

type CheckUserAnswerParams  = { type: QuizType, answer: string, question: SymbolInfo }

const checkUserAnswer = createEffect<CheckUserAnswerParams, boolean>({
  handler: (params) => {
    const { data, group, name } = params.question
    if (params.type === 'romaji') {
      if (data[0] !== params.answer) throw new Error(`Правильный ответ - ${data[0]}`)
    }
    return true
  }
})

export const userAnswered = attach({
  effect: checkUserAnswer,
  source: combine({ type: $quizType, question: $questionInfo }),
  mapParams: (answer: string, { type, question }) => ({ type, answer, question })
})



$questionState.on(checkUserAnswer.finally, (_, data) => data.status)
$questionState.on($questionId, () => 'wait')

$questionError.reset($questionId)
$questionError.on(checkUserAnswer.failData, (_ , error) => error.message)


$questionId.on(sample($questionsList, nextQuestion), (current, list) => {
  let next = current
  while (next === current) {
    next = randomInt(list.length)
  }
  return next
})
