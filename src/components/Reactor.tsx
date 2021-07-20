import styled from "styled-components"

const Reactor: React.FC = () => {
  return (
    <ReactorWrapper>
      <ReactorInterior></ReactorInterior>
    </ReactorWrapper>
  )
}

const ReactorWrapper = styled.div`
  position: relative;
  background: linear-gradient(180deg, #586274 0%, #26282b 134.84%);
  border: 1px solid #292c30;
  border-radius: 10px;
  box-shadow: -6px -6px 8px #2e3135, 6px 6px 8px #151618;
  height: 220px;
  margin-bottom: 40px;
`

const ReactorInterior = styled.div`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;

  background-color: #26282b;
  box-shadow: inset -6px -6px 16px #2e3135, inset 6px 6px 16px #151618;
  border-radius: 10px;
`

export default Reactor
