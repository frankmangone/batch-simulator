import styled from "styled-components"

/* Components */
import CompoundCard from "./CompoundCard"
import CompoundEditModal from "./CompoundEditModal"

/* Hooks */
import { useData } from "../context/DataContext"

/* Types */
import { ICompound } from "../types/Compound"

interface ICompoundListProps {
  compounds: ICompound[]
}

const CompoundList: React.FC<ICompoundListProps> = (props) => {
  const { compounds } = props
  const { editedCompoundId, editCompound, updateCompound, removeCompound } =
    useData()

  const editedCompound = editedCompoundId
    ? compounds.find((compound) => compound.id === editedCompoundId)
    : undefined

  return (
    <CompoundListWrapper>
      {compounds.map((compound, index) => (
        <CompoundCard
          key={index}
          compound={compound}
          editCompound={(): void => {
            editCompound(index)
          }}
          updateCompound={(compound: ICompound): void => {
            updateCompound(index, compound)
          }}
          removeCompound={(): void => {
            removeCompound(index)
          }}
          validateUnicity={(field: string, value: any): boolean => {
            for (var i = 0; i < compounds.length; i++) {
              // @ts-ignore
              if (i !== index && compounds[i][field] === value) {
                return false
              }
            }
            return true
          }}
        />
      ))}

      {/* Edit modal */}
      {editedCompoundId && (
        <CompoundEditModal
          compound={editedCompound as ICompound}
          closeModal={() => editCompound()}
        />
      )}
    </CompoundListWrapper>
  )
}

export default CompoundList

/**
 * Styled components
 */

const CompoundListWrapper = styled.ul`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding-left: 0;
`