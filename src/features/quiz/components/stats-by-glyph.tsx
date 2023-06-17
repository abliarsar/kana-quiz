import React from 'react'
import styled from 'styled-components';
import { Trans } from '@lingui/react';

import {getPercentsFromStats} from 'lib/get-percents-from-stats'
import { IStatsByGlyph as StatsByGlyphType } from 'features/quiz/types';


interface StatsByGlyphProps {
  stats: StatsByGlyphType | undefined
}

const StatsByGlyph = ({ stats = {} }: StatsByGlyphProps) => {


 const keys = Object.keys(stats);

 const header = (
   <h3>
     <Trans id="Vcj5Mb" />
   </h3>
 )
  if (keys.length === 0) return (
    <Styles>
      {header}
      <div className="centered">
        <Trans id="En1wua" />
      </div>
    </Styles>
  )
  return (
    <Styles>
      {header}
      <Table>
       <thead>
       <tr>
         <th><Trans id="iYI1rv" /></th>
         <th ><Trans id="ex64Zh" /></th>
         <th><Trans id="sdXtd/" /></th>
         <th>%</th>
       </tr>
       </thead>
       <tbody>
       {keys.map(key => {
         const [correct, wrong] = stats[key];

         const percent = getPercentsFromStats(correct, wrong)
         return (
           <tr key={key}>
             <td width="25%">{key}</td>
             <td width="25%">{correct}</td>
             <td width="25%">{wrong}</td>
             <td width="25%">{percent}</td>
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
