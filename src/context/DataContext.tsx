import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react"
import randomstring from "randomstring"

/* Constants */
import { COMPOUND_COLORS_CODES } from "../constants/compoundColors"
import { COMPOUND_SYMBOLS } from "../constants/compoundSymbols"

/* Helpers */
import { Token, TokenTypes } from "../helpers/tokenization"

/* Hooks */
import useLocalStorageState from "../hooks/useLocalStorageState"

/* Types */
import { Compound } from "../types/Compound"
import { Operation } from "../types/Operation"
import { Reaction, ReactionCompound } from "../types/Reaction"
import { SimulationResults } from "../types/SimulationResults"
import { FCWithChildren } from "../types/FCWithChildren"

/**
 * To mark whether if a compound is a reactant or a product,
 * the following enum is used
 *  */
export enum CompoundType {
  Reactant = 0,
  Product,
}

interface IDefaultValue {
  /* Compounds */
  compounds: Compound[]
  addCompound: () => void
  editCompound: (index?: number) => void
  findCompound: (id?: string) => Compound | undefined
  updateCompound: (index: number, updatedCompound: Compound) => void
  removeCompound: (index: number) => void
  editedCompoundId: string | undefined

  /* Reactions */
  reactions: Reaction[]
  addReaction: () => void
  editReaction: (index?: number) => void
  updateReaction: (index: number, updatedReaction: Reaction) => void
  removeReaction: (index: number) => void
  editedReactionId: string | undefined
  serializeKineticEquation: (reaction: Reaction, index: number) => Token[]

  /* Operation */
  operation: Operation
  updateOperation: (updatedOperation: Operation) => void

  /* Simulation results */
  simulationResults: SimulationResults | undefined
  setSimulationResults: (simulationResults: SimulationResults) => void
}

const defaultOperationValue: Operation = {
  reactionTime: 30,
  deadTime: 30,
  timeStep: 0.1,
}
const defaultValue: IDefaultValue = {
  /* Compounds */
  compounds: [],
  addCompound: () => {},
  editCompound: () => {},
  findCompound: () => {
    return undefined
  },
  updateCompound: () => {},
  removeCompound: () => {},
  editedCompoundId: undefined,

  /* Reactions */
  reactions: [],
  addReaction: () => {},
  editReaction: () => {},
  updateReaction: () => {},
  removeReaction: () => {},
  editedReactionId: undefined,
  serializeKineticEquation: () => {
    return []
  },

  /* Operation */
  operation: defaultOperationValue,
  updateOperation: () => {},

  /* Simulation results */
  simulationResults: undefined,
  setSimulationResults: () => {},
}

// Context Provider component
export const DataContext = createContext(defaultValue)

// Hook to use the context values
export const useData = () => {
  return useContext(DataContext)
}

/**
 * Store component to abstract logic from root component
 */
export const DataStore: React.FC<FCWithChildren> = (props) => {
  const { children } = props
  const [currentColor, setCurrentColor] = useState<number>(0)

  const [compounds, setCompounds] = useLocalStorageState<Compound[]>(
    "compounds",
    []
  ) as [Compound[], Dispatch<SetStateAction<Compound[]>>]
  const [reactions, setReactions] = useLocalStorageState<Reaction[]>(
    "reactions",
    []
  ) as [Reaction[], Dispatch<SetStateAction<Reaction[]>>]
  const [operation, setOperation] = useLocalStorageState<Operation>(
    "operation",
    defaultOperationValue
  ) as [Operation, Dispatch<SetStateAction<Operation>>]

  const [simulationResults, setSimulationResults] = useState<
    SimulationResults | undefined
  >(undefined)

  // To keep track of edited elements:
  const [editedCompoundId, setEditedCompoundId] = useState<string | undefined>(
    undefined
  )
  const [editedReactionId, setEditedReactionId] = useState<string | undefined>(
    undefined
  )

  /**
   * Helper functions
   */

  const nextColor = () => {
    if (currentColor === COMPOUND_COLORS_CODES.length - 1) {
      setCurrentColor(0)
      return
    }
    setCurrentColor(currentColor + 1)
  }

  const availableSymbol = (): string => {
    const foundSymbols = new Array(COMPOUND_SYMBOLS.length).fill(false)

    compounds.forEach((compound) => {
      const index = COMPOUND_SYMBOLS.indexOf(compound.symbol)
      if (index !== -1) foundSymbols[index] = true
    })
    for (let i = 0; i < foundSymbols.length; i++) {
      if (!foundSymbols[i]) {
        return COMPOUND_SYMBOLS[i]
      }
    }
    return ""
  }

  /**
   * Compounds state handling
   */
  const addCompound = (): void => {
    const updatedCompounds = [...compounds]

    updatedCompounds.push({
      id: randomstring.generate(8),
      color: COMPOUND_COLORS_CODES[currentColor],
      concentration: 0,
      molecularWeight: 0,
      symbol: availableSymbol(),
      name: "",
    })
    nextColor()

    setCompounds(updatedCompounds)
  }

  const findCompound = (id?: string): Compound | undefined => {
    return compounds.find((compound) => compound.id === id)
  }

  const editCompound = (index?: number): void => {
    if (typeof index === "undefined") {
      setEditedCompoundId(undefined)
      return
    }
    const id = compounds[index].id
    setEditedCompoundId(id)
  }

  const updateCompound = (index: number, updatedCompound: Compound): void => {
    const updatedCompounds = [...compounds]
    updatedCompounds[index] = updatedCompound

    setCompounds(updatedCompounds)
  }

  const removeCompound = (index: number): void => {
    const compoundId = compounds[index].id

    /**
     * Remove from reactions that have this compound
     */
    const updatedReactions = JSON.parse(JSON.stringify(reactions))
    updatedReactions.forEach((reaction: Reaction) => {
      reaction.reactants = reaction.reactants.filter(
        (reactionCompound: ReactionCompound) =>
          reactionCompound.compoundId !== compoundId
      )

      reaction.products = reaction.products.filter(
        (reactionCompound: ReactionCompound) =>
          reactionCompound.compoundId !== compoundId
      )

      if (reaction.keyCompound === compoundId) {
        reaction.keyCompound = undefined
      }
    })

    setReactions(updatedReactions)

    /**
     * Remove from compounds array
     */
    setCompounds([
      ...compounds.slice(0, index),
      ...compounds.slice(index + 1, compounds.length),
    ])
  }

  /**
   * Reactions state handling
   */
  const addReaction = (): void => {
    const updatedReactions = [...reactions]

    updatedReactions.push({
      id: randomstring.generate(8),
      name: "",
      reactants: [],
      products: [],
      kineticModel: 0,
      kineticConstants: {
        k: 1,
      },
      kineticEquation: [new Token(TokenTypes.Parameter, "<k>")],
    })

    setReactions(updatedReactions)
  }

  const editReaction = (index?: number): void => {
    if (typeof index === "undefined") {
      setEditedReactionId(undefined)
      return
    }
    const id = reactions[index].id
    setEditedReactionId(id)
  }

  const updateReaction = (index: number, updatedReaction: Reaction): void => {
    updatedReaction.kineticEquation = serializeKineticEquation(
      updatedReaction,
      index
    )
    const updatedReactions = JSON.parse(JSON.stringify(reactions))
    updatedReactions[index] = updatedReaction

    setReactions(updatedReactions)
  }

  const removeReaction = (index: number): void => {
    setReactions([
      ...reactions.slice(0, index),
      ...reactions.slice(index + 1, reactions.length),
    ])
  }

  const serializeKineticEquation = (
    reaction: Reaction,
    index: number
  ): Token[] => {
    const equationTokens: Token[] = []
    /**
     * TODO: this is just a placeholder for a future serialization system, maybe
     * with direct user input!
     */
    /* Returns infix notation */
    switch (reaction.kineticModel) {
      case 1:
        equationTokens.push(new Token(TokenTypes.Parameter, `<\\mu>`))

        reaction.reactants.forEach((reactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          equationTokens.push(new Token(TokenTypes.Operator, "*"))
          equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
          equationTokens.push(new Token(TokenTypes.Operator, "/"))
          equationTokens.push(new Token(TokenTypes.LeftParenthesis, "("))
          equationTokens.push(new Token(TokenTypes.Parameter, `<K_${symbol}>`))
          equationTokens.push(new Token(TokenTypes.Operator, "+"))
          equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
          equationTokens.push(new Token(TokenTypes.RightParenthesis, ")"))
        })
        return equationTokens
      //
      case 2:
        equationTokens.push(new Token(TokenTypes.Parameter, `<k>`))

        reaction.reactants.forEach((reactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          equationTokens.push(new Token(TokenTypes.Operator, "*"))
          equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
          equationTokens.push(new Token(TokenTypes.Operator, "^"))
          equationTokens.push(
            new Token(TokenTypes.Parameter, `<\\alpha_${symbol}>`)
          )
        })
        reaction.products.forEach((reactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          equationTokens.push(new Token(TokenTypes.Operator, "*"))
          equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
          equationTokens.push(new Token(TokenTypes.Operator, "^"))
          equationTokens.push(
            new Token(TokenTypes.Parameter, `<\\beta_${symbol}>`)
          )
        })
        return equationTokens
      //
      default:
        equationTokens.push(new Token(TokenTypes.Parameter, `<k>`))

        reaction.reactants.forEach((reactionCompound: ReactionCompound) => {
          const { symbol } = findCompound(
            reactionCompound.compoundId
          ) as Compound
          equationTokens.push(new Token(TokenTypes.Operator, "*"))
          equationTokens.push(new Token(TokenTypes.Variable, `{[${symbol}]}`))
          equationTokens.push(new Token(TokenTypes.Operator, "^"))
          equationTokens.push(
            new Token(TokenTypes.Parameter, `<\\alpha_${symbol}>`)
          )
        })
        return equationTokens
    }
  }

  /**
   * Operation state handling
   */
  const updateOperation = (updatedOperation: Operation): void => {
    setOperation(updatedOperation)
  }

  return (
    <DataContext.Provider
      value={{
        /* Compounds */
        compounds,
        addCompound,
        editCompound,
        findCompound,
        updateCompound,
        removeCompound,
        editedCompoundId,

        /* Reactions */
        reactions,
        addReaction,
        editReaction,
        updateReaction,
        removeReaction,
        editedReactionId,
        serializeKineticEquation,

        /* Operation */
        operation,
        updateOperation,

        /* Simulation results */
        simulationResults,
        setSimulationResults,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
