// import styled from "styled-components"
import PageWrapper from "../../components/general/PageWrapper"
import { useParams } from "react-router-dom"

interface EditCompoundParams {
  id: string
}

const EditCompoundPage: React.VFC = () => {
  const { id } = useParams<EditCompoundParams>()

  return <PageWrapper>{id}</PageWrapper>
}

export default EditCompoundPage
