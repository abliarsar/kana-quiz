import React from 'react'
import {useStore} from 'effector-react'

import {$statsByGlyph} from '../../models/stats'
import {getPercentsFromStats} from '../../../../lib/get-percents-from-stats'
import styled from 'styled-components'


const StatsByGlyph = () => {
  const stats = useStore($statsByGlyph)

  return (
    <Styles>
      <h3>Статистика по символам</h3>
      <ScrollWrapper>
        <Table>
          <thead>
          <tr>
            <td>Символ</td>
            <td>Верно</td>
            <td>Неверно</td>
            <td>%</td>
            <td>Среднее время ответа</td>
          </tr>
          </thead>
          <tbody>
          {Object.entries(stats).map(([name, info]) => (
            <GlyphRow key={name} name={name} stats={info} />
          ))}
          </tbody>
        </Table>
      </ScrollWrapper>
    </Styles>
  )
}

export default StatsByGlyph


const Styles = styled.div`
  h3 {
    margin: 0;
    margin-bottom: 10px;
  }
`

const Table = styled.table`
  font-size: 13px;
  text-align: center;
`
const ScrollWrapper = styled.div`
  max-height: 80vh;
  overflow-y: auto;
`
const GlyphRow = ({name, stats}: { name: string, stats: [number, number] }) => {
  const [correct, wrong] = stats
  return (
    <tr>
      <td>{name}</td>
      <td>{correct}</td>
      <td>{wrong}</td>
      <td>{getPercentsFromStats(correct, wrong)} %</td>
      <td>-</td>
    </tr>
  )
}
