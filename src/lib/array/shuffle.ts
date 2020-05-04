export const shuffle = <T>(input: Array<T>) => {
  const arr = input.slice()
  let i: number
  let j: number
  const { length } = arr
  let temp: T
  for (i = 0; i < length; i++) {
    j = ~~(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
