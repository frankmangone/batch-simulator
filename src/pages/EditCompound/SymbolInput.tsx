import styled from "styled-components"
import { RerollIcon } from "../../components/Icons"
import Error from "../../components/forms/Error"
import { useTheme } from "../../contexts/Theme"

interface SymbolInputProps {
  value: string
  color: string
  error?: string
  changeColor: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface InputBoxProps {
  color: string
}

const Wrapper = styled.fieldset`
  flex-basis: 100%;
  flex-shrink: 0;
  border: none;
  margin-bottom: 70px;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;

  label {
    color: ${(props) =>
      props.theme.getColor({ name: "baseBlack", shade: 100 })};
    font-family: "Mulish", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-weight: 600;
    line-height: ${(props) => props.theme.lineHeights.h5};
    margin-bottom: 12px;
  }
`

const InputBox = styled.div<InputBoxProps>`
  background-color: ${(props) =>
    props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border: 1px solid
    ${(props) => props.theme.getColor({ name: "baseBlack", shade: 700 })};
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-grow: 1;
  font-family: "Mulish", sans-serif;
  outline: none;
  padding: 20px 30px 10px;

  input {
    background: unset;
    border: none;
    color: ${(props) => props.color};
    flex: 1;
    font-family: "Comfortaa", sans-serif;
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-weight: 600;
    line-height: ${(props) => props.theme.lineHeights.h1};
    outline: none;
  }
`

const RerollButton = styled.div<InputBoxProps>`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  opacity: 0.9;
  transition: all 0.15s ease-in-out;

  &:hover {
    opacity: 1;
    box-shadow: 0 0 8px -1px ${(props) => props.color};
  }
`

const SymbolInput: React.VFC<SymbolInputProps> = (props) => {
  const { color, error, value, changeColor, onChange } = props
  const { getColor } = useTheme()

  return (
    <Wrapper>
      <InnerWrapper>
        <label htmlFor="symbol">Compound symbol</label>
        <InputBox color={color}>
          <input name="symbol" autoComplete="off" {...{ value, onChange }} />
          <RerollButton color={color} onClick={changeColor}>
            <RerollIcon
              color={getColor({ name: "baseBlack", shade: 600 })}
              size={40}
            />
          </RerollButton>
        </InputBox>
        {error && <Error>{error}</Error>}
      </InnerWrapper>
    </Wrapper>
  )
}

export default SymbolInput
