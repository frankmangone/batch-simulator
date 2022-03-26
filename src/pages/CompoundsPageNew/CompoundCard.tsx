import styled from "styled-components"
import { EditIcon, DeleteIcon, RerollIcon } from "../../components/Icons"
import CardButton from "./CardButton"
import useCompounds from "../../hooks/entities/useCompounds"
import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"

interface CompoundCardProps {
  compound: Compound
  setEditedCompoundId: Dispatch<SetStateAction<string | undefined>>
}

interface SymbolProps {
  color: string
}

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.color};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  font-weight: 700;
  margin: 16px 16px 0px;
`

const Buttons = styled.div`
  align-self: stretch;
  display: flex;
  height: 30px;
  justify-content: space-between;
  margin: 5px 16px 0;
  opacity: 0;
`

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 800 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  flex-basis: 180px;
  flex-shrink: 0;
  flex-direction: column;
  height: 70px;
  margin: 0px 5px 10px;
  overflow: hidden;
  padding: 0px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 700 })};
    height: 110px;
    margin-bottom: -50px;

    & > div${Buttons} {
      opacity: 1;
    }
  }
`

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound, setEditedCompoundId } = props
  const { id, symbol, color } = compound
  const { removeCompound, rerollCompoundColor } = useCompounds()
  const [zIndex, setZIndex] = useState<number>(1)

  const handleReroll = () => rerollCompoundColor(id)
  const handleEdit = () => setEditedCompoundId(id)
  const handleRemove = () => removeCompound(id)

  const handleMouseEnter = () => setZIndex(2)
  const handleMouseLeave = () => setZIndex(1)

  return (
    <Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex }}
    >
      <Symbol color={color}>{symbol}</Symbol>
      <Buttons>
        <CardButton Icon={RerollIcon} onClick={handleReroll} />
        <CardButton Icon={EditIcon} onClick={handleEdit} />
        <CardButton Icon={DeleteIcon} onClick={handleRemove} />
      </Buttons>
    </Wrapper>
  )
}

export default CompoundCard
