import PageHeader from "./PageHeader"
import CompoundForm from "./CompoundForm"
import Wrapper from "../../components/layout/PageWrapper"
import useCompounds from "../../hooks/entities/useCompounds"
import { useFormik } from "formik"
import { useParams } from "react-router-dom"

const EditCompoundPage: React.VFC = () => {
  const { findCompound } = useCompounds()
  const { id } = useParams()
  const compound = findCompound(id)
  const { symbol, name, color, molecularWeight, concentration } =
    compound as Compound

  const formik = useFormik<CompoundInput>({
    initialValues: { symbol, name, color, molecularWeight, concentration },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
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
