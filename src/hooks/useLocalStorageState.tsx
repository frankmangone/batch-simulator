import { useEffect, useRef, useState } from "react"

interface ISerialization<T> {
  serialize: (value: T) => string
  deserialize: (value: string) => T
}

const useLocalStorageState = <T extends unknown>(
  key: string,
  defaultValue: T | undefined = undefined,
  options: ISerialization<T> = {
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  }
) => {
  const { serialize, deserialize } = options

  /**
   * The callback in useState is only called for state initialization
   *  */
  const [state, setState] = useState<T>((): T => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue
  })

  /**
   * Keep a reference to the old key in localStorage,
   * to delete it if the key changes
   */
  const prevKeyRef = useRef(key)

  useEffect(() => {
    // Check if key has changed, and remove previous key if necessary
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
      prevKeyRef.current = key
    }

    // Set item in localStorage
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

export default useLocalStorageState
