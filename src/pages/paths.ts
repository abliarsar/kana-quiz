export const paths = {
  home: () => '/',
  quiz: (answerType: string, withAnswers: boolean) => `/quiz/${answerType}/${withAnswers ? 'picker' : 'input'}`,
}
