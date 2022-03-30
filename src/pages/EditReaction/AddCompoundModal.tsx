import styled from "styled-components"
import useCompounds from "../../hooks/entities/useCompounds"

interface AddCompoundModalProps {
  takenCompounds: ReactionCompound[]
}

interface CompoundPillProps {
  color: string
}

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  margin: 0px 5px 10px;
  padding: 10px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }
`

const CompoundPill = styled.div<CompoundPillProps>`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 800 })};
  border-radius: 3px;
  padding: 5px;
  margin: 4px;

  p {
    color: ${(props) => props.color};
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.h5};
    line-height: ${(props) => props.theme.lineHeights.h5};
  }
`

const AddCompoundModal: React.VFC<AddCompoundModalProps> = (props) => {
  const { takenCompounds } = props
  const takenCompoundIds = takenCompounds.map((rc) => rc.compoundId)
  const { compounds } = useCompounds()

  const availableCompounds = compounds.filter(
    (c) => !takenCompoundIds.includes(c.id)
  )

  return (
    <Wrapper>
      {availableCompounds.map((compound) => {
        const { id, symbol, color } = compound

        return (
          <CompoundPill key={id} color={color}>
            <p>{symbol}</p>
          </CompoundPill>
        )
      })}
    </Wrapper>
  )
}

export default AddCompoundModal
