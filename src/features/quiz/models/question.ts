import {attach, combine, createEffect, createEvent, createStore, sample} from 'effector'
import {list} from 'lib/kana-syllabary'

import {randomInt} from 'lib/generate/random-int'

import {QuestionState, QuestionType, QuizType} from '../types'
import {$questionsList, $quizType} from './settings'

type QuestionInfo = (typeof list)[number]


export const $questionId = createStore(0)
export const $questionInfo = combine($questionId, $questionsList, (id, list) => list[id])
export const $questionState = createStore<QuestionState>('wait')
export const $questionType = createStore<QuestionType>('hiragana')
export const $questionError = createStore<string | null>(null)

export const $question = combine({
  info: $questionInfo,
  state: $questionState,
  error: $questionError,
  id: $questionId,
  type: $questionType,
})

export const nextQuestion = createEvent()

type CheckUserAnswerParams  = { type: QuizType, answer: string, question: QuestionInfo }

const checkUserAnswer = createEffect<CheckUserAnswerParams, boolean>({
  handler: (params) => {
    if (params.type === 'romaji') {
      if (params.question[0] !== params.answer) throw new Error(`Правильный ответ - ${params.question[0]}`)
    }
    return true
  }
})

export const userAnswered = attach({
  effect: checkUserAnswer,
  source: combine({ type: $quizType, question: $questionInfo, questionType: $questionType }),
  mapParams: (answer: string, { type, question }) => ({ type, answer, question })
})



$questionState.on(checkUserAnswer.finally, (_, data) => data.status)
$questionState.on($questionId, () => 'wait')

$questionError.reset($questionId)
$questionError.on(checkUserAnswer.failData, (_ , error) => error.message)

$questionType.on(sample($quizType, nextQuestion), (_, quizType) => {
  if (quizType === 'kana') return 'romaji'
  const options = ['hiragana', 'katakana'] as const
  const idx = randomInt(options.length)
  return options[idx]
})

$questionId.on(sample($questionsList, nextQuestion), (current, list) => {
  let next = current
  while (next === current) {
    next = randomInt(list.length)
  }
  return next
})
