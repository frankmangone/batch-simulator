import styled from "styled-components"

/* Constants */
import { COMPOUND_COLORS } from "../constants/compoundColors"

/* Hooks */
import { useEffect, useRef } from "react"

/* Types */
import { ICompound } from "../types/Compound"
interface ICompoundCardProps {
  compound: ICompound
}

const CompoundCard: React.FC<ICompoundCardProps> = (props) => {
  const { compound } = props
  const liquidRef = useRef<HTMLElement>()

  useEffect(() => {
    // @ts-ignore
    liquidRef.current = document.getElementById("liquid")
  }, [])

  return (
    <CompoundCardWrapper>
      <CompoundCardInner
        onMouseEnter={() => {
          // @ts-ignore
          liquidRef.current.style.backgroundColor = COMPOUND_COLORS[compound.color]
        }}
        onMouseLeave={() => {
          // @ts-ignore
          liquidRef.current.style.backgroundColor = "hsl(213, 20%, 95%)"
        }}
      >
        <h1>{compound.symbol}</h1>
        <CompoundColorBullet className="bullet" color={compound.color as keyof typeof COMPOUND_COLORS} />
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

interface ICompoundColorBulletProps {
  color: keyof typeof COMPOUND_COLORS
}

const CompoundColorBullet = styled.div<ICompoundColorBulletProps>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  z-index: 1;
  
  background-color: ${(props) => (COMPOUND_COLORS[props.color])};
  border: 1px solid var(--color-grey-light);
`
