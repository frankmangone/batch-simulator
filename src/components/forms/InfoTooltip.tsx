import styled from "styled-components"
import { FiInfo } from "react-icons/fi"
interface InfoTooltipProps {
  text: string | JSX.Element
}

const InfoTooltip = (props: InfoTooltipProps) => {
  const { text } = props

  return (
    <Icon>
      <FiInfo color="hsl(213, 20%, 95%)" size={14} />
      <InfoWrapper>
        <Info>{text}</Info>
      </InfoWrapper>
    </Icon>
  )
}

export default InfoTooltip

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color-grey-normal);
  margin-left: 0.5rem;
  color: var(--color-white);
  cursor: pointer;
  position: relative;
  &:hover > div > div {
    opacity: 1;
  }
`

const Info = styled.div`
  position: relative;
  opacity: 0;
  transition: opacity 0.15s linear;
  padding: 1rem;
  background-color: var(--color-grey-normal);
  border-radius: 5px;
  margin-left: 1rem;
  width: max-content;
  max-width: 180px;
  font-size: 1rem;
  color: var(--color-grey-lightest);
  overflow: visible;
  filter: drop-shadow(0 1px 2px var(--color-grey-normal));
  display: flex;

  &:before {
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    content: "";
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid var(--color-grey-normal);
  }
`

const InfoWrapper = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  transform: translateX(102%);
  pointer-events: none;
`
