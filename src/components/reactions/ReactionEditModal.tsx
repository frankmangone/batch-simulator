import styled from "styled-components"

/* Constants */
import {
  KINETIC_MODELS,
  generateKineticConstants,
} from "../../constants/kineticModels"

/* Components */
import EditModal from "../EditModal"
import FieldInput from "../forms/FieldInput"
import Notice from "../Notice"
import Select from "../Select"
import SubmitButton from "../SubmitButton"
import {
  ModalInputSection,
  ModalColumnInputSection,
} from "../ModalInputSection"
import { FiPlus } from "react-icons/fi"
import ReactionCompoundList from "./ReactionCompoundList"
import ReactionEquation from "./ReactionEquation"
import ReactionKineticParameters from "./ReactionKineticParameters"
import ReactionPreview from "./ReactionPreview"

/* Helpers */
import serializeKineticEquation from "../../lib/serializeKineticEquation"
import { CompoundTypes } from "../../lib/reactionTypes"
import { mobileBreakpoint } from "../../lib/breakpoints"

/* Hooks */
import { useMemo, useState, useRef } from "react"
import useCompounds from "../../hooks/entities/useCompounds"
import useReactions from "../../hooks/entities/useReactions"

interface ReactionEditModalProps {
  compounds: Compound[]
  reaction: Reaction
  closeModal: () => void
}

const ReactionEditModal: React.FC<ReactionEditModalProps> = (props) => {
  const { compounds, reaction, closeModal } = props
  const { reactants, products } = reaction
  const { findCompound } = useCompounds()
  const { reactions, updateReaction } = useReactions()
  const [closing, setClosing] = useState<boolean>(false)
  const reactionIndex = reactions.findIndex((rea) => rea.id === reaction.id)
  /**
   * Copied state for reaction editing
   */
  const [modalReaction, setModalReaction] = useState<Reaction>(
    JSON.parse(JSON.stringify(reaction))
  )

  /* Keep a reference to scrolled element */
  const scrollRef = useRef(document.getElementById("scroll-target"))

  /* For the select input, both for reactants and products */
  const [selectReactantIndex, setSelectReactantIndex] = useState<
    number | undefined
  >(undefined)
  const [selectProductIndex, setSelectProductIndex] = useState<
    number | undefined
  >(undefined)

  /**
   * Select options
   */
  const reactantOptions = useMemo(() => {
    return compounds
      .filter((compound) => {
        for (const reactant of modalReaction.reactants) {
          if (reactant.compoundId === compound.id) {
            return false
          }
        }
        return true
      })
      .map((compound) => {
        const index = compounds.findIndex((c) => c.id === compound.id)
        return {
          value: index,
          displayText: compound.symbol,
          collapsedDisplayText: compound.symbol,
          hoverBackgroundColor: compound.color,
        }
      })
    // eslint-disable-next-line
  }, [modalReaction.reactants])

  const productOptions = useMemo(() => {
    return compounds
      .filter((compound) => {
        for (const product of modalReaction.products) {
          if (product.compoundId === compound.id) {
            return false
          }
        }
        return true
      })
      .map((compound) => {
        const index = compounds.findIndex((c) => c.id === compound.id)
        return {
          value: index,
          displayText: compound.symbol,
          collapsedDisplayText: compound.symbol,
          hoverBackgroundColor: compound.color,
        }
      })
    // eslint-disable-next-line
  }, [modalReaction.products])

  /**
   * Handle compound form updates
   */
  const getCompoundKey = (
    compoundType: CompoundType
  ): "products" | "reactants" => {
    if (compoundType === CompoundTypes.Reactant) return "reactants"
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

    /* Recalculate kinetic constants */
    const kineticConstants = generateKineticConstants(
      updatedReaction,
      compounds
    )
    updatedReaction.kineticConstants = kineticConstants
    updatedReaction.kineticEquation = serializeKineticEquation(
      updatedReaction,
      compounds
    )

    setModalReaction(updatedReaction)
  }

  const updateCompound = (
    compoundIndex: number,
    compoundType: CompoundType,
    updatedCompound: ReactionCompound
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
    const deletedCompound = updatedReaction[key][compoundIndex]

    /* Update reaction compounds */
    updatedReaction[key] = [
      ...updatedReaction[key].slice(0, compoundIndex),
      ...updatedReaction[key].slice(
        compoundIndex + 1,
        updatedReaction[key].length
      ),
    ]

    /* Set keyCompound to undefined if deleted compound is keyCompound */
    if (deletedCompound.compoundId === modalReaction.keyCompound) {
      updatedReaction.keyCompound = undefined
    }

    /* Recalculate kinetic constants and equation */
    const kineticConstants = generateKineticConstants(
      updatedReaction,
      compounds
    )
    updatedReaction.kineticConstants = kineticConstants
    updatedReaction.kineticEquation = serializeKineticEquation(
      updatedReaction,
      compounds
    )

    setModalReaction(updatedReaction)
  }

  /**
   * Handle kinetic constant change
   */

  const handleKineticConstantUpdate = (key: string, value: string) => {
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
      <ReactionPreview {...{ reactants, products }} />
      <br />
      <SelectField>
        <FieldInput
          fieldName="name"
          label="Reaction name:"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setModalReaction({
              ...modalReaction,
              name: event.target.value,
            })
          }}
          value={modalReaction.name}
        />
      </SelectField>

      {/* Compounds input */}
      <ModalInputSection>
        <CompoundInputWrapper>
          <h2>Reactants</h2>
          <AddCompound>
            <Select
              defaultDisplayValue="Compound..."
              hoverIcon={<FiPlus />}
              initialValue={selectReactantInitialValue}
              selectOptions={reactantOptions}
              onSelectionChange={(index: number | undefined) => {
                if (index !== undefined) {
                  addCompound(compounds[index].id, CompoundTypes.Reactant)
                }
                setSelectReactantIndex(undefined)
              }}
            />
          </AddCompound>
          <CompoundInputInner>
            {modalReaction.reactants.length !== 0 ? (
              <ReactionCompoundList
                reactionIndex={reactionIndex}
                reactionCompounds={modalReaction.reactants}
                removeCompound={removeCompound}
                updateCompound={updateCompound}
                compoundType={CompoundTypes.Reactant}
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
              hoverIcon={<FiPlus />}
              initialValue={selectProductInitialValue}
              selectOptions={productOptions}
              onSelectionChange={(index: number | undefined) => {
                if (index !== undefined) {
                  addCompound(compounds[index].id, CompoundTypes.Product)
                }
                setSelectProductIndex(undefined)
              }}
            />
          </AddCompound>
          <CompoundInputInner>
            {modalReaction.products.length !== 0 ? (
              <ReactionCompoundList
                reactionIndex={reactionIndex}
                reactionCompounds={modalReaction.products}
                removeCompound={removeCompound}
                updateCompound={updateCompound}
                compoundType={CompoundTypes.Product}
              />
            ) : (
              <Notice>No compounds...</Notice>
            )}
          </CompoundInputInner>
        </CompoundInputWrapper>
      </ModalInputSection>

      {/* Kinetics input */}
      <ModalColumnInputSection>
        <h2>Kinetics</h2>
        <SelectField>
          <p>Kinetic model</p>
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
              const updatedReaction = JSON.parse(JSON.stringify(modalReaction))

              updatedReaction.kineticConstants = generateKineticConstants(
                modalReaction,
                compounds
              )
              updatedReaction.kineticModel = value
              updatedReaction.kineticEquation = serializeKineticEquation(
                updatedReaction,
                compounds
              )

              setModalReaction(updatedReaction)
            }}
          />
        </SelectField>
        <SelectField>
          <p>Key compound</p>
          <Select
            defaultDisplayValue="Reactant..."
            initialValue={
              modalReaction.keyCompound !== undefined
                ? {
                    value: modalReaction.keyCompound,
                    displayText: (
                      findCompound(modalReaction.keyCompound) as Compound
                    ).symbol,
                    collapsedDisplayText: (
                      findCompound(modalReaction.keyCompound) as Compound
                    ).symbol,
                  }
                : undefined
            }
            selectOptions={modalReaction.reactants.map((reactionCompound) => ({
              value: reactionCompound.compoundId,
              displayText: (
                findCompound(reactionCompound.compoundId) as Compound
              ).symbol,
              collapsedDisplayText: (
                findCompound(reactionCompound.compoundId) as Compound
              ).symbol,
            }))}
            onSelectionChange={(value: string | undefined) => {
              const updatedReaction = JSON.parse(JSON.stringify(modalReaction))
              updatedReaction.keyCompound = value
              setModalReaction(updatedReaction)
            }}
          />
        </SelectField>
        <ReactionEquation reaction={modalReaction} />
        <ReactionKineticParameters
          reaction={modalReaction}
          compounds={compounds}
          updateKineticConstant={handleKineticConstantUpdate}
        />
      </ModalColumnInputSection>

      <SubmitButton
        color="green"
        onClick={() => {
          updateReaction(reaction.id, modalReaction)
          scrollRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
          setClosing(true)
        }}
      >
        Done
      </SubmitButton>
    </EditModal>
  )
}

export default ReactionEditModal

const SelectField = styled.div`
  display: flex;
  align-items: center;
  width: 50%;

  p {
    color: var(--color-grey-dark);
    flex-grow: 1;
    font-size: 1rem;
    margin-right: 1.4rem;
    flex-basis: 50%;
  }

  div {
    flex-basis: 45%;
  }

  @media screen and (max-width: ${mobileBreakpoint}px) {
    width: 100%;
  }
`

const CompoundInputWrapper = styled.div`
  flex-basis: 50%;

  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const CompoundInputInner = styled.div`
  background-color: var(--color-grey-lightest);
  border: 1px solid var(--color-grey-light);
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0.3rem;
  padding: 0.5rem;

  @media screen and (max-width: ${mobileBreakpoint}px) {
    margin-bottom: 1.5rem;
  }
`

const AddCompound = styled.div`
  display: flex;
  margin: 0.3rem;

  & > button {
    margin-left: 0.5rem;
  }
`
