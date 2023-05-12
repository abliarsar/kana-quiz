import { Dispatch, Reducer, ReducerAction, useReducer } from 'react';
import { IQuestion, KanaType, QuestionState, QuizType, StatsByType, SymbolGroupTag, SymbolInfo, StatsByGlyph, AnswerStats } from 'features/quiz/types';
import { QUESTIONS_LIST, SYMBOL_GROUPS } from 'lib/kana';
import { randomInt } from 'lib/array';


type QuizState = {
  question: IQuestion | null,
  settings: {
    groups: SymbolGroupTag[],
    answers: number | null,
    quizType: QuizType
  },
  questions: SymbolInfo[],
  statistics?: {
    byGlyph: StatsByGlyph,
    byType: StatsByType
  },
}

export enum QuizActionType {
  next_question,
  reset,
  toggle_categories,
  change_answers_count,
  submit_answer
}
type QuizAction =
 | { type: QuizActionType.next_question }
 | { type: QuizActionType.reset }
 | { type: QuizActionType.toggle_categories, payload: SymbolGroupTag[] }
 | { type: QuizActionType.submit_answer, payload: string }
 | { type: QuizActionType.change_answers_count, payload: number }


const getNewQuestionFromList = (currentQuestion: IQuestion | null, list: SymbolInfo[]): IQuestion | null => {
  let next = currentQuestion?.id;
  if (list.length === 0) return null
  while (next === currentQuestion?.id) {
    next = randomInt(list.length)
  }

  if (next == null) {
    console.log(currentQuestion, list)
    return null;
  }
  const question = {
    id: next,
    info: list[next]!,
    error: null,
    state: QuestionState.in_progress
  };

  return question
}

const updateStats = (prevStats: QuizState['statistics'], answer: { character: string, correct: boolean, type: KanaType }) => {


  const nextStats = prevStats || {
    byGlyph: {},
    byType: {
      [KanaType.hiragana]: [0, 0],
      [KanaType.katakana]: [0, 0]
    }
  }

  const typeStats: AnswerStats = [...nextStats.byType[answer.type]];

  const indexToUpdate = answer.correct ? 0 : 1;

  typeStats[indexToUpdate] = typeStats[indexToUpdate] + 1;
  nextStats.byType = {
    ...nextStats.byType,
    [answer.type]: typeStats
  }

  const prevGlyphState = nextStats.byGlyph[answer.character] || [0, 0]
  const glyphStats: AnswerStats = [...prevGlyphState] ;
  glyphStats[indexToUpdate] = prevGlyphState[indexToUpdate] + 1;

  nextStats.byGlyph = {
    ...nextStats.byGlyph,
    [answer.character]: glyphStats
  }
  return nextStats
}
const updateQuestionStatus = (state: QuizState, answer: string) => {
  if (!state.question || state.question.state !== QuestionState.in_progress ) return state;
  const { data, group: [kanaType] } = state.question.info;

  const isRomajiQuiz = state.settings.quizType === 'romaji'
  const answerIndex = isRomajiQuiz ? 0 : 1;
  const questionIndex = isRomajiQuiz ? 1 : 0;
  const correctAnswer = data[answerIndex];

  const statistics = updateStats(state.statistics, {
    character: data[questionIndex],
    correct: correctAnswer === answer,
    type: kanaType
  });

  if (answer !== correctAnswer) {
    return {
      ...state,
      statistics,
      question: {
        ...state.question,
        error: `Правильный ответ - ${correctAnswer}`,
        state: QuestionState.wrong
      },
    }
  }
  else {
    return {
      ...state,
      statistics,
      question: {
        ...state.question,
        state: QuestionState.correct
      }
    }
  }
}
const reducer: Reducer<QuizState, QuizAction> = (state: QuizState, action: QuizAction): QuizState => {

  switch (action.type) {
    case QuizActionType.next_question: {
      const nextState = {
        ...state,
        question: getNewQuestionFromList(state.question, state.questions)
      }
      const question = state.question;
      if (question?.state === QuestionState.in_progress) {
        nextState.statistics = updateStats(nextState.statistics, {
           type: question.info.group[0],
           character: question.info.data[1],
           correct: false
         })
      }
      return nextState
    }
    case QuizActionType.reset: {

      return {
        ...state,
        statistics: undefined
      }
    }
    case QuizActionType.toggle_categories: {
      const getNextSelectedGroups = (prevGroups: SymbolGroupTag[], payload: SymbolGroupTag[]) => {
        const set = new Set(prevGroups)

        const toggleItemInSet = (item: SymbolGroupTag) => {
          if (set.has(item)) {
            set.delete(item)
          } else {
            set.add(item)
          }
        }

        payload.forEach(toggleItemInSet)

        return Array.from(set)
      };

      const groups = getNextSelectedGroups(state.settings.groups, action.payload);
      const questions = QUESTIONS_LIST.filter(item => groups.includes(item.group))
      return {
        ...state,
        settings: {
          ...state.settings,
          groups
        },
        question: getNewQuestionFromList(state.question, questions),
        questions
      }
    }
    case QuizActionType.submit_answer: {
      return updateQuestionStatus(state, action.payload)
    }
    case QuizActionType.change_answers_count: {
      console.log('unimplemented')
      return state;
    }
  }

  return state
};

export const useQuiz = (hasAnswers: boolean, quizType: QuizType) => {
  const initialState: QuizState = {
    question: getNewQuestionFromList(null, QUESTIONS_LIST),
    settings: {
      groups: SYMBOL_GROUPS.map(i => i.type),
      answers: hasAnswers ? 5 : null,
      quizType,
    },
    questions: QUESTIONS_LIST
  }
  // todo: webstorm typescript
  return useReducer(reducer, initialState) as any as [QuizState, Dispatch<ReducerAction<typeof reducer>>]
}
