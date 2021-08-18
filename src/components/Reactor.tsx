import styled from "styled-components"

const Reactor: React.FC = () => {
  return (
    <ReactorWrapper>
      <ReactorInterior>
        <ReactorLiquid id="liquid" />
      </ReactorInterior>
    </ReactorWrapper>
  )
}

const ReactorWrapper = styled.div`
  position: relative;
  background-color: var(--color-grey-normal);
  border-radius: 5px;
  height: 220px;
  margin-bottom: 40px;

  @media (max-width: 800px) {
    display: none;
  }
`

const ReactorInterior = styled.div`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;

  background-color: var(--color-grey-lighter);
  border-radius: 2px;
  overflow: hidden;
`

const ReactorLiquid = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  transition: background-color 0.2s ease-in-out;

  background-color: var(--color-grey-lightest);
  height: 70%;
  width: 100%;
`

export default Reactor
