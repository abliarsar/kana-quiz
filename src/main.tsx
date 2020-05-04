import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import StartPage from './pages/start-page'
import QuizPage from './features/quiz/quiz-component'


const root = document.getElementById('root')!

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={StartPage} />
      <Route path="/quiz" component={QuizPage} />
    </Switch>
  </BrowserRouter>
)
render(<App/>, root)
