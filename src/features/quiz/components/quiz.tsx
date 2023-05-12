import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { QuizActionType, useQuiz } from 'features/quiz/use-quiz';
import StatsIcon from './icons/statistics';
import SettingsIcon from './icons/settings';
import ResetIcon from './icons/reset';
import CloseIcon from './icons/close';

import { QuizType } from '../types';

import Settings from './settings';
import Question from './question';
import StatsByType from './stats-by-type';
import StatsByGlyph from 'features/quiz/components/stats-by-glyph';
import { useEffect, useState } from 'react';


type Props = {
  type: string
}

const query = window.matchMedia('(max-width: 980px)');

const Quiz = ({ type }: Props) => {

  const { quizType } = useParams<{ quizType: QuizType }>();

  const hasAnswers = type === 'picker'
  const [state, dispatch] = useQuiz(hasAnswers, quizType!);
  const [isSettingsOpen, setSettingsOpen] = useState(!query.matches);
  const [isStatsOpen, setStatsOpen] = useState(!query.matches);

  useEffect(() => {

    const listener = () => {
      if (query.matches) {
        setSettingsOpen(false)
        setStatsOpen(false)
      }
    }
    query.addEventListener('change', listener);

    return () => {
      query.removeEventListener('change', listener)
    }
  }, [])
  return (
    <FlexRow>
      <ModalPanel isVisible={isSettingsOpen}>
        <div className="close-button" onClick={() => setSettingsOpen(false)}>
          <CloseIcon />
        </div>
        <Settings
          isAnswerPickerShown={hasAnswers}
          setAnswersCount={(answers) => {
            dispatch({ type: QuizActionType.change_answers_count, payload: answers })
          }}
          checkedGroups={state.settings.groups}
          toggleGroupTypes={(payload) => {
            dispatch({ type: QuizActionType.toggle_categories, payload })
          }}
        />
      </ModalPanel>
      <Styles>
        <ActionsRow>
          <Action onClick={() => setSettingsOpen(v => !v)}>
            <SettingsIcon />
            <span>Настройки</span>
          </Action>
          <Action onClick={() => dispatch({ type: QuizActionType.reset })}>
            <ResetIcon />
            <span>Сброс</span>

          </Action>
          <Action onClick={() => setStatsOpen(v => !v)}>
            <StatsIcon />
            <span>Статистика</span>
          </Action>
        </ActionsRow>
        <Question
          answers={state.settings.answers}
          quizType={quizType!}
          question={state.question}
          onNextQuestion={() => {
            dispatch({ type: QuizActionType.next_question })
          }}
          onSubmitUserAnswer={(answer) => {
            dispatch({ type: QuizActionType.submit_answer, payload: answer })
          }}
        />
        <StatsByType stats={state.statistics?.byType} />
      </Styles>
      <ModalPanel isVisible={isStatsOpen}>
        <div className="close-button" onClick={() => setStatsOpen(false)}>
          <CloseIcon />
        </div>
        <StatsByGlyph stats={state.statistics?.byGlyph} />
      </ModalPanel>
    </FlexRow>
  )
}

export default Quiz

const Styles = styled.div`
  min-width: 340px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 1.25rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: pre-line;
`;

const ModalPanel = styled.div<{ isVisible?: boolean }>`
  display: ${p => p.isVisible ? 'block' : 'none'};

  .close-button {
    display: none;
    svg {
      color: var(--text-color);
    }
  }

  @media (max-width: 980px) {
    z-index: 20;
    position: fixed;
    inset: 0;
    padding: 1rem;
    box-sizing: border-box;
    background: var(--surface-color);
     && {
       width: 100%;
     }

    .close-button {
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      margin: 20px;
    }
  }
`;

const FlexRow = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 20px;
  justify-content: space-between;
`

const ActionsRow = styled(FlexRow)`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;

  .mobile-only {
    display: none;
    @media (max-width: 980px) {
      display: block;
    }
  }
  svg {
    color: var(--text-color)
  }
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 0.25rem 0.625rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: var(--surface-color-secondary);
  }
  & + & {
    margin-left: 0.25rem;
  }
`
