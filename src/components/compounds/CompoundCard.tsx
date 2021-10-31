import styled from "styled-components"

/* Components */
import CardButton from "../CardButton"
import { FiEdit, FiTrash2 } from "react-icons/fi"

/* Constants */
import { COMPOUND_COLORS } from "../../constants/compoundColors"

/* Types */
import { Compound } from "../../types/Compound"

interface ICompoundCardProps {
  compound: Compound
  editCompound: () => void
  updateCompound: (compound: Compound) => void
  validateUnicity: (field: string, value: any) => boolean
  removeCompound: () => void
}

const CompoundCard: React.FC<ICompoundCardProps> = (props) => {
  const { compound, editCompound, removeCompound } = props

  return (
    <CompoundCardWrapper>
      <CompoundCardInner>
        {/* Tile to display symbol */}
        <CompoundTile color={compound.color as keyof typeof COMPOUND_COLORS}>
          {compound.symbol}
        </CompoundTile>

        {/* Button to toggle modal edition */}
        <CardButton onClick={editCompound}>
          <FiEdit />
        </CardButton>

        {/* Button to delete the compound */}
        <CardButton onClick={removeCompound}>
          <FiTrash2 />
        </CardButton>
      </CompoundCardInner>
    </CompoundCardWrapper>
  )
}

export default CompoundCard

/**
 * Styled components
 */

const CompoundCardWrapper = styled.li`
  /* flex-basis: 25%;

  @media only screen and (max-width: 1200px) {
    flex-basis: 33.3%;
  }

  @media only screen and (max-width: 960px) {
    flex-basis: 50%;
  }

  @media only screen and (max-width: 520px) {
    flex-basis: 100%;
  } */
`

const CompoundCardInner = styled.div`
  margin: 5px;
  padding: 20px;
  position: relative;

  align-items: center;
  animation-name: slide-in;
  animation-timing-function: ease-in-out;
  animation-duration: 0.25s;
  animation-iteration-count: 1;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  border: 1.5px solid var(--color-grey-lightest);
  display: flex;
  color: var(--color-grey-lightest);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.15s ease-in-out;

  &:hover {
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  button {
    padding: 0.8rem;
  }
`

interface ICompoundColorBulletProps {
  color: keyof typeof COMPOUND_COLORS
}

const CompoundTile = styled.div<ICompoundColorBulletProps>`
  background-color: ${(props) => COMPOUND_COLORS[props.color]};
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
  color: var(--color-grey-dark);
  font-size: 1.6rem;
  padding: 0.5rem 0.9rem;
  margin-right: 1rem;
`
