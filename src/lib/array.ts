export const randomInt = (upper: number) => Math.floor(Math.random() * upper)

export const pickRandom = <T>(array: T[], count: number) => {

  if (count > array.length) return array
  if (count < 1) return []

  const set = new Set<T>()

  while (set.size < count) {
    const idx = randomInt(array.length)
    const item = array[idx]
    set.add(item)
  }

  return [...set]
}

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
