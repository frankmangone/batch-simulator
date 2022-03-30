interface ReplaceAtIndexParams<T> {
  array: T[]
  index: number
  newElement: T
}

const replaceAtIndex = <T>(params: ReplaceAtIndexParams<T>): T[] => {
  const { array, index, newElement } = params

  return [
    ...array.slice(0, index),
    newElement,
    ...array.slice(index + 1, array.length),
  ]
}

export default replaceAtIndex
