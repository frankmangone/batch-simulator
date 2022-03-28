import PageHeader from "./PageHeader"
import CompoundForm from "./CompoundForm"
import Wrapper from "../../components/layout/PageWrapper"
import useCompounds from "../../hooks/entities/useCompounds"
import { useEffect } from "react"
import { useFormik } from "formik"
import { useParams, useNavigate } from "react-router-dom"

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
    onSubmit: (values) => {
      // TODO: Validate values
      const updatedCompound = { id: id as string, ...values }
      updateCompound(id as string, updatedCompound)
      navigate("/compounds-new")
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
