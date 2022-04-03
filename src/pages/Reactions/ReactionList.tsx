import styled from "styled-components"
import ReactionCard from "./ReactionCard"
import Show from "@components/Show"
import NoResource from "@components/NoResource"
import useReactions from "@hooks/entities/useReactions"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const ReactionList: React.VFC = () => {
  const { reactions } = useReactions()

  return (
    <Wrapper>
      <Show when={!reactions.length}>
        <NoResource>No reactions added yet</NoResource>
      </Show>

      {reactions.map((reaction, index) => (
        <ReactionCard key={index} reaction={reaction} />
      ))}
    </Wrapper>
  )
}

export default ReactionList
