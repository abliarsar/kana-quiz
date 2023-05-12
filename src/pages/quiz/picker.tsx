import Quiz from 'features/quiz/components/quiz';
import Header from 'components/header';

const QuizWithPicker = () => {
  return  (
    <>
      <Header/>
      <Quiz type="picker" />
    </>
  )
};

export default QuizWithPicker
