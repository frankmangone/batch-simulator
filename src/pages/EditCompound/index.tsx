import PageHeader from "./PageHeader"
import CompoundForm from "./CompoundForm"
import Wrapper from "../../components/layout/PageWrapper"
import useCompounds from "../../hooks/entities/useCompounds"
import { useEffect } from "react"
import { useFormik } from "formik"
import { useParams, useNavigate } from "react-router-dom"
import compoundSchema from "../../lib/schema/compound"

const EditCompoundPage: React.VFC = () => {
  const { findCompound, updateCompound } = useCompounds()
  const navigate = useNavigate()
  const { id } = useParams()
  const compound = findCompound(id)
  const { symbol, name, color, molecularWeight, concentration } =
    (compound as Compound) ?? {}

  // Redirect if id is not valid
  useEffect(() => {
    if (!compound) {
      navigate("/", { replace: true })
      // TODO: Flash message with 'compound not found'?
    }
  }, []) // eslint-disable-line

  const formik = useFormik<CompoundInput>({
    initialValues: { symbol, name, color, molecularWeight, concentration },
    onSubmit: async (values) => {
      // TODO: Validate values
      try {
        const validatedValues = await compoundSchema.validate(values)
        const updatedCompound = { id, ...validatedValues }

        updateCompound(id as string, updatedCompound as Compound)
        navigate("/compounds-new")
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <Wrapper>
      <PageHeader handleSubmit={formik.handleSubmit} />
      <CompoundForm formik={formik} />
    </Wrapper>
  )
}

export default EditCompoundPage
