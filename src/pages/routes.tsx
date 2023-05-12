import {
  createBrowserRouter,
} from "react-router-dom";

import { paths } from './paths';
import Home from './home';
import { QuizWithInput, QuizWithPicker } from './quiz';
import NotFoundPage from './not-found';

export const router = createBrowserRouter([
  {
    path: paths.home(),
    element: <Home />,
    errorElement: <NotFoundPage />
  },
  {
    path: paths.quiz({ quizType: ':quizType', withAnswers: true }),
    element: <QuizWithPicker />,
  },
  {
    path: paths.quiz({ quizType: ':quizType', withAnswers: false }),
    element: <QuizWithInput />,
  },
], {
  basename: '/kana-quiz/'
});
