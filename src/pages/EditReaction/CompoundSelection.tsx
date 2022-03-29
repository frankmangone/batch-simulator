import styled from "styled-components"
import CompoundCard from "./CompoundCard"
import type { FormikProps } from "formik"

interface ReactionFormProps {
  formik: FormikProps<ReactionInput>
}

const Wrapper = styled.div`
  flex-basis: 50%;
`

const Label = styled.p`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-family: "Mulish", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.p};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.p};
  margin-bottom: 12px;
`

const CompoundSelection: React.VFC<ReactionFormProps> = (props) => {
  const { values } = props.formik
  const { reactants, products } = values

  return (
    <>
      <Wrapper>
        <Label>Reactants</Label>
        {reactants.map((reactant, index) => (
          <CompoundCard key={index} compound={reactant} />
        ))}
      </Wrapper>

      <Wrapper>
        <Label>Products</Label>
        {products.map((product, index) => (
          <CompoundCard key={index} compound={product} />
        ))}
      </Wrapper>
    </>
  )
}

export default CompoundSelection
