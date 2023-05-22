import { useMemo } from 'react';
import styled from 'styled-components';

import { QUESTIONS_LIST } from 'lib/kana';
import { pickRandom, shuffle } from 'lib/array';
import { IQuestion, QuestionState, QuizType } from 'features/quiz/types';

interface AnswersProps {
  question: IQuestion,
  answersCount: number,
  onAnswerClick: (answer: string) => void,
  quizType: QuizType
}


const Answers = ({ onAnswerClick, answersCount, question, quizType }: AnswersProps) => {
  const { info, state } = question;


  const options = useMemo(() => {
    const correct = QUESTIONS_LIST.find(data => data.name === info.name)!
    const alternatives = QUESTIONS_LIST.filter(item => item.group[0] === correct.group[0] && item.data[0] !== correct.data[0])

    const wrong = pickRandom(alternatives, answersCount).slice(0, answersCount - 1)

    const answers = shuffle([...wrong, correct])
    return answers.map( ({data}) => quizType === 'kana' ? data[1] : data[0])
  }, [ quizType, answersCount, info ]);

  return (
    <Styles>
      {options.map(data => (
        <Button
          key={data}
          type="button"
          disabled={state !== QuestionState.in_progress}
          onClick={() => onAnswerClick(data)}
        >
          {data}
        </Button>
      ))}
    </Styles>
  )
}

export default Answers;

const Styles = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Button = styled.button`
  width: calc(33% - 2px);
  font-size: 1.25rem;
  margin: 1px;
  font-weight: bold;
  
  cursor: pointer;
  background: var(--white-color);
  color: var(--black-color);
  border: 1px solid var(--text-color);
  border-radius: 5px;
  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
`
