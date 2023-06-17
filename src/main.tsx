import React from 'react'
import ReactDOM from 'react-dom/client'

import { getDefaultColorMode } from 'features/color-mode/toggle';

import App  from './app';

import './styles/index.css'
import { getDefaultLocale, setLocale } from 'features/i18n';

getDefaultColorMode();
setLocale(getDefaultLocale())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);


