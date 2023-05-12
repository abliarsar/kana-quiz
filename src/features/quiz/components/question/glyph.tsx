import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { IQuestion, QuestionState, QuizType } from 'features/quiz/types';


interface QuestionGlyphProps {
  type: QuizType,
  question: IQuestion,
}
const QuestionGlyph = ({ type, question }: QuestionGlyphProps ) => {
  const { info, state } = question

  const index = type == 'kana' ? 0 : 1

  return (
    <Block className={classNames({
      pad: type == 'romaji',
      correct: state === QuestionState.correct,
      wrong: state === QuestionState.wrong
    })}>
      {info.data[index]}
    </Block>
  )
}

export default QuestionGlyph

const Block = styled.div`
  font-size: 70px;
  text-align: center;
  font-weight: bolder;
  border: 2px solid #333;
  border-radius: 5px;
  &.correct {
    border-color: var(--success-color);
  }
  &.wrong {
   border-color: var(--error-color);
  }
  &.pad {
    padding-bottom: 10px;
  }
`
