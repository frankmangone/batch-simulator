import { useEffect, useState } from "react"
import loader from "@assemblyscript/loader"

export const useWasmModule = (moduleName: string) => {
  const [module, setModule] = useState<any>(undefined)
  const [memory, setMemory] = useState<any>(undefined)
  /*
   *
   * Important note:
   * The compiled WASM files must be in the /wasm_modules folder
   * so that they are correctly exposed
   *
   */
  useEffect(() => {
    loader
      .instantiate(
        fetch(`wasm_modules/${moduleName}/optimized.wasm`).then((response) =>
          response.arrayBuffer()
        )
      )
      .then(({ exports }) => {
        setModule(exports)
        setMemory(exports.memory)
      })
    // eslint-disable-next-line
  }, [])

  return { module, memory }
}
