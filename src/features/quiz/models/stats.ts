import {createEvent, createStore, forward, sample} from 'effector'

import {$question, userAnswered} from './question'
import {$quizType, setQuizType} from './settings'
import { KanaType } from '../types'


type WinLossCounterType = [number, number]

export const $statsByGlyph = createStore<Record<string, WinLossCounterType>>({})
export const $statsByType = createStore<Record<KanaType, WinLossCounterType>>({
  [KanaType.hiragana]: [0, 0],
  [KanaType.katakana]: [0, 0],
})
export const $totalQuestions = $statsByType.map(obj => Object.values(obj).reduce((acc, stat) => acc + stat[0] + stat[1], 0))

const resetStats = createEvent()


const updateStats = sample({
  source: [$question, $quizType],
  clock:userAnswered.finally,
  fn: ([question, answerType], { status }) => ({ question, status, answerType })
})

$statsByType.on(updateStats, (state, { status, question }) => {
  const next = { ...state }
  const idx = status === 'done' ? 0 : 1

  const [kanaType] = question.info.group

  next[kanaType] = [...next[kanaType]] as WinLossCounterType
  next[kanaType][idx] += 1

  return next

})

$statsByGlyph.on(updateStats, (state, { question, status }) => {
  const { name } = question.info
  const idx = status === 'done' ? 0 : 1
  const next = { ...state }
  if (!next[name]) {
    next[name] = [0 , 0]
  }
  else {
    next[name] = [...next[name]] as WinLossCounterType
  }
  next[name][idx] += 1

  return next
})


forward({ from: setQuizType, to: resetStats })

$statsByType.reset(resetStats)
$statsByGlyph.reset(resetStats)


