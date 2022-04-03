import styled from "styled-components"
import Show from "@components/Show"
import Subindex from "@components/math/Subindex"
import Equation from "@components/math/Equation"
import useCompounds from "@hooks/entities/useCompounds"

interface KineticEquationProps {
  tokens: Token[]
  keyCompound?: string
}

const EquationWrapper = styled.div`
  align-items: center;
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 200 })};
  flex-basis: 100%;
  font-family: "Comfortaa", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h3};
  line-height: ${(props) => props.theme.lineHeights.h3};
  justify-content: center;
  margin: 30px 0;
  padding-top: 30px;
  overflow-x: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* &:before {
    content: "";
    position: sticky;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40px;
    background: linear-gradient(
      to right,
      ${(props) => props.theme.getColor({ name: "baseBlack", shade: 600 })},
      ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 600, opacity: 0 })}
    );
    z-index: 4;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 40px;
    background: linear-gradient(
      to left,
      ${(props) => props.theme.getColor({ name: "baseBlack", shade: 600 })},
      ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 600, opacity: 0 })}
    );
    z-index: 4;
  } */
`

const InnerWrapper = styled.div`
  align-items: center;
  display: inline-flex;
`

const KineticEquation: React.VFC<KineticEquationProps> = (props) => {
  const { tokens, keyCompound } = props
  const { findCompound } = useCompounds()

  const compound = findCompound(keyCompound)
  const keyCompoundSymbol: string | undefined = compound?.symbol ?? undefined

  return (
    <EquationWrapper>
      <InnerWrapper>
        <Show when={keyCompoundSymbol}>
          <>
            <Subindex base="r" subindex={keyCompoundSymbol as string} />
            &nbsp;=&nbsp;
          </>
        </Show>
        <Equation tokenizedEquation={tokens} />
      </InnerWrapper>
    </EquationWrapper>
  )
}

export default KineticEquation
