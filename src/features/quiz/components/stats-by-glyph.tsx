import React from 'react'
import styled from 'styled-components';

import {getPercentsFromStats} from 'lib/get-percents-from-stats'
import { StatsByGlyph as StatsByGlyphType } from 'features/quiz/types';


// todo types
interface StatsByGlyphProps {
  stats: StatsByGlyphType | undefined
}

const StatsByGlyph = ({ stats = {} }: StatsByGlyphProps) => {


 const keys = Object.keys(stats);

  if (keys.length === 0) return (
    <Styles>
      <h3>Статистика</h3>
      <div className="centered">Нет результатов</div>
    </Styles>
  )
  return (
    <Styles>
      <h3>Статистика</h3>
      <Table>
       <thead>
       <tr>
         <th width="25%">Символ</th>
         <th width="25%">Верно</th>
         <th width="25%">Ошибок</th>
         <th width="25%">%</th>
       </tr>
       </thead>
       <tbody>
       {keys.map(key => {
         const [correct, wrong] = stats[key];

         const percent = getPercentsFromStats(correct, wrong)
         return (
           <tr key={key}>
             <td>{key}</td>
             <td>{correct}</td>
             <td>{wrong}</td>
             <td>{percent}</td>
           </tr>
         )
       })}
       </tbody>
     </Table>
    </Styles>
  )
}

export default StatsByGlyph


const Styles = styled.section`
  h3 {
    text-align: center;
  }
  min-width: 300px;
  max-width: 100%;
  max-height: 85vh;
  overflow: auto;
`;


const Table = styled.table`
  width: 100%;
  th, td {
    min-width: 25%;
    text-align: right;
    &:first-child {
      text-align: center;
    }
    &:last-child {
      padding-right: 0.5rem;
    }
  }
  td {
    &:first-child {
      font-weight: 600;
    }
  }
  tbody tr:nth-child(odd) {
    background-color: var(--surface-color-secondary);
  }
`
