import styled from "styled-components"
import Show from "../Show"
import CompoundCard from "./CompoundCard"
import CompoundEditModal from "./CompoundEditModal"
import NoResource from "../NoResource"
import useCompounds from "../../hooks/entities/useCompounds"
import { useState, useMemo } from "react"

const CompoundList: React.FC = (props) => {
  const { compounds, updateCompound, removeCompound } = useCompounds()
  const [editedCompoundId, setEditedCompoundId] = useState<string | undefined>(
    undefined
  )

  const editCompound = (id?: string) => setEditedCompoundId(id)
  const editedCompound = useMemo(
    () =>
      editedCompoundId
        ? compounds.find((c) => c.id === editedCompoundId)
        : undefined,
    [compounds, editedCompoundId]
  )

  return (
    <CompoundListWrapper>
      <Show when={!compounds.length}>
        <NoResource>No compounds added yet</NoResource>
      </Show>

      {compounds.map((compound, index) => (
        <CompoundCard
          key={index}
          compound={compound}
          editCompound={(): void => {
            editCompound(compound.id)
          }}
          updateCompound={(compound: Compound): void => {
            updateCompound(compound.id, compound)
          }}
          removeCompound={(): void => {
            removeCompound(compound.id)
          }}
          validateUnicity={(field: string, value: any): boolean => {
            for (var i = 0; i < compounds.length; i++) {
              if (
                i !== index &&
                compounds[i][field as keyof Compound] === value
              ) {
                return false
              }
            }
            return true
          }}
        />
      ))}

      {/* Edit modal */}
      <Show when={editedCompoundId}>
        <CompoundEditModal
          compound={editedCompound as Compound}
          closeModal={() => editCompound()}
        />
      </Show>
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
