import React from 'react'
import {useStore} from 'effector-react'
import styled from 'styled-components'

import {$statsByType} from '../../models/stats'
import {KanaType} from '../../types'


const StatsByGlyphType = () => {
  const stats = useStore($statsByType)

  return (
    <Styles>
      <StatBlock
        title="Хирагана"
        stats={stats[KanaType.hiragana]}
      />
      <StatBlock
        title="Катакана"
        stats={stats[KanaType.katakana]}
      />
    </Styles>
  )
}

export default StatsByGlyphType

const Styles = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const StatBlock = (props: { stats: [number, number], title: string }) => {
  const [correct, wrong] = props.stats
  return (
    <StatsSectionStyles>
      <h6>{props.title}</h6>
      <div className="row">
        <div className="cell cell--green">{correct}</div>
        <div className="cell cell--red">{wrong}</div>
      </div>
      <div>
        {Math.trunc(correct * 100 / (correct + wrong)) || 0} %
      </div>
    </StatsSectionStyles>
  )
}

const StatsSectionStyles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  h6 {
    margin: 0;
    font-size: 20px;
  }
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .cell {
    font-size: 32px;
    padding: 5px 10px;
    font-weight: bold;
    &--green {
      color: forestgreen;
    }
    &--red {
      color: darkred;
    }
  }
`
