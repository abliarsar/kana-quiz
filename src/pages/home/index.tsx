import { Link } from 'react-router-dom'
import { Trans } from '@lingui/react'
import {paths} from '../paths'
import Header from 'components/header';


const Home = () => (
  <>
    <Header/>
    <section>
      <h3 className="centered">
        <Trans id="0dxyV8" />
      </h3>
      <section className="centered">
        <h4 className="centered">あ {'->'} a</h4>
        <div><Link to={paths.quiz({ withAnswers: false, quizType: 'romaji'})}>
          <Trans id="kcZJIy" />
        </Link></div>
        <div><Link to={paths.quiz({ withAnswers: true, quizType: 'romaji'})}>
          <Trans id="pzNAnq" />
        </Link></div>
      </section>
      <section className="centered">
        <h4 className="centered">a {'->'} あ</h4>
        <div><Link to={paths.quiz({ withAnswers: true, quizType: 'kana'})}>
          <Trans id="pzNAnq" />
        </Link></div>
      </section>
    </section>
  </>
)

export default Home
