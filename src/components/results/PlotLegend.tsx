import React from "react"
import styled from "styled-components"
import useCompounds from "../../hooks/entities/useCompounds"
import Show from "../Show"
import { mobileBreakpoint } from "../../lib/breakpoints"

interface ColorProps {
  color: string
}

interface PlotLegendProps {
  selectedVariables: number[]
  temperatureSelected: boolean
}

const PlotLegend: React.VFC<PlotLegendProps> = (props) => {
  const { selectedVariables, temperatureSelected } = props
  const { compounds } = useCompounds()

  return (
    <Wrapper>
      {compounds.map((compound, index) => {
        const color = compound.color
        return (
          <Show when={selectedVariables.includes(index)} key={index}>
            <Variable>
              <ColorBadge color={color} />
              <p>{compound.symbol}</p>
            </Variable>
          </Show>
        )
      })}

      <Show when={temperatureSelected}>
        <Variable>
          <ColorBadge color="#000" />
          <p>Temp.</p>
        </Variable>
      </Show>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  right: 50px;
  padding: 15px;
  border-radius: 3px;
  border: 1px solid var(--color-grey-normal);
  background-color: var(--color-grey-lightest);
  box-shadow: 0 2px 4px var(--color-grey-light);

  @media screen and (max-width: ${mobileBreakpoint}px) {
    top: 180px;
    right: 40px;
  }
`

const Variable = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }
`

const ColorBadge = styled.div<ColorProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 1rem;
  box-shadow: 0 2px 5px -2px var(--color-grey-normal);
`

export default PlotLegend
