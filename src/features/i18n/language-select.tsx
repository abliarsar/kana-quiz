import { Trans } from '@lingui/react';
import styled from 'styled-components';
import { getDefaultLocale } from 'features/i18n/utils/get-default-locale';
import { setLocale } from 'features/i18n/utils/set-locale';
import { Locale, locales } from 'features/i18n/utils/constants';

export const LanguageSelect = () => {
  return (
    <div>
      <Select
        name="lng"
        id="lng"
        defaultValue={getDefaultLocale()}
        onChange={(e) => {
          setLocale(e.target.value as Locale)
        }}
      >
        {Object.entries(locales).map(([locale, localeName]) => (
          <option value={locale} key={locale}>{localeName}</option>
        ))}
      </Select>
    </div>
  )
}

const Select = styled.select`
  background-color: var(--surface-color-secondary);
  color: var(--text-color);
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
`
