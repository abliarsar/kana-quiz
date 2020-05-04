import {createEvent, createStore} from 'effector'

import {QUESTIONS_LIST} from 'lib/kana-syllabary'

import {QuizType} from '../types'


export const $quizType = createStore<QuizType>('romaji')

export const $allowedTypes = createStore([])

export const $questionsList = createStore(QUESTIONS_LIST)

export const reset = createEvent()

