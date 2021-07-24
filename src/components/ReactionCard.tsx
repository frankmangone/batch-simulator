import styled from "styled-components"

/* Components */
import CardButton from "./CardButton"
import { FiEdit, FiTrash2 } from "react-icons/fi"

/* Types */
import { IReaction } from "../types/Reaction"

interface IReactionCardProps {
  reaction: IReaction
  editReaction: () => void
  // updateCompound: (compound: ICompound) => void
  // validateUnicity: (field: string, value: any) => boolean
  // removeCompound: () => void
}

const ReactionCard: React.FC<IReactionCardProps> = (props) => {
  const { reaction, editReaction } = props

  return (
    <ReactionCardWrapper>
      <p>Reaction</p>
      <CardButton onClick={editReaction}>
        <FiEdit />
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

  p {
    flex-grow: 1;
    margin: 0;
  }
`
