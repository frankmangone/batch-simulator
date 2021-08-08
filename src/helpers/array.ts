export const lastElement = <T extends unknown>(array: Array<T>): T => {
  return array[array.length - 1]
}
