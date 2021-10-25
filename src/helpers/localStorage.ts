export const loadFromKey = (key: string) => {
  try {
    const serializedSlice = localStorage.getItem(key)
    if (serializedSlice === null) {
      return undefined
    }
    return JSON.parse(serializedSlice)
  } catch (err) {
    return undefined
  }
}

export const saveToKey = <T extends unknown>(state: T, key: string) => {
  try {
    const serializedSlice = JSON.stringify(state)
    localStorage.setItem(key, serializedSlice)
  } catch (error) {
    console.error(error)
  }
}
