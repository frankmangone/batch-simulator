import Wrapper from "../../components/layout/PageWrapper"
import PageHeader from "./PageHeader"
import CompoundList from "./CompoundList"

const CompoundsPage: React.VFC = () => {
  return (
    <Wrapper>
      <PageHeader />
      <CompoundList />
    </Wrapper>
  )
}

export default CompoundsPage
