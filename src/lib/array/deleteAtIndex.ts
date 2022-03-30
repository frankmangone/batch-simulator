interface DeleteAtIndexParams<T> {
  array: T[]
  index: number
}

const deleteAtIndex = <T>(params: DeleteAtIndexParams<T>): T[] => {
  const { array, index } = params

  return [...array.slice(0, index), ...array.slice(index + 1, array.length)]
}

export default deleteAtIndex
