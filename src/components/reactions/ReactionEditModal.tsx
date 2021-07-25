import styled from "styled-components"

/* Components */
import Button from "../Button"
import EditModal from "../EditModal"
import Notice from "../Notice"
import ReactionCompoundList from "./ReactionCompoundList"
import ReactionPreview from "./ReactionPreview"
import Select from "../Select"
import { FiPlus } from "react-icons/fi"

/* Hooks */
import { useState } from "react"
import { useData } from "../../context/DataContext"

/* Types */
import { ICompound } from "../../types/Compound"
import { IReaction } from "../../types/Reaction"
import { CompoundType } from "../../context/DataContext"

interface IReactionEditModalProps {
  compounds: ICompound[]
  reaction: IReaction
  closeModal: () => void
  addCompoundToReaction: (
    compoundId: string,
    compoundType: CompoundType
  ) => void
}

const ReactionEditModal: React.FC<IReactionEditModalProps> = (props) => {
  const { compounds, reaction, addCompoundToReaction, closeModal } = props
  const { reactions } = useData()
  const [closing, setClosing] = useState<boolean>(false)
  const reactionIndex = reactions.findIndex((rea) => rea.id === reaction.id)

  /* For the select input, both for reactants and products */
  const [selectReactantIndex, setSelectReactantIndex] = useState<
    number | undefined
  >(undefined)
  const [selectProductIndex, setSelectProductIndex] = useState<
    number | undefined
  >(undefined)

  /* For formik state */
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
      <ReactionPreview reaction={reaction} />
      <CompoundsInputSection>
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
                  addCompoundToReaction(
                    compounds[selectReactantIndex].id,
                    CompoundType.Reactant
                  )
              }}
            >
              Add <FiPlus />
            </Button>
          </AddCompound>
          <CompoundInputInner>
            {reaction.reactants.length !== 0 ? (
              <ReactionCompoundList
                reactionIndex={reactionIndex}
                reactionCompounds={reaction.reactants}
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
                  addCompoundToReaction(
                    compounds[selectProductIndex].id,
                    CompoundType.Product
                  )
              }}
            >
              Add <FiPlus />
            </Button>
          </AddCompound>
          <CompoundInputInner>
            {reaction.products.length !== 0 ? (
              <ReactionCompoundList
                reactionIndex={reactionIndex}
                reactionCompounds={reaction.products}
                compoundType={CompoundType.Product}
              />
            ) : (
              <Notice>No compounds...</Notice>
            )}
          </CompoundInputInner>
        </CompoundInputWrapper>
      </CompoundsInputSection>
    </EditModal>
  )
}

export default ReactionEditModal

const CompoundsInputSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;

  h2 {
    color: var(--color-grey-dark);
    font-size: 20px;
    margin-top: 0;
  }
`

const CompoundInputWrapper = styled.div`
  flex-basis: 50%;
  margin-bottom: 1.5rem;

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
