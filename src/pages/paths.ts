export const paths = {
  home: () => '/',
  quiz: (params: { quizType: string, withAnswers: boolean }) => `/quiz/${params.withAnswers ? 'picker' : 'input'}/${params.quizType}/`,
};
