import randomstring from "randomstring"
import { useAppDispatch, useAppSelector } from "./useStore"
import {
  addCompound,
  updateCompound,
  removeCompound,
  removeAllCompounds,
} from "../features/compoundsSlice"
import useReactions from "./useReactions"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"

/* Types */
import { Compound } from "../types/Compound"

const useCompounds = () => {
  const dispatch = useAppDispatch()
  const compounds = useAppSelector((state) => state.compounds)
  const { resetReactions } = useReactions()

  return {
    compounds,

    addCompound: (): void => {
      const newCompound = {
        id: randomstring.generate(8),
        color: COMPOUND_COLORS_CODES[0],
        concentration: 0,
        molecularWeight: 0,
        symbol: "A",
        name: "",
      }
      dispatch(addCompound(newCompound))
    },

    findCompound: (id?: string): Compound | undefined => {
      return compounds.find((c) => c.id === id)
    },

    updateCompound: (id: string, updatedCompound: Compound): void => {
      dispatch(updateCompound({ id, compound: updatedCompound }))
    },

    removeCompound: (id: string): void => {
      // Remove from reactions that have the specified compound
      dispatch(removeCompound({ id }))
    },

    removeAllCompounds: (): void => {
      resetReactions()
      dispatch(removeAllCompounds())
    },
  }
}

export default useCompounds
