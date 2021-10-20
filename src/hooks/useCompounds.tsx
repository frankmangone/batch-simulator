import randomstring from "randomstring"
import { useAppDispatch, useAppSelector } from "./useStore"
import { addCompound, updateCompound } from "../features/compoundsSlice"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"

/* Types */
import { Compound } from "../types/Compound"

const useCompounds = () => {
  const dispatch = useAppDispatch()
  const compounds = useAppSelector((state) => state.compounds)

  return {
    compounds,

    addCompound: () => {
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

    updateCompound: (id: string, updatedCompound: Compound) => {
      dispatch(updateCompound({ id, compound: updatedCompound }))
    },
  }
}

export default useCompounds
