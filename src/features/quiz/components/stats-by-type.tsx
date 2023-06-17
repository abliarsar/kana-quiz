import React, { ReactNode } from 'react';
import styled from 'styled-components'
import { Trans } from '@lingui/react'

import {getPercentsFromStats} from 'lib/get-percents-from-stats'
import { AnswerStats, KanaType, IStatsByType } from 'features/quiz/types';


interface StatsByTypeProps {
  stats: IStatsByType | undefined
}

const StatsByType = ({ stats }: StatsByTypeProps) => {
  return (
    <Styles>
      <StatBlock
        title={<Trans id="CKIRRi"/>}
        stats={stats?.[KanaType.hiragana]}
      />
      <StatBlock
        title={<Trans id="MFSuHZ"/>}
        stats={stats?.[KanaType.katakana]}
      />
    </Styles>
  )
}

export default StatsByType

const Styles = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const StatBlock = (props: { stats: AnswerStats | undefined, title: ReactNode }) => {
  const [correct, wrong] = props.stats || [0, 0]
  return (
    <StatsSectionStyles>
      <h6>{props.title}</h6>
      <div className="row">
        <div className="cell cell--green">{correct}</div>
        <div className="cell cell--red">{wrong}</div>
      </div>
      <div>
        {getPercentsFromStats(correct, wrong)} %
      </div>
    </StatsSectionStyles>
  )
}

const StatsSectionStyles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.125rem;
  h6 {
    margin: 0;
    font-size: 1.25rem;
  }
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .cell {
    font-size: 2rem;
    padding: 5px 10px;
    font-weight: bold;
    &--green {
      color: var(--success-color);
    }
    &--red {
      color: var(--error-color);
    }
  }
`
