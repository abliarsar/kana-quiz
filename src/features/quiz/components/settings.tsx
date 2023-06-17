import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/react';
import {SYMBOL_GROUPS} from 'lib/kana'
import { KanaType, SymbolGroupTag, SymbolType } from '../types';


const KANA_NAMES = {
  [KanaType.hiragana]: <Trans id="CKIRRi" />,
  [KanaType.katakana]: <Trans id="MFSuHZ" />,
}
const GROUP_NAMES = {
  [SymbolType.monograph]: <Trans id="ZtuqKW" />,
  [SymbolType.monograph_diacritics]: <Trans id="Wr0wv0" />,
  [SymbolType.digraph]: <Trans id="1S+Slr" />,
  [SymbolType.digraph_diacritics]: <Trans id="5S7klo" />,
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

interface SettingsProps {
  checkedGroups: SymbolGroupTag[],
  toggleGroupTypes: (tags: SymbolGroupTag[]) => void;
  setAnswersCount: (count: number) => void;
  isAnswerPickerShown: boolean,
}

const Settings = ({ checkedGroups, toggleGroupTypes }: SettingsProps) => {
  return (
    <Styles>
      <h3>Настройки</h3>
      {tagsByKanaType.map(([kana, groups]) => {
        const all = groups.every(group => checkedGroups.includes(group))
        return (
          <React.Fragment key={kana}>
            <Option
              onClick={() => {
                if (all) { toggleGroupTypes(groups) }
                else {
                  toggleGroupTypes(groups.filter(group => !checkedGroups.includes(group)))
                }
              }}
            >
              <input
                type="checkbox"
                readOnly
                checked={all}
              />
              {KANA_NAMES[kana]}
            </Option>
            <OptionGroup>
              {groups.map((group) => {
                const [_, symbolType] = group
                return (
                  <Option onClick={() => toggleGroupTypes([group])} key={symbolType}>
                    <input
                      type="checkbox"
                      readOnly
                      checked={checkedGroups.includes(group)}
                    />
                    {GROUP_NAMES[symbolType]}
                  </Option>
                )
              })}
            </OptionGroup>
          </React.Fragment>
        )
      })}
    </Styles>
  )
}

export default Settings



const OptionGroup = styled.div`
  padding-left: 1.5rem;
`;

const Option = styled.div`
  cursor: pointer;
`;

const Styles = styled.section`
  h3 {
    text-align: center;
  }
  display: inline-block;
  max-width: 100%;
  width: 100%;
  min-width: 300px;
  padding-right: 1rem;
`
