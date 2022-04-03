import Wrapper from "@components/layout/PageWrapper"
import Sidebar from "@components/layout/Sidebar"
import PageHeader from "./PageHeader"
import ReactionList from "./ReactionList"

const CompoundsPage: React.VFC = () => {
  return (
    <>
      <Sidebar />
      <Wrapper>
        <PageHeader />
        <ReactionList />
      </Wrapper>
    </>
  )
}

export default CompoundsPage
