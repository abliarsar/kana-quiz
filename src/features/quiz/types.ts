
export type QuizType = 'kana' | 'romaji'

export type QuestionState = 'wait' | 'done' | 'fail'

export type QuestionType = 'hiragana' | 'katakana' | 'romaji'

export enum SymbolType {
  monograph,
  monograph_diacritics,
  digraph,
  digraph_discritics,
}
export enum KanaType {
  hiragana,
  katakana
}

export type SymbolInfo = {
  group: SymbolGroupTag,
  name: string,
  data: [string, string] // [romaji, glyph]
}

export type SymbolGroupTag = [KanaType, SymbolType]

export type SymbolGroupType = {
  type: SymbolGroupTag,
  data: Array<SymbolInfo['data']>
}
