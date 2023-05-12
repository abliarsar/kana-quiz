import { Link } from 'react-router-dom'

import {paths} from '../paths'
import Header from 'components/header';


const Home = () => (
  <>
    <Header/>
    <section>
      <h3 className="centered">Выберите тест</h3>
      <section className="centered">
        <h4 className="centered">あ {'->'} a</h4>
        <div><Link to={paths.quiz({ withAnswers: false, quizType: 'romaji'})}>Без вариантов ответа</Link></div>
        <div><Link to={paths.quiz({ withAnswers: true, quizType: 'romaji'})}>С вариантами ответов</Link></div>
      </section>
      <section className="centered">
        <h4 className="centered">a {'->'} あ</h4>
        <div><Link to={paths.quiz({ withAnswers: true, quizType: 'kana'})}>С вариантами ответов</Link></div>

      </section>
    </section>
  </>
)

export default Home
