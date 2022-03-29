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
  const { formik } = props
  const { values } = formik
  const { reactants, products } = values

  const handleFieldChange =
    (compoundGroup: "reactants" | "products", index: number) =>
    (fieldName: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue(compoundGroup, [
        ...values[compoundGroup].slice(0, index),
        {
          ...values[compoundGroup][index],
          [fieldName]: event.target.value,
        },
        ...values[compoundGroup].slice(index + 1, values[compoundGroup].length),
      ])
    }

  return (
    <>
      <Wrapper>
        <Label>Reactants</Label>
        {reactants.map((reactant, index) => (
          <CompoundCard
            key={index}
            compound={reactant}
            handleFieldChange={handleFieldChange("reactants", index)}
          />
        ))}
      </Wrapper>

      <Wrapper>
        <Label>Products</Label>
        {products.map((product, index) => (
          <CompoundCard
            key={index}
            compound={product}
            handleFieldChange={handleFieldChange("products", index)}
          />
        ))}
      </Wrapper>
    </>
  )
}

export default CompoundSelection
