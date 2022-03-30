import styled from "styled-components"
import useCompounds from "../../hooks/entities/useCompounds"
import { AddIcon } from "../../components/Icons"

interface AddCompoundModalProps {
  takenCompounds: ReactionCompound[]
  visible: boolean
  handleAdd: (compoundId: string) => void
}

interface WrapperProps {
  visible: boolean
}

interface CompoundPillProps {
  color: string
}

const CompoundPill = styled.div<CompoundPillProps>`
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 3px;
  display: flex;
  padding: 5px;
  margin: 4px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }

  svg {
    margin-left: 4px;

    path {
      fill: ${(props) =>
        props.theme.getColor({ name: "baseBlack", shade: 400 })};
    }
  }

  span {
    color: ${(props) => props.color};
    font-size: ${(props) => props.theme.fontSizes.h5};
    line-height: ${(props) => props.theme.lineHeights.h5};
  }
`

const Wrapper = styled.div<WrapperProps>`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700, opacity: 50 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding: ${(props) => (props.visible ? "10" : "0")}px 10px;
  margin: ${(props) => (props.visible ? "10" : "0")}px 5px;
  max-height: ${(props) => (props.visible ? "200" : "0")}px;
  transition: all 0.15s linear;
`

const AddCompoundModal: React.VFC<AddCompoundModalProps> = (props) => {
  const { takenCompounds, visible, handleAdd } = props
  const takenCompoundIds = takenCompounds.map((rc) => rc.compoundId)
  const { compounds } = useCompounds()

  const availableCompounds = compounds.filter(
    (c) => !takenCompoundIds.includes(c.id)
  )

  return (
    <Wrapper visible={visible}>
      {availableCompounds.map((compound) => {
        const { id, symbol, color } = compound

        return (
          <CompoundPill key={id} color={color} onClick={() => handleAdd(id)}>
            <span>{symbol}</span>
            <AddIcon size={20} />
          </CompoundPill>
        )
      })}
    </Wrapper>
  )
}

export default AddCompoundModal
