import styled from "styled-components"
import Show from "../..//Show"
import Notice from "../../Notice"
import Compound from "./Compound"
import { FiArrowRight } from "react-icons/fi"

interface ReactionPreviewProps {
  reaction: Reaction
}

const ReactionPreview: React.FC<ReactionPreviewProps> = (props) => {
  const { reaction } = props
  const { reactants, products } = reaction

  return (
    <Wrapper>
      <Show when={reactants.length === 0 && products.length === 0}>
        <Notice>No reaction data</Notice>
      </Show>

      {reactants.map((reactionCompound, index) => {
        const { compoundId } = reactionCompound
        return <Compound key={compoundId} {...{ index, reactionCompound }} />
      })}

      {reaction.reactants.length > 0 && reaction.products.length > 0 && (
        <FiArrowRight size={25} />
      )}

      {products.map((reactionCompound, index) => {
        const { compoundId } = reactionCompound
        return <Compound key={compoundId} {...{ index, reactionCompound }} />
      })}
    </Wrapper>
  )
}

export default ReactionPreview

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  min-height: 3rem;
`
