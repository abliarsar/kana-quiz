import { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Trans } from '@lingui/react';


type ColorMode = 'light' | 'dark';

export const getDefaultColorMode = (): ColorMode => {

  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const defaultMode: ColorMode = query.matches ? 'dark' : 'light'
  const mode = localStorage.getItem('color-mode') || defaultMode;

  document.body.setAttribute('data-theme', mode);

  return mode as ColorMode;
};

const ColorModeToggle = () => {

  const [mode, setMode] = useState(getDefaultColorMode);

  useLayoutEffect(() => {
    document.body.setAttribute('data-theme', mode);

    localStorage.setItem('color-mode', mode)
  }, [mode])

  return (
    <div>
      <Select name="color-mode" id="color-mode" value={mode} onChange={(e) => {
        setMode(e.target.value as ColorMode)
      }}>
        <option value="" disabled>
          <Trans id="HpP7vI" />
        </option>
        <option value="dark">
          <Trans id="3czpIy" />
        </option>
        <option value="light">
          <Trans id="I2XefD" />
        </option>
      </Select>
    </div>
  )
}

export default ColorModeToggle;


const Select = styled.select`
  background-color: var(--surface-color-secondary);
  color: var(--text-color);
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
`
