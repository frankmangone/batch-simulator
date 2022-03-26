// import styled from "styled-components"
import Show from "../../components/Show"
import CompoundCard from "./CompoundCard"
// import CompoundEditModal from "../../components/compounds/CompoundEditModal"
import NoResource from "../../components/NoResource"
import useCompounds from "../../hooks/entities/useCompounds"
// import { useState, useMemo } from "react"

const CompoundList: React.VFC = () => {
  const { compounds } = useCompounds()
  // const { compounds, updateCompound, removeCompound } = useCompounds()

  // const [editedCompoundId, setEditedCompoundId] = useState<string | undefined>(
  //   undefined
  // )

  // const editCompound = (id?: string) => setEditedCompoundId(id)
  // const editedCompound = useMemo(
  //   () =>
  //     editedCompoundId
  //       ? compounds.find((c) => c.id === editedCompoundId)
  //       : undefined,
  //   [compounds, editedCompoundId]
  // )

  return (
    <>
      <Show when={!compounds.length}>
        <NoResource>No compounds added yet</NoResource>
      </Show>

      {compounds.map((compound, index) => (
        <CompoundCard key={index} compound={compound} />
      ))}

      {/* Edit modal
      <Show when={editedCompoundId}>
        <CompoundEditModal
          compound={editedCompound as Compound}
          closeModal={() => editCompound()}
        />
      </Show> */}
    </>
  )
}

export default CompoundList
