import styled from "styled-components"
import Show from "../..//Show"
import Notice from "../../Notice"
import Compound from "./Compound"
import { ArrowRightIcon } from "../../Icons"
import { useTheme } from "../../../contexts/Theme"

interface ReactionPreviewProps {
  reaction: Reaction
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  margin-top: 15px;
`

const ReactionPreview: React.FC<ReactionPreviewProps> = (props) => {
  const { reaction } = props
  const { reactants, products } = reaction
  const { getColor } = useTheme()

  return (
    <Wrapper>
      <Show when={reactants.length === 0 && products.length === 0}>
        <Notice>No reaction data</Notice>
      </Show>

      {reactants.map((reactionCompound, index) => {
        const { compoundId } = reactionCompound
        return <Compound key={compoundId} {...{ index, reactionCompound }} />
      })}

      <Show when={reactants.length > 0 && products.length > 0}>
        <ArrowRightIcon
          style={{ marginRight: 10, marginLeft: 10 }}
          color={getColor({ name: "baseBlack", shade: 100 })}
          size={30}
        />
      </Show>

      {products.map((reactionCompound, index) => {
        const { compoundId } = reactionCompound
        return <Compound key={compoundId} {...{ index, reactionCompound }} />
      })}
    </Wrapper>
  )
}

export default ReactionPreview
