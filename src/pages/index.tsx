import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import {paths} from './paths'
import Home from './home'
import { QuizWithAnswers, QuizWithInput } from './quiz'



export const Pages = () => (
  <div>
    <header>
      <Link to={paths.home()}> К выбору теста</Link>
    </header>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path={paths.quiz(':answerType(romaji|kana)', true)} component={QuizWithAnswers} />
      <Route exact path={paths.quiz(':answerType(romaji)', false)} component={QuizWithInput} />
      <Route render={() => <div>Путь не найден</div>}/>
    </Switch>
  </div>
)
