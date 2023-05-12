export type QuizType = 'kana' | 'romaji'

export enum QuestionState {
  in_progress,
  correct,
  wrong
}

export type IQuestion = {
  state: QuestionState,
  info: SymbolInfo,
  id: number,
  error: string | null,
};

export type QuestionType = 'hiragana' | 'katakana' | 'romaji'

export enum SymbolType {
  monograph,
  monograph_diacritics,
  digraph,
  digraph_diacritics,
}

export enum KanaType {
  hiragana,
  katakana
}

export type SymbolInfo = {
  group: SymbolGroupTag,
  name: string,
  data: [romaji: string, glyph: string]
}

export type SymbolGroupTag = [KanaType, SymbolType]

export type SymbolGroupType = {
  type: SymbolGroupTag,
  data: Array<SymbolInfo['data']>
}


export type AnswerStats = [correct: number, wrong: number]

export type StatsByGlyph = Record<string, AnswerStats>
export type StatsByType = Record<KanaType, AnswerStats>
