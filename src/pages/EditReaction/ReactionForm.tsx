import styled from "styled-components"
import CompoundSelection from "./CompoundSelection"
import ReactionPreview from "../../components/reactions/ReactionPreview/index"
import useReactions from "../../hooks/entities/useReactions"
import { useParams } from "react-router-dom"
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
  const { findReaction } = useReactions()
  const { id } = useParams()
  const reaction = findReaction(id)

  return (
    <Wrapper>
      <ReactionPreview
        reaction={reaction as Reaction}
        style={{ justifyContent: "center", flexBasis: "100%" }}
      />
      <CompoundSelection formik={formik} />
    </Wrapper>
  )
}

export default ReactionForm
