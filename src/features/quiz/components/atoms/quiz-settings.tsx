import React from 'react'
import {KanaType, SymbolGroupTag, SymbolType} from '../../types'
import {SYMBOL_GROUPS} from '../../../../lib/kana-syllabary'
import {useStore} from 'effector-react'
import {$allowedGroupTypes, toggleGroupType} from '../../models/settings'


const KANA_NAMES = {
  [KanaType.hiragana]: 'Хирагана',
  [KanaType.katakana]: 'Катакана',
}
const GROUP_NAMES = {
  [SymbolType.monograph]: 'Монографы',
  [SymbolType.monograph_diacritics]: 'Монографы c диакритикой',
  [SymbolType.digraph]: 'Диграфы',
  [SymbolType.digraph_discritics]: 'Диграфы c диакритикой',
}

const symbolGroupTags = SYMBOL_GROUPS.map(i => i.type)


const tagsByKanaTypeMap = symbolGroupTags.reduce((acc, tag) => {
  const [kana] = tag
  const group = acc.get(kana)
  if (!group) {
    acc.set(kana, [tag])
    return acc
  }
  group.push(tag)
  return acc
}, new Map<KanaType, SymbolGroupTag[]>())


const tagsByKanaType = [...tagsByKanaTypeMap.entries()]

const QuizSettings = () => {
  const checked = useStore($allowedGroupTypes)

  return (
    <section>
      {tagsByKanaType.map(([kana, groups]) => {
        const all = groups.every(group => checked.includes(group))
        return (
          <>
            <div onClick={() => {
              if (all) { toggleGroupType(groups) }
              else {
                toggleGroupType(groups.filter(group => !checked.includes(group)))
              }
            }}>
              <input
                type="checkbox"
                readOnly
                checked={all}
              />
              {KANA_NAMES[kana]}
            </div>
            <div>
              {groups.map((group) => {
                const [_, symbolType] = group
                return (
                  <div onClick={() => toggleGroupType(group)}>
                    <input
                      type="checkbox"
                      readOnly
                      checked={checked.includes(group)}
                    />
                    {GROUP_NAMES[symbolType]}
                  </div>
                )
              })}
            </div>
          </>
        )
      })}
    </section>
  )
}

export default QuizSettings
