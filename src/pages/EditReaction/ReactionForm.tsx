import styled from "styled-components"
import CompoundSelection from "./CompoundSelection"
import ReactionPreview from "../../components/reactions/ReactionPreview/index"
import type { FormikProps } from "formik"

interface ReactionFormProps {
  formik: FormikProps<ReactionInput>
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`

const ReactionForm: React.VFC<ReactionFormProps> = (props) => {
  const { formik } = props
  const { reactants, products } = formik.values

  return (
    <Wrapper>
      <ReactionPreview
        style={{ justifyContent: "center", flexBasis: "100%" }}
        {...{ reactants, products }}
      />
      <CompoundSelection formik={formik} />
    </Wrapper>
  )
}

export default ReactionForm
