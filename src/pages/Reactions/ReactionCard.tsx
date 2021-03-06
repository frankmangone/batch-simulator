import styled from "styled-components"
import CardButton from "./CardButton"
import { EditIcon, DeleteIcon } from "@components/Icons"
import ReactionPreview from "@components/reactions/ReactionPreview"
import useReactions from "@hooks/entities/useReactions"
import { useNavigate } from "react-router-dom"

interface ReactionCardProps {
  reaction: Reaction
}

const Name = styled.p`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 500 })};
  position: absolute;
  top: 8px;
  left: 12px;
  margin: 0;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 175px;
  margin-left: 16px;
  transition: all 0.15s ease-in-out;
`

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  box-shadow: 0 0 6px
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 800 })};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  min-height: 80px;
  margin: 0px 5px 10px;
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};
  }
`

const ReactionCard: React.FC<ReactionCardProps> = (props) => {
  const { reaction } = props
  const { reactants, products } = reaction
  const { id, name } = reaction
  const navigate = useNavigate()
  const { removeReaction } = useReactions()

  const handleEdit = () => navigate(`/reactions/${id}`)
  const handleRemove = () => removeReaction(id)

  return (
    <Wrapper>
      <Name>{name}</Name>
      <ReactionPreview {...{ reactants, products }} />
      <Buttons>
        <CardButton Icon={EditIcon} onClick={handleEdit} />
        <CardButton Icon={DeleteIcon} onClick={handleRemove} />
      </Buttons>
    </Wrapper>
  )
}

export default ReactionCard
