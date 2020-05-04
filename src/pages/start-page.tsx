import React from 'react'
import { Link } from 'react-router-dom'

const StartPage = () => (
  <section>
    <h3> Стартовая страница</h3>
    <ul>
      <li>
        <span>あ -> a</span>
        <ul>
          <li><Link to="/type">Без вариантов ответа</Link></li>
          <li><Link to="/choose">С вариантами ответов</Link></li>
        </ul>
      </li>
      <li>
        <span>a -> あ</span>
        <ul>
          <li><Link to="/choose">С вариантами ответов</Link></li>
        </ul>
      </li>
    </ul>
  </section>
)

export default StartPage
