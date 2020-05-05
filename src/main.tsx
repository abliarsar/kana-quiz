import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import {Pages} from './pages'


const root = document.getElementById('root')!

const App = () => (
  <BrowserRouter>
    <Pages />
  </BrowserRouter>
)

render(<App/>, root)
