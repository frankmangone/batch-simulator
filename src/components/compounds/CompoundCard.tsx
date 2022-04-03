import styled from "styled-components"
import CardButton from "@components/CardButton"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { mobileBreakpoint } from "@lib/breakpoints"

interface ICompoundCardProps {
  compound: Compound
  editCompound: () => void
  updateCompound: (compound: Compound) => void
  validateUnicity: (field: string, value: any) => boolean
  removeCompound: () => void
}

const CompoundCard: React.FC<ICompoundCardProps> = (props) => {
  const { compound, editCompound, removeCompound } = props

  console.log(compound)

  return (
    <CompoundCardWrapper>
      <CompoundCardInner>
        {/* Tile to display symbol */}
        <CompoundTile color={compound.color}>{compound.symbol}</CompoundTile>

        <Buttons>
          {/* Button to toggle modal edition */}
          <CardButton onClick={editCompound}>
            <FiEdit />
          </CardButton>

          {/* Button to delete the compound */}
          <CardButton onClick={removeCompound}>
            <FiTrash2 />
          </CardButton>
        </Buttons>
      </CompoundCardInner>
    </CompoundCardWrapper>
  )
}

export default CompoundCard

/**
 * Styled components
 */

const CompoundCardWrapper = styled.li`
  @media screen and (max-width: ${mobileBreakpoint}px) {
    flex: 1;
    flex-basis: 100%;
  }
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
  justify-content: space-between;
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

interface CompoundColorBulletProps {
  color: string
}

const CompoundTile = styled.div<CompoundColorBulletProps>`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  border: 1px solid var(--color-grey-normal);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
  color: var(--color-grey-dark);
  font-size: 1.6rem;
  padding: 0.5rem 0.9rem;
  margin-right: 1rem;
`

const Buttons = styled.div`
  align-self: center;
  display: flex;
`
