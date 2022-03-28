import styled from "styled-components"
import Show from "../../components/Show"
import NoResource from "../../components/NoResource"
import useReactions from "../../hooks/entities/useReactions"

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const ReactionList: React.VFC = () => {
  const { reactions } = useReactions()

  return (
    <Wrapper>
      <Show when={!reactions.length}>
        <NoResource>No reactions added yet</NoResource>
      </Show>

      {/* {reactions.map((compound, index) => (
        <CompoundCard key={index} {...{ compound, setEditedCompoundId }} />
      ))} */}
    </Wrapper>
  )
}

export default ReactionList
