import {createStore, sample} from 'effector'

import {$question, userAnswered} from './question'
import {$quizType, reset} from './settings'
import {KanaType, QuestionType} from '../types'


type WinLossCounterType = [number, number]
export const $statsByGlyph = createStore<Record<string, WinLossCounterType>>({})
export const $statsByType = createStore<Record<QuestionType, WinLossCounterType>>({
  romaji: [0, 0],
  hiragana: [0, 0],
  katakana: [0, 0],
})

const updateStats = sample([$question, $quizType], userAnswered.finally, ([question, answerType], { status }) => ({ question, status, answerType }))

$statsByType.on(updateStats, (state, { status, question, answerType }) => {
  const idx = status === 'done' ? 0 : 1
  const [kanaType] = question.info.group
  const kanaKey = kanaType === KanaType.hiragana ? 'hiragana' : 'katakana'

  const type = answerType !== 'kana' ? kanaKey : 'romaji'
  state[type] = [...state[type]] as WinLossCounterType
  state[type][idx] += 1
  return { ...state }

})

$statsByGlyph.on(updateStats, (state, { question, status }) => {
  const { name } = question.info
  const idx = status === 'done' ? 0 : 1
  if (!state[name]) {
    state[name] = [0 , 0]
  }
  else {
    state[name] = [...state[name]] as WinLossCounterType
  }
  state[name][idx] += 1

  return { ...state }
})


export const $totalQuestions = $statsByType.map(obj => Object.values(obj).reduce((acc, stat) => acc + stat[0] + stat[1], 0))


$statsByType.reset(reset)
$statsByGlyph.reset(reset)


