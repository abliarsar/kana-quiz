import {createStore, sample} from 'effector'

import { userAnswered, $question } from './question'
import {QuestionType} from '../types'


export const $statsByGlyph = createStore<Record<string, [number, number]>>({})
export const $statsByType = createStore<Record<QuestionType, [number, number]>>({
  romaji: [0, 0],
  hiragana: [0, 0],
  katakana: [0, 0],
})

const updateStats = sample($question, userAnswered.finally, (question, { status }) => ({ question, status }))

$statsByType.on(updateStats, (state, { status, question }) => {
  const idx = status === 'done' ? 0 : 1
  state[question.type] = [...state[question.type]] as [number, number]
  state[question.type][idx] += 1
  return { ...state }

})

$statsByGlyph.on(updateStats, (state, { question, status }) => {
  const [romaji] = question.info
  const idx = status === 'done' ? 0 : 1
  if (!state[romaji]) {
    state[romaji] = [0 , 0]
  }
  else {
    state[romaji] = [...state[romaji]] as [number, number]
  }
  state[romaji][idx] += 1

  return { ...state }
})

export const $totalQuestions = $statsByType.map(obj => Object.values(obj).reduce((acc, stat) => acc + stat[0] + stat[1], 0))





