import PageHeader from "./PageHeader"
import CompoundForm from "./CompoundForm"
import Wrapper from "../../components/layout/PageWrapper"
import Sidebar from "../../components/layout/Sidebar"
import useCompounds from "../../hooks/entities/useCompounds"
import { useEffect } from "react"
import { useFormik } from "formik"
import { useParams, useNavigate } from "react-router-dom"
import compoundSchema from "../../lib/schema/compound"
import buildValidationError from "../../lib/schema/buildValidationError"
import type { ValidationError } from "yup"

const EditCompoundPage: React.VFC = () => {
  const { compounds, findCompound, updateCompound } = useCompounds()
  const navigate = useNavigate()
  const { id } = useParams()
  const compound = findCompound(id)
  const { symbol, name, color, molecularWeight, concentration } =
    (compound as Compound) ?? {}

  /**
   * This is needed in order to validate compound symbol uniqueness
   */
  const takenCompoundNames = compounds
    .filter((comp) => comp.id !== id)
    .map((comp) => comp.symbol)

  /**
   * Redirect if id is not valid
   */
  useEffect(() => {
    if (!compound) {
      navigate("/", { replace: true })
      // TODO: Flash message with 'compound not found'?
    }
  }, []) // eslint-disable-line

  const formik = useFormik<CompoundInput>({
    initialValues: { symbol, name, color, molecularWeight, concentration },
    onSubmit: async (values, { setErrors }) => {
      // TODO: Validate values
      try {
        const validatedValues = await compoundSchema(
          takenCompoundNames
        ).validate(values, {
          abortEarly: false,
        })
        const updatedCompound = { id, ...validatedValues }

        updateCompound(id as string, updatedCompound as Compound)
        navigate("/compounds-new")
      } catch (error) {
        setErrors(buildValidationError(error as ValidationError))
      }
    },
  })

  return (
    <>
      <Sidebar />
      <Wrapper>
        <PageHeader handleSubmit={formik.handleSubmit} />
        <CompoundForm formik={formik} />
      </Wrapper>
    </>
  )
}

export default EditCompoundPage
