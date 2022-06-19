import randomstring from "randomstring"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../useStore"
import {
  add,
  reset,
  update,
  remove,
  removeCompound,
} from "@features/reactionsSlice"
import { STORAGE_KEY } from "@features/reactionsSlice"
import { saveToKey } from "@lib/localStorage"
import {
  divisionToken,
  exponentiationToken,
  multiplicationToken,
  subtractionToken,
  parameterToken,
  variableToken,
  leftParenthesisToken,
  rightParenthesisToken,
} from "@lib/tokens/tokenTypes"
import { KineticModels } from "@lib/reactionTypes"
import { KineticParameters } from "@lib/enum/kinetic-constants.enum"

const useReactions = () => {
  const dispatch = useAppDispatch()
  const reactions = useAppSelector((state) => state.reactions)

  useEffect(() => {
    /* Save to localStorage upon changes to state */
    saveToKey(reactions, STORAGE_KEY)
  }, [reactions])

  /**
   * resetReactions
   *
   * Deletes all reactions
   */
  const resetReactions = (): void => {
    dispatch(reset())
  }

  /**
   * addReaction
   *
   * Creates a new blank reaction
   */
  const addReaction = (): void => {
    const newReaction = {
      id: randomstring.generate(8),
      name: "",
      reactants: [],
      products: [],
      kineticModel: KineticModels.simple,
      kineticConstants: {
        [KineticParameters.K_INF]: "1e7", // Pre exponential term for Arrhenius
        [KineticParameters.E_A]: "4.5e4", // Arrhenius activation energy
        [KineticParameters.DELTA_H]: "2", // Arrhenius activation energy
      },
      kineticEquation: [
        parameterToken("<k_\\inf>", "k_\\infty"),
        multiplicationToken,
        parameterToken("e"),
        exponentiationToken,
        leftParenthesisToken,
        leftParenthesisToken,
        subtractionToken,
        parameterToken("<E_A>"),
        rightParenthesisToken,
        divisionToken,
        leftParenthesisToken,
        parameterToken("<R>"),
        multiplicationToken,
        variableToken("{T}"),
        rightParenthesisToken,
        rightParenthesisToken,
      ],
    }
    dispatch(add(newReaction))
  }

  /**
   * findReaction
   *
   * Finds a reaction by its id and returns it - or undefined if the search yields no results
   *
   * @param {string} id
   * @returns Reaction | undefined
   */
  const findReaction = (id?: string): Reaction | undefined => {
    return reactions.find((r) => r.id === id)
  }

  /**
   * updateReaction
   *
   * Updates target reaction with `id`, with the new values specified in `updatedReaction`
   *
   * @param {string} id
   * @param {Reaction} updatedReaction
   */
  const updateReaction = (id: string, updatedReaction: Reaction): void => {
    dispatch(update({ id, reaction: updatedReaction }))
  }

  /**
   * removeCompoundFromReactions
   *
   * Removes a compound from all reactions
   *
   * @param {string} compoundId
   */
  const removeCompoundFromReactions = (compoundId: string): void => {
    dispatch(removeCompound({ id: compoundId }))
  }

  /**
   * removeReaction
   *
   * Deletes reaction with `id`
   *
   * @param {string} id
   */
  const removeReaction = (id: string): void => {
    dispatch(remove({ id }))
  }

  return {
    reactions,
    resetReactions,
    addReaction,
    findReaction,
    updateReaction,
    removeCompoundFromReactions,
    removeReaction,
  }
}

export default useReactions
