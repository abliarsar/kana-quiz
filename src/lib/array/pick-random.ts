import {randomInt} from './random-int'

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
