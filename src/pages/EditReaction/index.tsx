import PageHeader from "./PageHeader"
import ReactionForm from "./ReactionForm"
import Wrapper from "../../components/layout/PageWrapper"
import Sidebar from "../../components/layout/Sidebar"
import useReactions from "../../hooks/entities/useReactions"
import { useEffect } from "react"
import { useFormik } from "formik"
import { useParams, useNavigate } from "react-router-dom"
// import compoundSchema from "../../lib/schema/compound"
// import buildValidationError from "../../lib/schema/buildValidationError"
// import type { ValidationError } from "yup"

const EditReactionPage: React.VFC = () => {
  const { findReaction } = useReactions()
  const navigate = useNavigate()
  const { id } = useParams()
  const reaction = findReaction(id)

  /**
   * Redirect if id is not valid
   */
  useEffect(() => {
    if (!reaction) {
      navigate("/", { replace: true })
      // TODO: Flash message with 'reaction not found'?
    }
  }, []) // eslint-disable-line

  const {
    reactants,
    products,
    name = "",
    kineticModel,
    kineticConstants,
    kineticEquation,
    keyCompound,
  } = (reaction as Reaction) ?? {}

  const formik = useFormik<ReactionInput>({
    initialValues: {
      reactants: [...reactants],
      products: [...products],
      name,
      kineticModel,
      kineticConstants,
      kineticEquation,
      keyCompound,
    },
    onSubmit: async (values, { setErrors }) => {},
  })

  return (
    <>
      <Sidebar />
      <Wrapper>
        <PageHeader />
        <ReactionForm formik={formik} />
      </Wrapper>
    </>
  )
}

export default EditReactionPage
