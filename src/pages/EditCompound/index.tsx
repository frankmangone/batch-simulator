// import styled from "styled-components"
import PageWrapper from "../../components/general/PageWrapper"
import { useParams } from "react-router-dom"

const EditCompoundPage: React.VFC = () => {
  const { id } = useParams()

  return <PageWrapper>{id}</PageWrapper>
}

export default EditCompoundPage
