import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyles } from './styles/global-styles'
import { Pages } from './pages'


const root = document.getElementById('root')!

const App = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </>
)

render(<App/>, root)
