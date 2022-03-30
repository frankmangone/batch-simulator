import styled from "styled-components"
import Button from "../../components/general/ButtonNew"
import { AddIcon } from "../../components/Icons"
import CompoundCard from "./CompoundCard"
import { useTheme } from "../../contexts/Theme"
import replaceAtIndex from "../../lib/array/replaceAtIndex"
import deleteAtIndex from "../../lib/array/deleteAtIndex"
import type { FormikProps } from "formik"

interface ReactionFormProps {
  formik: FormikProps<ReactionInput>
}

const Wrapper = styled.div`
  flex-basis: 50%;
  margin-top: 40px;
`

const Header = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: flex-start;
  align-items: center;
  margin: 0 5px 20px;
`

const AddButton = styled(Button)`
  margin-right: 10px;
`

const Label = styled.p`
  color: ${(props) => props.theme.getColor({ name: "baseBlack", shade: 100 })};
  font-family: "Mulish", sans-serif;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: 600;
  line-height: ${(props) => props.theme.lineHeights.h5};
  margin: 0;
`

const CompoundSelection: React.VFC<ReactionFormProps> = (props) => {
  const { formik } = props
  const { values } = formik
  const { reactants, products } = values
  const { getColor } = useTheme()

  const handleFieldChange =
    (compoundGroup: "reactants" | "products", index: number) =>
    (fieldName: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCompounds = replaceAtIndex({
        array: values[compoundGroup],
        index,
        newElement: {
          ...values[compoundGroup][index],
          [fieldName]: event.target.value,
        },
      })

      formik.setFieldValue(compoundGroup, updatedCompounds)
    }

  const handleDelete =
    (compoundGroup: "reactants" | "products", index: number) => () => {
      const updatedCompounds = deleteAtIndex({
        array: values[compoundGroup],
        index,
      })

      formik.setFieldValue(compoundGroup, updatedCompounds)
    }

  return (
    <>
      <Wrapper>
        <Header>
          <AddButton onClick={() => null} color="white">
            <AddIcon
              color={getColor({ name: "baseBlack", shade: 700 })}
              size={20}
            />
          </AddButton>
          <Label>Reactants</Label>
        </Header>
        {reactants.map((reactant, index) => (
          <CompoundCard
            key={reactant.compoundId}
            compound={reactant}
            handleFieldChange={handleFieldChange("reactants", index)}
            handleDelete={handleDelete("reactants", index)}
          />
        ))}
      </Wrapper>

      <Wrapper>
        <Header>
          <AddButton onClick={() => null} color="white">
            <AddIcon
              color={getColor({ name: "baseBlack", shade: 700 })}
              size={20}
            />
          </AddButton>
          <Label>Products</Label>
        </Header>
        {products.map((product, index) => (
          <CompoundCard
            key={product.compoundId}
            compound={product}
            handleFieldChange={handleFieldChange("products", index)}
            handleDelete={handleDelete("products", index)}
          />
        ))}
      </Wrapper>
    </>
  )
}

export default CompoundSelection
