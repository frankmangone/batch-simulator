import styled from "styled-components"
import CompoundSelection from "./CompoundSelection"
import ReactionPreview from "../../components/reactions/ReactionPreview/index"
import useReactions from "../../hooks/entities/useReactions"
import { useParams } from "react-router-dom"

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`

const ReactionForm: React.VFC = () => {
  const { findReaction } = useReactions()
  const { id } = useParams()
  const reaction = findReaction(id)

  return (
    <Wrapper>
      <ReactionPreview
        reaction={reaction as Reaction}
        style={{ justifyContent: "center", flexBasis: "100%" }}
      />
      <CompoundSelection />
    </Wrapper>
  )
}

export default ReactionForm
