export const getPercentsFromStats = (correct: number, wrong: number) => Math.trunc(correct * 100 / (correct + wrong)) || 0;
