import styled from "styled-components"
import { EditIcon, DeleteIcon, RerollIcon } from "../../components/Icons"
import CardButton from "./CardButton"
import useCompounds from "../../hooks/entities/useCompounds"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface CompoundCardProps {
  compound: Compound
}

interface SymbolProps {
  color: string
}

const Symbol = styled.p<SymbolProps>`
  color: ${(props) => props.color};
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h1};
  line-height: ${(props) => props.theme.lineHeights.h1};
  font-weight: 700;
  margin: 22px 16px 0px;
  transition: all 0.15s ease-in-out;
`

const Buttons = styled.div`
  align-self: stretch;
  display: flex;
  height: 30px;
  justify-content: space-between;
  margin: 0px 16px;
  opacity: 0;
`

const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  flex-basis: 180px;
  flex-shrink: 0;
  flex-direction: column;
  height: 100px;
  margin: 0px 5px 10px;
  overflow: hidden;
  padding: 0px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};

    & > div${Buttons} {
      opacity: 1;
    }

    & > p${Symbol} {
      margin-top: 16px;
      font-size: ${(props) => props.theme.fontSizes.h3};
      line-height: ${(props) => props.theme.lineHeights.h3};
    }
  }
`

const CompoundCard: React.FC<CompoundCardProps> = (props) => {
  const { compound } = props
  const navigate = useNavigate()
  const { id, symbol, color } = compound
  const { removeCompound, rerollCompoundColor } = useCompounds()
  const [zIndex, setZIndex] = useState<number>(1)

  const handleReroll = () => rerollCompoundColor(id)
  const handleEdit = () => navigate(`/compounds/${id}`)
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
