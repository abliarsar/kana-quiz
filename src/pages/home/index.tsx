import { Link } from 'react-router-dom'

import {paths} from '../paths'


const Home = () => (
  <section>
    <h3>Выберите тест</h3>
    <ul>
      <li>
        <span>あ {'->'} a</span>
        <ul>
          <li><Link to={paths.quiz({ withAnswers: false, quizType: 'romaji'})}>Без вариантов ответа</Link></li>
          <li><Link to={paths.quiz({ withAnswers: true, quizType: 'romaji'})}>С вариантами ответов</Link></li>
        </ul>
      </li>
      <li>
        <span>a {'->'} あ</span>
        <ul>
          <li><Link to={paths.quiz({ withAnswers: true, quizType: 'kana'})}>С вариантами ответов</Link></li>
        </ul>
      </li>
    </ul>
  </section>
)

export default Home
