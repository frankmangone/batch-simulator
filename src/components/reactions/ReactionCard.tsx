import styled from "styled-components"

/* Components */
import CardButton from "../CardButton"
import ReactionPreview from "./ReactionPreview"
import { FiEdit, FiTrash2 } from "react-icons/fi"

/* Types */
import { Reaction } from "../../types/Reaction"

interface IReactionCardProps {
  reaction: Reaction
  reactionIndex: number
  editReaction: () => void
  removeReaction: () => void
}

const ReactionCard: React.FC<IReactionCardProps> = (props) => {
  const { reaction, reactionIndex, editReaction, removeReaction } = props

  return (
    <ReactionCardWrapper>
      <ReactionInfo>
        <ReactionName>
          {`#${reactionIndex + 1}`} {reaction.name ? ` - ${reaction.name}` : ""}
        </ReactionName>
        <ReactionPreview reaction={reaction} />
      </ReactionInfo>
      <CardButton onClick={editReaction}>
        <FiEdit />
      </CardButton>
      <CardButton onClick={removeReaction}>
        <FiTrash2 />
      </CardButton>
    </ReactionCardWrapper>
  )
}

export default ReactionCard

const ReactionCardWrapper = styled.div`
  margin: 10px;
  padding: 20px;
  position: relative;

  align-items: center;
  align-self: stretch;
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  display: flex;
  color: var(--color-grey-dark);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--color-grey-lightest);

    & {
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }

    & > button {
      opacity: 1;
    }

    & > .bullet {
      transform: scale(20);
      border-color: var(--color-grey-lighter);
    }
    & > .symbol-input:after {
      margin-left: 0%;
      width: auto;
    }
  }

  p:not(:first-child) {
    flex-grow: 1;
    margin: 0;
  }
`

const ReactionName = styled.p`
  color: var(--color-grey-normal);
  flex-grow: 0;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  padding-left: 0.6rem;
  padding-bottom: 0.5rem;
`

const ReactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
