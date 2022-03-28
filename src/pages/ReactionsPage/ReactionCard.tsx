import styled from "styled-components"
import CardButton from "./CardButton"
import { EditIcon, DeleteIcon } from "../../components/Icons"
import useReactions from "../../hooks/entities/useReactions"
// import ReactionPreview from "./ReactionPreview"

interface ReactionCardProps {
  reaction: Reaction
}

const Buttons = styled.div`
  display: flex;
  height: 30px;
  width: 148px;
  justify-content: space-between;
  margin: 0px 16px;
  opacity: 0;
  transition: all 0.15s ease-in-out;
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
  flex-direction: row;
  height: 100px;
  margin: 0px 5px 10px;
  padding: 0px;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 800 })};

    & > div${Buttons} {
      opacity: 1;
      margin-top: -25px;
    }
  }
`

const ReactionCard: React.FC<ReactionCardProps> = (props) => {
  const { reaction } = props
  const { id } = reaction
  const { removeReaction } = useReactions()

  const handleRemove = () => removeReaction(id)

  return (
    <Wrapper>
      {/* <ReactionPreview /> */}
      <Buttons>
        <CardButton Icon={EditIcon} onClick={() => null} />
        <CardButton Icon={DeleteIcon} onClick={handleRemove} />
      </Buttons>
    </Wrapper>
  )
}

export default ReactionCard
