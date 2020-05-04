import React from 'react'
import {useStore} from 'effector-react'

import {$quizType} from '../../models/settings'
import {$statsByType} from '../../models/stats'


const StatsByGlyphType = () => {
  const type = useStore($quizType)
  const stats = useStore($statsByType)

  switch (type) {
    case 'kana': {
      return (
        <section>
          <div>
            <div>Статистика</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>+ {stats.romaji[0]}</div>
              <div>- {stats.romaji[1]}</div>
            </div>
          </div>
        </section>
      )
    }
    case 'romaji': {
      return  (
        <section style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <div>Хирагана</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>+ {stats.hiragana[0]}</div>
              <div>- {stats.hiragana[1]}</div>
            </div>
          </div>
          <div>
            <div>Катакана</div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div>+ {stats.katakana[0]}</div>
              <div>- {stats.katakana[1]}</div>
            </div>
          </div>
        </section>
      )
    }
  }
  return null
}

export default StatsByGlyphType
