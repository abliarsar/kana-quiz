import {createStore} from 'effector'

import {list} from 'lib/kana-syllabary'

import {QuizType} from '../types'


export const $quizType = createStore<QuizType>('romaji')

export const $allowedTypes = createStore([])

export const $questionsList = createStore(list)

