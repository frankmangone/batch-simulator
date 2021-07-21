import styled from "styled-components"

/* Types */
import { ICompound } from "../types/Compound"

interface ICompoundCardProps {
  compound: ICompound
}

const CompoundCard: React.FC<ICompoundCardProps> = (props) => {
  const { compound } = props

  return (
    <CompoundCardWrapper>
      <CompoundCardInner>
        <h1>{compound.symbol}</h1>
        <CompoundColorBullet className="bullet" />
      </CompoundCardInner>
    </CompoundCardWrapper>
  )
}

export default CompoundCard

const CompoundCardWrapper = styled.li`
  flex-basis: 33%;
`

const CompoundCardInner = styled.div`
  margin: 5px;
  padding: 20px;
  position: relative;

  align-items: center;
  background-color: var(--color-grey-lighter);
  border-radius: 5px;
  display: flex;
  color: #f7f3f2;
  cursor: pointer;
  overflow: hidden;

  h1 {
    margin: 0;
    color: var(--color-grey-dark);
    z-index: 2;
  }

  &:hover > .bullet {
    transform: scale(18);
    border-color: var(--color-grey-lighter);
  }
`

const CompoundColorBullet = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  background-color: hsl(90, 80%, 65%);
  border: 1px solid var(--color-grey-light);
`
