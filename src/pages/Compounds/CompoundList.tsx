import styled from "styled-components"
import Show from "@components/Show"
import CompoundCard from "./CompoundCard"
import NoResource from "@components/NoResource"
import useCompounds from "@hooks/entities/useCompounds"

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const CompoundList: React.VFC = () => {
  const { compounds } = useCompounds()

  return (
    <Wrapper>
      <Show when={!compounds.length}>
        <NoResource>No compounds added yet</NoResource>
      </Show>

      {compounds.map((compound, index) => (
        <CompoundCard key={index} {...{ compound }} />
      ))}
    </Wrapper>
  )
}

export default CompoundList
