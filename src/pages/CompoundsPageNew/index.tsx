import Wrapper from "../../components/layout/PageWrapper"
import Sidebar from "../../components/layout/Sidebar"
import PageHeader from "./PageHeader"
import CompoundList from "./CompoundList"

const CompoundsPage: React.VFC = () => {
  return (
    <>
      <Sidebar />
      <Wrapper>
        <PageHeader />
        <CompoundList />
      </Wrapper>
    </>
  )
}

export default CompoundsPage
