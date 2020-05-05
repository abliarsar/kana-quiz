import {createEvent, createStore, forward} from 'effector'

import {QUESTIONS_LIST, SYMBOL_GROUPS} from 'lib/kana-syllabary'

import {QuizType, SymbolGroupTag} from '../types'


export const $quizType = createStore<QuizType>('romaji')
export const $allowedGroupTypes = createStore<SymbolGroupTag[]>(SYMBOL_GROUPS.map(i => i.type))
export const $questionsList = createStore(QUESTIONS_LIST)
export const $isQuestionsListEmpty = $questionsList.map(i => i.length === 0)

export const setQuizType = createEvent<QuizType>()
export const toggleGroupType = createEvent<SymbolGroupTag | SymbolGroupTag[]>()


$quizType.on(setQuizType, (_, v) => v)

$questionsList.on($allowedGroupTypes, (_, types) => {
  return QUESTIONS_LIST.filter(item => types.includes(item.group))
})

$allowedGroupTypes.on(toggleGroupType, (state, payload) => {
  const set = new Set(state)
  const isSymbolGroupTag = (a: SymbolGroupTag | SymbolGroupTag[]): a is SymbolGroupTag => !Array.isArray(a[0])

  const toggleItemInSet = (item: SymbolGroupTag) => {
    if (set.has(item)) { set.delete(item) }
    else { set.add(item) }
  }

  if (isSymbolGroupTag(payload)) { toggleItemInSet(payload) }
  else { payload.forEach(toggleItemInSet) }

  return Array.from(set)
})
