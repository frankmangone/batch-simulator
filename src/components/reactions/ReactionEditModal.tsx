import styled from "styled-components"

/* Constants */
import {
  KINETIC_MODELS,
  generateKineticConstants,
} from "../../constants/kineticModels"

/* Components */
import Button from "../Button"
import EditModal from "../EditModal"
import Notice from "../Notice"
import Select from "../Select"
import SubmitButton from "../SubmitButton"
import { FiPlus } from "react-icons/fi"
import ReactionCompoundList from "./ReactionCompoundList"
import ReactionKineticParameters from "./ReactionKineticParameters"
import ReactionPreview from "./ReactionPreview"

/* Hooks */
import { useState } from "react"
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction, IReactionCompound } from "../../types/Reaction"
import { CompoundType } from "../../context/DataContext"

interface IReactionEditModalProps {
  compounds: ICompound[]
  reaction: IReaction
  closeModal: () => void
}

const ReactionEditModal: React.FC<IReactionEditModalProps> = (props) => {
  const { compounds, reaction, closeModal } = props
  const { reactions, updateReaction } = useData()
  const [closing, setClosing] = useState<boolean>(false)
  const reactionIndex = reactions.findIndex((rea) => rea.id === reaction.id)
  /**
   * Copied state for reaction editing
   */
  const [modalReaction, setModalReaction] = useState<IReaction>(
    JSON.parse(JSON.stringify(reaction))
  )

  /* For the select input, both for reactants and products */
  const [selectReactantIndex, setSelectReactantIndex] = useState<
    number | undefined
  >(undefined)
  const [selectProductIndex, setSelectProductIndex] = useState<
    number | undefined
  >(undefined)

  /**
   * Handle compound form updates
   */
  const getCompoundKey = (
    compoundType: CompoundType
  ): "products" | "reactants" => {
    if (compoundType === CompoundType.Reactant) return "reactants"
    return "products"
  }

  const addCompound = (
    compoundId: string,
    compoundType: CompoundType
  ): void => {
    /* Determine which array to push to */
    const key = getCompoundKey(compoundType)
    const updatedReaction = JSON.parse(JSON.stringify(modalReaction))

    updatedReaction[key].push({
      compoundId,
      stoichiometricCoefficient: 1,
    })

    const kineticConstants = generateKineticConstants(
      updatedReaction.kineticModel,
      updatedReaction
    )
    updatedReaction.kineticConstants = kineticConstants

    setModalReaction(updatedReaction)
  }

  const updateCompound = (
    compoundIndex: number,
    compoundType: CompoundType,
    updatedCompound: IReactionCompound
  ): void => {
    /* Determine which array to push to */
    const key = getCompoundKey(compoundType)
    const updatedReaction = { ...modalReaction }

    updatedReaction[key][compoundIndex] = updatedCompound

    setModalReaction(updatedReaction)
  }

  const removeCompound = (
    compoundIndex: number,
    compoundType: CompoundType
  ) => {
    /* Determine which array to push to */
    const key = getCompoundKey(compoundType)
    const updatedReaction = { ...modalReaction }

    updatedReaction[key] = [
      ...updatedReaction[key].slice(0, compoundIndex),
      ...updatedReaction[key].slice(
        compoundIndex + 1,
        updatedReaction[key].length
      ),
    ]

    const kineticConstants = generateKineticConstants(
      updatedReaction.kineticModel,
      updatedReaction
    )
    updatedReaction.kineticConstants = kineticConstants

    setModalReaction(updatedReaction)
  }

  /**
   * Handle kinetic constant change
   */

  const handleKineticConstantUpdate = (key: string, value: number) => {
    const updatedReaction = JSON.parse(JSON.stringify(modalReaction))
    updatedReaction.kineticConstants[key] = value
    setModalReaction(updatedReaction)
  }

  /* For select state */
  const selectReactantInitialValue = selectReactantIndex
    ? {
        value: selectReactantIndex,
        displayText: compounds[selectReactantIndex].symbol,
        collapsedDisplayText: compounds[selectReactantIndex].symbol,
      }
    : undefined

  const selectProductInitialValue = selectProductIndex
    ? {
        value: selectProductIndex,
        displayText: compounds[selectProductIndex].symbol,
        collapsedDisplayText: compounds[selectProductIndex].symbol,
      }
    : undefined

  return (
    <EditModal
      closing={closing}
      setClosing={setClosing}
      handleClose={closeModal}
    >
      <ReactionPreview reaction={modalReaction} />

      {/* Compounds input */}
      <InputSection>
        <CompoundInputWrapper>
          <h2>Reactants</h2>
          <AddCompound>
            <Select
              defaultDisplayValue="Compound..."
              initialValue={selectReactantInitialValue}
              selectOptions={compounds.map((compound, index) => ({
                value: index,
                displayText: compound.symbol,
                collapsedDisplayText: compound.symbol,
              }))}
              onSelectionChange={(index: number | undefined) =>
                setSelectReactantIndex(index)
              }
            />
            <Button
              color="green"
              onClick={() => {
                if (selectReactantIndex !== undefined)
                  addCompound(
                    compounds[selectReactantIndex].id,
                    CompoundType.Reactant
                  )
              }}
            >
              Add <FiPlus />
            </Button>
          </AddCompound>
          <CompoundInputInner>
            {modalReaction.reactants.length !== 0 ? (
              <ReactionCompoundList
                reactionIndex={reactionIndex}
                reactionCompounds={modalReaction.reactants}
                removeCompound={removeCompound}
                updateCompound={updateCompound}
                compoundType={CompoundType.Reactant}
              />
            ) : (
              <Notice>No compounds...</Notice>
            )}
          </CompoundInputInner>
        </CompoundInputWrapper>

        <CompoundInputWrapper>
          <h2>Products</h2>
          <AddCompound>
            <Select
              defaultDisplayValue="Compound..."
              initialValue={selectProductInitialValue}
              selectOptions={compounds.map((compound, index) => ({
                value: index,
                displayText: compound.symbol,
                collapsedDisplayText: compound.symbol,
              }))}
              onSelectionChange={(index: number | undefined) =>
                setSelectProductIndex(index)
              }
            />
            <Button
              color="green"
              onClick={() => {
                if (selectProductIndex !== undefined)
                  addCompound(
                    compounds[selectProductIndex].id,
                    CompoundType.Product
                  )
              }}
            >
              Add <FiPlus />
            </Button>
          </AddCompound>
          <CompoundInputInner>
            {modalReaction.products.length !== 0 ? (
              <ReactionCompoundList
                reactionIndex={reactionIndex}
                reactionCompounds={modalReaction.products}
                removeCompound={removeCompound}
                updateCompound={updateCompound}
                compoundType={CompoundType.Product}
              />
            ) : (
              <Notice>No compounds...</Notice>
            )}
          </CompoundInputInner>
        </CompoundInputWrapper>
      </InputSection>

      {/* Kinetics input */}
      <ColumnInputSection>
        <h2>Kinetics</h2>
        <Select
          initialValue={{
            value: modalReaction.kineticModel,
            displayText: KINETIC_MODELS[modalReaction.kineticModel],
            collapsedDisplayText: KINETIC_MODELS[modalReaction.kineticModel],
          }}
          selectOptions={KINETIC_MODELS.map((model, index) => ({
            value: index,
            displayText: model,
            collapsedDisplayText: model,
          }))}
          onSelectionChange={(value) => {
            const constants = generateKineticConstants(
              value as number,
              reaction
            )

            setModalReaction({
              ...modalReaction,
              kineticModel: value as number,
              kineticConstants: constants,
            })
          }}
        />
        <ReactionKineticParameters
          reaction={modalReaction}
          compounds={compounds}
          updateKineticConstant={handleKineticConstantUpdate}
        />
      </ColumnInputSection>

      <SubmitButton
        color="green"
        onClick={() => {
          updateReaction(reactionIndex, modalReaction)
          setClosing(true)
        }}
      >
        Done
      </SubmitButton>
    </EditModal>
  )
}

export default ReactionEditModal

const InputSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;

  h2 {
    color: var(--color-grey-dark);
    font-size: 20px;
    margin-top: 0;
  }
`

const ColumnInputSection = styled(InputSection)`
  flex-direction: column;
  flex-wrap: nowrap;
`

const CompoundInputWrapper = styled.div`
  flex-basis: 50%;

  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const CompoundInputInner = styled.div`
  background-color: var(--color-grey-lightest);
  border-radius: 5px;
  margin: 0.5rem 0.3rem;
  padding: 0.5rem;
`

const AddCompound = styled.div`
  display: flex;
  margin: 0.3rem;

  & > button {
    margin-left: 0.5rem;
  }
`
